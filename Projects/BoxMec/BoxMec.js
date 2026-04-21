const matches = [
    {id: 1, boxer1: "Mike Tyson", boxer2: "Evander Holyfield", winner: "Mike Tyson", method: "KO", round: 3},
    {id: 2, boxer1: "Muhammad Ali", boxer2: "Joe Frazier", winner: "Muhammad Ali", method: "Decision", round: 12},
    {id: 3, boxer1: "Joe Frazier", boxer2: "Evander Holyfield", winner: "Joe Frazier", method: "Decision", round: 12},
    {id: 4, boxer1: "Mike Tyson", boxer2: "Muhammad Ali", winner: "Muhammad Ali", method: "Decision", round: 12},
];

function analyzeBoxingMatches(matchesArray)     {
    const results ={
        totalMatches: matchesArray.length,
        topBoxer: null,
        koWins:0,
        flaggedMatches: []   // const result koji vracamo ( return) poslje analize svih meceva, a flaggedMatches je niz koji ce sadrzavati informacije o mecevima koji su problematicni (npr. onaj gdje pobjednik nije ni boxer1 ni boxer2, ili onaj gdje je metoda pobjede nepoznata, ili onaj gdje je broj rundi nevalidan)
    };

    const wins= {};
    const rounds = {};
    const methods = ["KO", "Decision", "TKO"];

    matchesArray.forEach(match => {

        //provjera winnera
        if(!match.winner === match.boxer1 && !match.winner === match.boxer2){
            results.flaggedMatches.push({id: match.id, reason: "Winner not in match"});  
        }
        //nepoznat metod pobjede
        if(methods.indexOf(match.method)    ){
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
        //TKO pobjede
        if(match.method === "TKO"){
            results.koWins++;
        }

        //pobjede 
        if(match.winner === match.boxer1 || match.winner === match.boxer2){
            if(!wins[match.winner]){ // ako jos nemamo pobjeda za tog boxera, postavi na 0
                wins[match.winner] = 0; //ako jos nismo imali pobjeda za tog boxera, postavi na 0
            }
            wins[match.winner]++; //povecaj broj pobjeda za tog boxera

            /*if(!roundUsed[match.winner]){ //ako jos nemamo podatak o rundi u kojoj je taj boxer ostvario pobjedu, postavi na neki veliki broj (npr 100) da bi kasnije mogli usporediti i odabrati manji broj rundi
                roundUsed[match.winner] = 100;
            }*/
            roundUsed[match.winner] = match.round; //ako jos nemamo podatak o rundi u kojoj je taj boxer ostvario pobjedu, postavi na trenutnu rundu, a ako vec imamo, onda usporedi i postavi manji broj rundi (ako je trenutna runda manja od postojece runde)
        }
        
    });

    let top = null;
    //top mora biti nul na pocetku jer jos nismo obradili nijedan meč, a nakon obrade svih mečeva ćemo imati podatke o pobjedama i rundama za svakog boksera, pa ćemo moći odrediti tko je top boxer na osnovu tih podataka
    Object.keys(wins).forEach(boxer => {
        if(!top ||wins[boxer] > wins[top]||wins[boxer] === wins[top] && roundUsed[boxer] < roundUsed[top]){

            top = boxer; //ako nema top, ili ako trenutni boxer ima vise pobjeda od topa, ili ako imaju isti broj pobjeda ali trenutni boxer je ostvario pobjedu u manjem broju rundi, onda postavi top na trenutnog boxera
        }
        

    })

    results.topBoxer = top;//top boxer je onaj koji ima najvise pobjeda, a ako imaju isti broj pobjeda, onda onaj koji je ostvario pobjedu u manjem broju rundi


    //ranking samo ako nema flagged matches
    if(results.flaggedMatches.length === 0){
        results.ranking = Object.keys(wins)//koristimo object jer wins je objekat gdje su kljucevi imena boksera a vrijednosti broj pobjeda
        .map(name => ({name, wins: wins[name]}))//mapira kljuceve u novi niz objekata sa imenom i brojem pobjeda
        .sort((a,b) => wins[b] - wins[a]);//sortira niz po broju pobjeda, od najvise do najmanje
    }


    return results;

}



const result = analyzeBoxingMatches(matches);//ovo nam daje objekt sa svim analizama,
//  uključujući topBoxer, koWins, totalMatches i flaggedMatches


document.getElementById("output").textContent =JSON.stringify(result, null, 2); //json stringify pretvara objekt u string,
//  null i 2 su opcionalni parametri za formatiranje
