import math
import numpy as np
import pandas as pd
import yfinance as yf
from datetime import timedelta

# /C:/Users/Korisnik/Downloads/VCODE/Projects/python.py
# GitHub Copilot
# Simple day-trading quant model: fetch, indicators, signal, backtest
# Requires: pip install yfinance pandas numpy matplotlib

import matplotlib.pyplot as plt

# CONFIG
SYMBOL = "AAPL"
PERIOD = "7d"          # history length (yfinance): e.g., "7d", "30d"
INTERVAL = "5m"        # "1m", "2m", "5m", "15m", etc.
FAST_EMA = 9
SLOW_EMA = 21
RSI_PERIOD = 14
ATR_PERIOD = 14
RISK_PER_TRADE = 0.005  # fraction of equity
STARTING_CAPITAL = 100000.0
SLIPPAGE_PCT = 0.0005   # 0.05%
COMMISSION = 1.0        # flat per trade


# DATA
def fetch_data(symbol=SYMBOL, period=PERIOD, interval=INTERVAL):
    df = yf.download(tickers=symbol, period=period, interval=interval, progress=False)
    if df.empty:
        raise RuntimeError("No data fetched. Try different period/interval or symbol.")
    df = df.rename(columns={"Adj Close": "Adj_Close"})
    df.dropna(inplace=True)
    return df


# INDICATORS
def ema(series, span):
    return series.ewm(span=span, adjust=False).mean()


def rsi(series, period=RSI_PERIOD):
    delta = series.diff()
    up = delta.clip(lower=0)
    down = -1 * delta.clip(upper=0)
    ma_up = up.ewm(alpha=1/period, adjust=False).mean()
    ma_down = down.ewm(alpha=1/period, adjust=False).mean()
    rs = ma_up / (ma_down + 1e-9)
    return 100 - (100 / (1 + rs))


def atr(df, period=ATR_PERIOD):
    high = df['High']
    low = df['Low']
    close = df['Close']
    tr1 = high - low
    tr2 = (high - close.shift()).abs()
    tr3 = (low - close.shift()).abs()
    tr = pd.concat([tr1, tr2, tr3], axis=1).max(axis=1)
    return tr.rolling(period).mean()


# SIGNALS
def compute_indicators(df):
    df = df.copy()
    df['EMA_fast'] = ema(df['Close'], FAST_EMA)
    df['EMA_slow'] = ema(df['Close'], SLOW_EMA)
    df['RSI'] = rsi(df['Close'], RSI_PERIOD)
    df['ATR'] = atr(df, ATR_PERIOD)
    return df


def generate_signals(df):
    df = df.copy()
    df['signal'] = 0
    # Long when fast EMA > slow EMA and RSI < 35 (mean-reversion within trend)
    long_cond = (df['EMA_fast'] > df['EMA_slow']) & (df['RSI'] < 35)
    short_cond = (df['EMA_fast'] < df['EMA_slow']) & (df['RSI'] > 65)
    df.loc[long_cond, 'signal'] = 1
    df.loc[short_cond, 'signal'] = -1
    # Only trigger on signal changes (entries)
    df['signal_change'] = df['signal'].diff().fillna(0)
    return df


