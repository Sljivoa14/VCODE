const inputBoxer1= document.getElementById("inputB1");
const inputBoxer2= document.getElementById("inputB2");
const inputWinner= document.getElementById("inputWinner");
const inputMethod= document.getElementById("inputMethod");
const inputRound= document.getElementById("inputRound");
const addMatchButton = document.getElementById("addMatchButton");

const matches = [];
const validMethods = ["KO", "TKO", "Decision", "Draw"];
const flaggedMatches = [];
const wins = {};
const roundUsed = {};

addMatchButton.addEventListener("click", () => {
    const boxer1 = inputBoxer1.value.trim();
    const boxer2 = inputBoxer2.value.trim();
    const winner = inputWinner.value.trim();
    const method = inputMethod.value.trim();
    const round = parseInt(inputRound.value.trim());
});

function runAnalysis()     {
    const results ={
        totalMatches: matches.length,
        topBoxer: null,
        koWins:0,
        flaggedMatches: []   // const result koji vracamo ( return) poslje analize svih meceva, a flaggedMatches je niz koji ce sadrzavati informacije o mecevima koji su problematicni (npr. onaj gdje pobjednik nije ni boxer1 ni boxer2, ili onaj gdje je metoda pobjede nepoznata, ili onaj gdje je broj rundi nevalidan)
    };

    const wins= {};
    const roundsUsed = {};
    const methods = ["KO", "Decision", "TKO"];
    
    matches.forEach(match => {
        //provjera winnera
        if(match.winner !== match.boxer1 && match.winner !== match.boxer2){
            results.flaggedMatches.push({id: match.id, reason: "Winner not in match"});  
        }
        //nepoznat metod pobjede
        if(!methods.includes(match.method)){
            results.flaggedMatches.push({id: match.id, reason: "Unknown method of victory"});
        }
        //broj rundi
        if(match.round < 1 || match.round > 12){
            results.flaggedMatches.push({id: match.id, reason: "Invalid number of rounds"});
        }
        //KO pobjede
        if(match.method === "KO"){
            results.koWins++;
        }
    });

    //odredivanje najboljeg boxera
    let maxWins = 0;
    for(const [boxer, winCount] of Object.entries(wins)){
        if(winCount > maxWins){
            maxWins = winCount;
            results.topBoxer = boxer;
        }
    }

    return results;
}