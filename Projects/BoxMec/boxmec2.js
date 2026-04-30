// STORAGE
let matches = [];
let currentId = 1;

// ADD MATCH FROM INPUTS
function addMatch() {
    const boxer1 = document.getElementById("inputB1").value.trim();
    const boxer2 = document.getElementById("inputB2").value.trim();
    const winner = document.getElementById("inputWinner").value.trim();
    const method = document.getElementById("inputMethod").value.trim();
    const rounds = Number(document.getElementById("inputRound").value);

    const match = {
        id: currentId++,
        boxer1,
        boxer2,
        winner,
        method,
        rounds
    };

    matches.push(match);

    console.log("Match added:", match);

    // run analysis every time you add
    const result = analyzeBoxingMatches(matches);
    console.log("Analysis:", result);
}

// MAIN FUNCTION
function analyzeBoxingMatches(matchesArray) {

    let totalMatches = matchesArray.length;
    let knockoutWins = 0;
    let flaggedMatches = [];

    const validMethods = ["KO", "TKO", "Decision"];

    let wins = {};       // { name: wins }
    let roundsUsed = {}; // { name: totalRounds }

    // LOOP THROUGH MATCHES
    matchesArray.forEach(match => {

        const { id, boxer1, boxer2, winner, method, rounds } = match;

        let hasError = false;

        // RULE 1: winner must be in match
        if (winner !== boxer1 && winner !== boxer2) {
            flaggedMatches.push({ id, issue: "Winner not in match" });
            hasError = true;
        }

        // RULE 2: rounds <= 12
        if (rounds > 12) {
            flaggedMatches.push({ id, issue: "Too many rounds" });
            hasError = true;
        }

        // RULE 3: valid method
        if (!validMethods.includes(method)) {
            flaggedMatches.push({ id, issue: "Unknown method" });
            hasError = true;
        }

        // COUNT KO / TKO
        if (method === "KO" || method === "TKO") {
            knockoutWins++;
        }

        // ONLY VALID MATCHES COUNT FOR STATS
        if (!hasError) {

            if (!wins[winner]) {
                wins[winner] = 0;
                roundsUsed[winner] = 0;
            }

            wins[winner]++;
            roundsUsed[winner] += rounds;
        }
    });

    // DETERMINE TOP BOXER
    let topBoxer = null;

    Object.keys(wins).forEach(name => {
        if (!topBoxer) {
            topBoxer = name;
        } else {
            if (
                wins[name] > wins[topBoxer] ||
                (
                    wins[name] === wins[topBoxer] &&
                    roundsUsed[name] < roundsUsed[topBoxer]
                )
            ) {
                topBoxer = name;
            }
        }
    });

    // BUILD RESULT
    const result = {
        totalMatches,
        topBoxer,
        knockoutWins,
        flaggedMatches
    };

    // ADD RANKING ONLY IF NO ERRORS
    if (flaggedMatches.length === 0) {
        result.ranking = Object.keys(wins)
            .map(name => ({
                name,
                wins: wins[name]
            }))
            .sort((a, b) => b.wins - a.wins);
    }

    return result;
}