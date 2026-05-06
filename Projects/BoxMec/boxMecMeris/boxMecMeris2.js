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
  // evo smo snizovim (iako je bolje da ovo bude objekat kad bolje razmisim). Pošto mi trebajau 3 podatka (ime, pobjede i ako su pobjede izjednačene, onda runde), koristimo onda tri niza
  let names = [];        // npr. ["Amar", "Lejla", "Tarik"]
  let wins = [];         // npr. [2, 1, 1]
  let totalRounds = [];  // npr. [5, 5, 9]

  for (let i = 0; i < matchesArray.length; i++) {
      
    let match = matchesArray[i]; 
    // obrada pobjednika
    let currentWinner = match.winner;
    let roundsPlayed = match.rounds;
    
    // moramo provjeriti da li već imamo tog boksera u nizu 'names'
    let foundIndex = -1;
    for (let j = 0; j < names.length; j++) {
      if (names[j] === currentWinner) {
        foundIndex = j; // Našli smo ga na poziciji j
        break;
      }
    }

    if (foundIndex === -1) {
      // ako ga nema, dodajemo novo ime i nove nule u statistiku
      names.push(currentWinner);
      wins.push(1);
      totalRounds.push(roundsPlayed);
    } else {
      // ako ga ima, samo ažuriramo podatke na tom istom indeksu
      wins[foundIndex] = wins[foundIndex] + 1;
      totalRounds[foundIndex] = totalRounds[foundIndex] + roundsPlayed;
    }
  }

  // Pronalazak topBoxer-a (pretražujemo nizove pomoću indeksa)
  let topBoxerIndex = 0; //pretpostavimo da je prvi bokser najbolji, pa idemo kroz sve i poredimo b+pobjede i runde

  for (let i = 1; i < names.length; i++) {
    // ako trenutni bokser ima više pobjeda, onda njegov indeks zapamtimo kao da je on najbolji
    if (wins[i] > wins[topBoxerIndex]) {
      topBoxerIndex = i;
    } 
    // ako imaju isto pobjeda, gledamo ko ima manje rundi
    else if (wins[i] === wins[topBoxerIndex]) {
      if (totalRounds[i] < totalRounds[topBoxerIndex]) {
        topBoxerIndex = i;
      }
    }
  }

  // pravljenje ranking niza (moramo spojiti nizove u jedan niz objekata za kraj)
  let ranking = [];
  for (let i = 0; i < names.length; i++) {
    ranking.push({ name: names[i], wins: wins[i], rounds: totalRounds[i] });
  }

  ranking.sort(function(a, b) {
  // prvo provjeravamo pobjede (glavni kriterij)
  if (b.wins !== a.wins) {
    return b.wins - a.wins; 
  }
  // ako su pobjede iste, izvršava se ovaj dio:
  // sortiramo po rundama 
  return a.rounds - b.rounds;
});


  return {
    totalMatches: totalMatches,
    topBoxer: names[topBoxerIndex],
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