/* imamo 3 dijela zadatka koja hocu da ti pokazem kako bi ja uradio:
 1) totalMatches - Broj svih mečeva u nizu
 2) topBoxer - Bokser koji je ostvario najviše pobjeda
 3) knockoutWins - Broj mečeva koji su završili KO ili TKO

flaggedMatches necu jer si to vec fino kreno raditi.

Najteze od ova prva tri je topBoxer, pa cu prvo uraditi ukupan broj meceva i broj meceva koji su zavrsili sa KO ili TKO*/

function analyzeBoxingMatches(matchesArray) {
  // rjesavam totalMatches - samo mi jedna linija koda treba
  let totalMatches = matchesArray.length;
  // rjesavam knockoutWins
  let knockoutWins = 0;
  for (let i = 0; i < matchesArray.length; i++) {
    let match = matchesArray[i];
    // Provjera da li je meč završio nokautom
    if (match.method === "KO" || match.method === "TKO") {
      knockoutWins++;
    }
  }
  //s ovim smo rijesili 2 od 4 dijela zadatka, sad prelazim na top Boxer
  // objekat
  let stats = {};

  for (let i = 0; i < matchesArray.length; i++) {
      
    let match = matchesArray[i]; 
    // obrada pobjednika
    let currentWinner = match.winner;
    let roundsPlayed = match.rounds;
    // ako bokser još nije u stats dodajemo ga
    if (!stats[currentWinner]) {
      stats[currentWinner] = {
        wins: 0,
        totalRounds: 0
      };
    }
    // povećamo pobjede i dodamo runde
    stats[currentWinner].wins++;
    stats[currentWinner].totalRounds += roundsPlayed;
  }

  // pravljenje ranking niza (moramo spojiti nizove u jedan niz objekata za kraj)
  let ranking = [];
  for (let boxer in stats) {
    ranking.push({
      name: boxer,
      wins: stats[boxer].wins,
      totalRounds: stats[boxer].totalRounds
    });
  }

  ranking.sort(function(a, b) {
  // prvo provjeravamo pobjede (glavni kriterij)
  if (b.wins !== a.wins) {
    return b.wins - a.wins; 
  }
  // ako su pobjede iste, izvršava se ovaj dio:
  // sortiramo po rundama 
  return a.totalRounds - b.totalRounds;
});


  return {
    totalMatches: totalMatches,
    topBoxer: ranking[0].name,
    knockoutWins: knockoutWins,
    ranking: ranking
  };
}

// ==========================================
// TESTIRANJE KODA
// ==========================================

const test1 = [
  { id: 1, boxer1: "Amar", boxer2: "Tarik", winner: "Amar", method: "KO", rounds: 2 },
  { id: 2, boxer1: "Lejla", boxer2: "Tarik", winner: "Lejla", method: "Decision", rounds: 5 },
  { id: 3, boxer1: "Amar", boxer2: "Lejla", winner: "Amar", method: "TKO", rounds: 3 },
  { id: 4, boxer1: "Tarik", boxer2: "Lejla", winner: "Tarik", method: "Decision", rounds: 4 }
];

console.log("TEST 1 REZULTAT:");
console.log(analyzeBoxingMatches(test1));

const test2 = [
  { id: 1, boxer1: "A", boxer2: "B", winner: "A", method: "KO", rounds: 1 },
  { id: 2, boxer1: "A", boxer2: "C", winner: "A", method: "KO", rounds: 1 },
  { id: 3, boxer1: "B", boxer2: "C", winner: "B", method: "Decision", rounds: 6 },
  { id: 4, boxer1: "B", boxer2: "A", winner: "B", method: "Decision", rounds: 6 }
];

console.log("\nTEST 2 REZULTAT:");
console.log(analyzeBoxingMatches(test2));