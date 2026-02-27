let niz=[];
/*let unos = parseInt(prompt("Unesi broj: "));

while (true) {
if(unos !== 0){
  niz.push(unos);
  unos = parseInt(prompt("Unesi broj: "));
}
else if (unos < 0) {
    niz.push(unos);
  console.log("Unos je negativan.");
}
else if(unos === -1){
    niz.push(unos);
    console.log("Unos je -1, završeno.");
    
}
break;
}
console.log(niz);

*/

/*
while (true) {

  if (unos === -1) {
    console.log("Unos je -1, završeno.");
    break;
  }

  if (unos < 0) {
    console.log("Unos je negativan.");
  }

  niz.push(unos);

  unos = parseInt(prompt("Unesi broj (-1 za kraj):"));
}

console.log(niz);
//---------------------------------------------------------------------------- 

while (true) {
  unos = Number(prompt("Unesi broj (-1 za prekid):"));

  if (unos === -1) {
    break;
  }

  niz.push(unos);
}

console.log(niz);



let niz2 = [1, 2, 3, 4, 5];
let unos2 = Number(prompt("Unesi broj: "));

while (true) {  
    if (unos2 === 46) {
        break;
    }
    niz2.push(unos2);

    console.log(niz2);
}


let nizR = [1,2,3,4,5,6];
let nizNr = [6,5,4,3,2,1];

let rastuci = true;
let opadajuci = true;

for(let i = 0; i < nizR.length - 1; i++){
    if(nizR[i] > nizR[i + 1]){
        rastuci = false;
        break;
    }
}

for(let i = 0; i < nizNr.length - 1; i++){
    if(nizNr[i] < nizNr[i + 1]){
        opadajuci = false;
        break;
    }
}

console.log("Niz R je rastući:", rastuci);
console.log("Niz Nr je opadajući:", opadajuci);*/


niz = [1, -2, 3, 4, -5, 6];
//let zadnji1 = niz[niz.length - 1];
let zadnji = niz.pop();
niz.unshift(zadnji);
console.log(niz);

// funkcija za poredjenje nizova

let a = [1, 2, 3];
let b = [1,5,7];

function poredjenje(a, b) {
  if (a.length !== b.length) {
    console.log("Nizovi imaju različite dužine.");
    return false;
  }
  else if (a.length === b.length) {
    console.log("Nizovi imaju iste dužine.");
    return true;
  }
}

poredjenje(a, b);

function jednaki(a, b) {
  if (a.length !== b.length) return false;
  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) return false;
  }
  return true;
}
console.log("24. Jednaki:", jednaki([1,2,3], [1,2,3]));


nizKojiSePretvtaraUString = [1, 2, 3, 4, 5];
let string = nizKojiSePretvtaraUString.join(",");
console.log(string);


//let idemo = [1, 2, 3, 4, 5,6,7,8,9,10];

//let max = Math.max(...idemo);
let kpijaSaBrojem = [...idemo];
kpijaSaBrojem.splice(kpijaSaBrojem.indexOf(max) + 1, 0, -52);
console.log(kpijaSaBrojem);

let idemo = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// find max value
let max = Math.max(...idemo);

// find index of max
let index = idemo.indexOf(max);

// copy array
let kopijaSaBrojem = [...idemo];

// insert -52 after max
kopijaSaBrojem.splice(index + 1, 0, -52);

console.log(kopijaSaBrojem);


// rastuce ne rastuce nizovi

let nizR = [1,2,3,4,5,6];
let nizNr = [6,5,4,3,2,1];
let rastuci = true;
let opadajuci = true;

for (let i = 0; i < nizR.length - 1; i++){
    if( nizR[i] > nizR[i + 1]){
        rastuci = false;
        break;
    }
    else if (nizR[i] < nizR[i + 1]){
        rastuci = true;
        break;
    }
}
      for (let i = 0; i < nizNr.length -1 ; i ++){
        if (nizNr[i] < nizNr[i + 1]){
        opadajuci = false;
        break;
        }
        else if( nizNr[i]> nizNr [i + 1]){
            opadajuci = true;
            break;
        }
      }

      
console.log("Rastući niz:", rastuci);
console.log("Opadajući niz:", opadajuci);

console.log("2. Naopako:");
for (let i = nizR.length - 1; i >= 0; i--) {
  console.log(nizR[i]);
}
   




