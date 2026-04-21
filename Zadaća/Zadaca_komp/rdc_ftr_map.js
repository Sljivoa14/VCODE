//REDUCE
const brojevi = [1, 2, 3, 4, 5];
const suma = brojevi.reduce((acc, x) => acc + x, 0); //0 je pocetna vrijednost akumulatora

//unutra
let acc = initialValue;

for (let i = 0; i < array.length; i++) {
  acc = callback(acc, array[i]);
}

return acc;

/*Iteration:
acc = 0, x = 1 → acc + x = 0 + 1 = 1 → acc = 1
acc = 1, x = 2 → acc + x = 1 + 2 = 3 → acc = 3
acc = 3, x = 3 → acc + x = 3 + 3 = 6 → acc = 6
acc = 6, x = 4 → acc + x = 6 + 4 = 10 → acc = 10
acc = 10, x = 5 → acc + x = 10 + 5 = 15 → acc = 15*/




//FILTER
const brojevi3 = [1, 2, 3, 4, 5];
const parni = brojevi3.filter(x => x % 2 === 0);
console.log(parni); // [2, 4]

//unutra
const result2 = [];
for (let i = 0; i < array.length; i++) {
  if ( /* condition */ ) {
    result2.push( array[i] );
  }
}

/*Iteration:
x = 1 → 1 % 2 === 0? No → []
x = 2 → 2 % 2 === 0? Yes → [2]
x = 3 → 3 % 2 === 0? No → [2]
x = 4 → 4 % 2 === 0? Yes → [2, 4]
x = 5 → 5 % 2 === 0? No → [2, 4]*/




//MAP
const brojevi2 = [1, 2, 3];
const duplo = brojevi2.map(x => x * 2);

//unutra
const result1 = [];

for (let i = 0; i < array.length; i++) {
  result1.push( /* transformed item */ );
}

/*Iteration:
x = 1 → 1 * 2 = 2 → [2]
x = 2 → 2 * 2 = 4 → [2, 4]
x = 3 → 3 * 2 = 6 → [2, 4, 6]*/

//FIND
const brojevi1 = [1, 2, 3, 4, 5];
const prviParni = brojevi1.find(x => x % 2 === 0);
console.log(prviParni); // 2

//unutra
let foundItem = undefined;
for (let i = 0; i < array.length; i++) {
    if ( /* condition */ ) {
        foundItem = array[i];
        break;
    }
}
/*Iteration:
x = 1 → 1 % 2 === 0? No → foundItem = undefined
x = 2 → 2 % 2 === 0? Yes → foundItem = 2 → break
x = 3 → (not reached)
x = 4 → (not reached)
x = 5 → (not reached)*/ 