# BACKTEST (next-bar execution, ATR stops & profit target)
def backtest(df, starting_capital=STARTING_CAPITAL):
    cash = starting_capital
    position = 0  # +qty for long, -qty for short
    entry_price = 0.0
    equity_curve = []
    trades = []
    last_index = df.index[-1]

    for i in range(1, len(df)):
        row = df.iloc[i]
        prev = df.iloc[i-1]

        # Check exit by stop loss or take profit if in position
        if position != 0:
            unreal_pl = (row['Close'] - entry_price) * position * 1.0
            # Define stops: ATR-based
            atr = row['ATR'] if not np.isnan(row['ATR']) else df['ATR'].iloc[:i].iloc[-1]
            if atr is None or np.isnan(atr):
                atr = 0.0
            if position > 0:
                stop_price = entry_price - 2 * atr
                target_price = entry_price + 3 * atr
                exit_signal = (row['Low'] <= stop_price) or (row['High'] >= target_price)
            else:
                stop_price = entry_price + 2 * atr
                target_price = entry_price - 3 * atr
                exit_signal = (row['High'] >= stop_price) or (row['Low'] <= target_price)

            if exit_signal:
                # Execute exit at next open (simulate)
                exec_price = row['Open'] * (1 + SLIPPAGE_PCT * np.sign(-position))
                proceeds = exec_price * position
                cash += proceeds - COMMISSION
                trades.append({
                    'time': row.name,
                    'type': 'exit',
                    'qty': position,
                    'price': exec_price,
                    'cash': cash
                })
                position = 0
                entry_price = 0.0

        # Entry logic: when signal_change indicates entry
        sig_change = row['signal_change']
        if sig_change != 0 and position == 0:
            # Determine direction from current signal
            dir = int(row['signal'])
            if dir != 0:
                # Determine position size via volatility risk
                atr = row['ATR'] if not np.isnan(row['ATR']) else df['ATR'].iloc[:i].iloc[-1]
                if atr is None or atr <= 0:
                    continue
                risk_per_share = 2 * atr
                risk_amount = cash * RISK_PER_TRADE
                qty = math.floor(risk_amount / risk_per_share)
                if qty <= 0:
                    continue
                # Execute entry at next open (simulate)
                exec_price = row['Open'] * (1 + SLIPPAGE_PCT * dir)
                cost = exec_price * qty * dir
                cash -= cost + COMMISSION
                position = qty * dir
                entry_price = exec_price
                trades.append({
                    'time': row.name,
                    'type': 'entry',
                    'qty': position,
                    'price': exec_price,
                    'cash': cash
                })

        # Update equity
        market_value = position * row['Close']
        equity = cash + market_value
        equity_curve.append({'time': row.name, 'equity': equity, 'cash': cash, 'position': position})
    eq_df = pd.DataFrame(equity_curve).set_index('time')
    return eq_df, trades


# PERFORMANCE
def performance(eq_df):
    eq = eq_df['equity']
    returns = eq.pct_change().fillna(0)
    total_return = eq.iloc[-1] / eq.iloc[0] - 1
    ann_return = (1 + total_return) ** (252 * 6.5 * 60 / len(eq)) - 1 if len(eq) > 1 else 0
    sharpe = returns.mean() / (returns.std() + 1e-9) * math.sqrt(252 * 6.5 * 60 / len(eq)) if returns.std() != 0 else 0
    peak = eq.cummax()
    drawdown = (eq - peak) / peak
    max_dd = drawdown.min()
    return {
        'start_equity': eq.iloc[0],
        'end_equity': eq.iloc[-1],
        'total_return': total_return,
        'annualized_return_est': ann_return,
        'sharpe_est': sharpe,
        'max_drawdown': max_dd
    }


# RUN
def run(symbol=SYMBOL):
    df = fetch_data(symbol)
    df = compute_indicators(df)
    df = generate_signals(df)
    eq_df, trades = backtest(df)
    stats = performance(eq_df)
    print("Stats:", {k: round(v, 6) if isinstance(v, float) else v for k, v in stats.items()})
    # Plot equity and price with signals
    plt.figure(figsize=(12, 6))
    plt.subplot(2, 1, 1)
    plt.plot(df['Close'], label='Close')
    buys = df[df['signal_change'] > 0]
    sells = df[df['signal_change'] < 0]
    plt.scatter(buys.index, buys['Close'], marker='^', color='g', s=40)
    plt.scatter(sells.index, sells['Close'], marker='v', color='r', s=40)
    plt.title(f"{symbol} price & signals")
    plt.legend()
    plt.subplot(2, 1, 2)
    plt.plot(eq_df['equity'], label='Equity')
    plt.title("Equity Curve")
    plt.legend()
    plt.tight_layout()
    plt.show()


if __name__ == "__main__":
    run()       

    