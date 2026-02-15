// DOM ELEMENTS
const monsterHealthBar = document.getElementById("monster-health");
const playerHealthBar = document.getElementById("player-health");
const attackBtn = document.getElementById("attack-btn");
const strongAttackBtn = document.getElementById("strong-attack-btn");
const healBtn = document.getElementById("heal-btn");
const logBtn = document.getElementById("log-btn");

// GAME CONSTANTS
const maxPlayerHealth = 100;
const maxMonsterHealth = 100;

const LOG_ATTACK = "PLAYER_ATTACK";
const LOG_STRONG_ATTACK = "PLAYER_STRONG_ATTACK";
const LOG_HEAL = "PLAYER_HEAL";
const LOG_MONSTER_ATTACK = "MONSTER_ATTACK";
const LOG_GAME_OVER = "GAME_OVER";

// GAME STATE
let monsterHealth = Number(prompt("Enter monster's health (max 100):", "100"));
let playerHealth = Number(prompt("Enter player's health (max 100):", "100"));

let battleLog = [];

// VALIDATE INPUT
while (
  monsterHealth > maxMonsterHealth ||
  playerHealth > maxPlayerHealth ||
  monsterHealth <= 0 ||
  playerHealth <= 0 ||
  isNaN(monsterHealth) ||
  isNaN(playerHealth)
) {
  alert("Health values must be numbers between 1 and 100.");
  monsterHealth = Number(prompt("Enter monster's health (max 100):", "100"));
  playerHealth = Number(prompt("Enter player's health (max 100):", "100"));
}

// INITIAL UI UPDATE
updateHealthBars();

// LOG FUNCTION
function writeLog(event, data, playerHealthValue, monsterHealthValue) {
  battleLog.push({
    event,
    data,
    playerHealth: playerHealthValue,
    monsterHealth: monsterHealthValue,
    timestamp: new Date().toLocaleTimeString()
  });
}

// UPDATE HEALTH BARS
function updateHealthBars() {
  monsterHealthBar.value = monsterHealth;
  playerHealthBar.value = playerHealth;
}

// CHECK GAME OVER
function checkGameOver() {
  if (monsterHealth <= 0 && playerHealth <= 0) {
    writeLog(LOG_GAME_OVER, "DRAW", playerHealth, monsterHealth);
    alert("It's a draw!");
    return true;
  } 
  if (monsterHealth <= 0) {
    writeLog(LOG_GAME_OVER, "PLAYER_WON", playerHealth, monsterHealth);
    alert("You won!");
    return true;
  } 
  if (playerHealth <= 0) {
    writeLog(LOG_GAME_OVER, "PLAYER_LOST", playerHealth, monsterHealth);
    alert("You lost!");
    return true;
  }
  return false;
}

// NORMAL ATTACK
attackBtn.addEventListener("click", function () {
  const playerDamage = Math.floor(Math.random() * 15) + 5;
  const monsterDamage = Math.floor(Math.random() * 15) + 5;

  monsterHealth -= playerDamage;
  playerHealth -= monsterDamage;

  updateHealthBars();

  writeLog(
    LOG_ATTACK,
    { playerDamage, monsterDamage },
    playerHealth,
    monsterHealth
  );

  checkGameOver();
});

// STRONG ATTACK
strongAttackBtn.addEventListener("click", function () {
  const playerDamage = Math.floor(Math.random() * 25) + 10;
  const monsterDamage = Math.floor(Math.random() * 15) + 10;

  monsterHealth -= playerDamage;
  playerHealth -= monsterDamage;

  updateHealthBars();

  writeLog(
    LOG_STRONG_ATTACK,
    { playerDamage, monsterDamage },
    playerHealth,
    monsterHealth
  );

  checkGameOver();
});

// HEAL
healBtn.addEventListener("click", function () {
  const healValue = Math.floor(Math.random() * 20) + 10;
  const monsterDamage = Math.floor(Math.random() * 15) + 5;

  playerHealth += healValue;
  if (playerHealth > maxPlayerHealth) {
    playerHealth = maxPlayerHealth;
  }

  playerHealth -= monsterDamage;

  updateHealthBars();

  writeLog(
    LOG_HEAL,
    { healValue, monsterDamage },
    playerHealth,
    monsterHealth
  );

  checkGameOver();
});

// SHOW LOG
logBtn.addEventListener("click", function () {
  console.table(battleLog);
});
