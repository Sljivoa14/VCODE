/* var arr = function(input) {
  if (toString.call(input) === "[object Array]")
    return true;
  
  return false;   
};

console.log(arr('w3resource'));

console.log(arr([1, 2, 4, 0]));

----------------------------------------------------------------------------*/

function is_array(input) {
  if (Array.isArray(input)) {
    return true;
  } else {
    return false;
  }
}

console.log(is_array('w3resource'));   // false
console.log(is_array([1, 2, 4, 0]));    // true 

/*-----------------------------------------------------------------------------
Write a JavaScript function to clone an array.
*/

[]// array
{}//object

function array_Clone(arr) {
  return arr.slice(0);
};

// Pocetni niz
let niz = [12, -5, 7, 4, -2, 7, 123, 45];

console.log("1. Ispis niza:");
console.log(niz);

//------------------------------------------------------------------------------
// 2. Naopako
console.log("2. Naopako:");
for (let i = niz.length - 1; i >= 0; i--) {
  console.log(niz[i]);
}

//------------------------------------------------------------------------------
// 3. Parni
console.log("3. Parni:");
for (let i = 0; i < niz.length; i++) {
  if (niz[i] % 2 === 0) console.log(niz[i]);
}

//------------------------------------------------------------------------------
// 4. Negativni
console.log("4. Negativni:");
for (let i = 0; i < niz.length; i++) {
  if (niz[i] < 0) console.log(niz[i]);

}

//------------------------------------------------------------------------------
// 5. Zbir svih
let suma = 0;
for (let i = 0; i < niz.length; i++) {
  suma += niz[i];
}
console.log("5. Zbir:", suma);

let randomNiz = [3, 5, 7, 2, 8, 1];
let sumRandom = 0;
for(let i = 0; i <randomNiz.length; i ++){
    sumRandom += randomNiz[i];
}
console.log("Zbir random niza:", sumRandom);

//------------------------------------------------------------------------------
// 6. Zbir parnih
let sumaParnih = 0;
for (let i = 0; i < niz.length; i++) {
  if (niz[i] % 2 === 0) sumaParnih += niz[i];
}
console.log("6. Zbir parnih:", sumaParnih);

//------------------------------------------------------------------------------
// 7. Zbir negativnih
let sumaNeg = 0;
for (let i = 0; i < niz.length; i++) {
  if (niz[i] < 0) sumaNeg += niz[i];
}
console.log("7. Zbir negativnih:", sumaNeg);

//------------------------------------------------------------------------------
// 8. Proizvod
let proizvod = 1;
for (let i = 0; i < niz.length; i++) {
  proizvod *= niz[i];
}
console.log("8. Proizvod:", proizvod);

//------------------------------------------------------------------------------
// 11. Obrnuti niz
let obrnuti = [];
for (let i = niz.length - 1; i >= 0; i--) {
  obrnuti.push(niz[i]);
}
console.log("11. Obrnuti:", obrnuti);

//------------------------------------------------------------------------------
// 12. Ukloniti duplikate
let bezDuplikata = [...new Set(niz)];
console.log("12. Bez duplikata:", bezDuplikata);

//------------------------------------------------------------------------------
// 13. Najveci
let max = niz[0];
for (let i = 1; i < niz.length; i++) {
  if (niz[i] > max) max = niz[i];
}
console.log("13. Najveci:", max);

//------------------------------------------------------------------------------
// 14. Najmanji
let min = niz[0];
for (let i = 1; i < niz.length; i++) {
  if (niz[i] < min) min = niz[i];
}
console.log("14. Najmanji:", min);

//------------------------------------------------------------------------------
// 15. Najvise cifara
let maxCifre = 0;
let brojMax;
for (let i = 0; i < niz.length; i++) {
  let duzina = Math.abs(niz[i]).toString().length;
  if (duzina > maxCifre) {
    maxCifre = duzina;
    brojMax = niz[i];
  }
}
console.log("15. Najvise cifara:", brojMax);

//------------------------------------------------------------------------------
// 16. Najveci zbir cifara

//let niz = [12, -5, 7, 4, -2, 7, 123, 45];
let maxZbir = 0;
let brojZbir;
for (let i = 0; i < niz.length; i++) {
  let temp = Math.abs(niz[i]).toString();
  let zbir = 0;
  for (let j = 0; j < temp.length; j++) {
    zbir += parseInt(temp[j]);
  }
  if (zbir > maxZbir) {
    maxZbir = zbir;
    brojZbir = niz[i];
  }
}
console.log("16. Najveci zbir cifara:", brojZbir);

//------------------------------------------------------------------------------
// 17. Provjera rastuci
let rastuci = true;
for (let i = 0; i < niz.length - 1; i++) {
  if (niz[i] > niz[i + 1]) {
    rastuci = false;
    break;
  }
}
console.log("17. Da li je rastuci:", rastuci);

//------------------------------------------------------------------------------
// 18. Izbaciti 7
let bezSedmice = niz.filter(el => el !== 7);
console.log("18. Bez broja 7:", bezSedmice);

//------------------------------------------------------------------------------
// 19. Ubaciti -52 nakon najveceg
let indexMax = niz.indexOf(max);
let kopija = [...niz];
kopija.splice(indexMax + 1, 0, -52);
console.log("19. Ubacen -52:", kopija);

let radnomK = [1,4,7,-3,7, -1, 9, 0];
let maxRadnom = "we'll get here later" ;

//------------------------------------------------------------------------------
// 20. Sortirati
let sortirani = [...niz];
sortirani.sort((a, b) => a - b);
console.log("20. Sortirani:", sortirani);

//------------------------------------------------------------------------------
// 21. Spojiti dva niza
let niz1 = [1,2,3];
let niz2 = [4,5,6];
let spojeni = [...niz1, ...niz2];
console.log("21. Spojeni:", spojeni);

//------------------------------------------------------------------------------
// 22. Rotacija udesno
let rotacija = [...niz];
let zadnji = rotacija.pop();
rotacija.unshift(zadnji);
console.log("22. Rotirani:", rotacija);

//------------------------------------------------------------------------------
// 23. Niz u string
let string = niz.join(",");
console.log("23. String:", string);

//------------------------------------------------------------------------------
// 24. Funkcija za poređenje
function jednaki(a, b) {
  if (a.length !== b.length) return false;
  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) return false;
  }
  return true;
}
console.log("24. Jednaki:", jednaki([1,2,3], [1,2,3]));
