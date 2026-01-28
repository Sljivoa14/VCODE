//HP corona
let hp = 32;
let damage = parseInt(prompt("unesite corona damage: "));

for(let i = 0; i<damage; i ++){
  if(damage >0 && hp>0){
    hp--;
  }
  else if(damage<0 && hp<100){
    hp++
  }
}

if(hp===0){
  console.log("HP = 0 umro si!");
}
else if(damage<0){
  console.log("dobio si melem, HP = " + hp);
}
else{
  console.log("HP = " + hp);
}

/*if(damage>0){
  for (var i = 0; i < damage; i++) {
    hp--
    
    if(hp<=0){
      
    }
  }
}else if(damage<0){
  for(let a = 0; )
  
}

if(hp===0){
  console.log("hp=0 - Umro si!");
}
else{
  console.log("preostalo to je jos" + hp + "hp-a")
}
*/

//--------------------------------------------------------------------------------------------------------------------------------------------------
//PDV

/*
let cjena = parseInt(prompt("Koliko kosta artikal"));
for (var pdv = 0,17) {
  let cjenaSaPDV = cjena / pdv;
}
console.log("Cjena PDV-a je " + cjenaSaPDV);*/

let cjena = parseFloat(prompt("Koliko košta artikal?"));
let pdv = 0.17;

let iznosPDV = cjena * pdv;
let cjenaSaPDV = cjena + (cjena * pdv);

console.log("Iznos PDV-a je " + iznosPDV + " a ukupan iznos je" + cjenaSaPDV);


// lozinka
let sifra = parseInt(prompt("unesite sifru: "));
let lozinka = parseInt(prompt("unesite sifru: "));;
if (lozinka === sifra){
  console.log("tacna lozinka");
  
}
else{
  console.log("pogresna lozinka, probaj ponovo");
  
}

//----------------------------------------------------------------------------------------------------------------------------------------------
//BuzzFizz
for (var i = 1; i < 100; i++) {
  if(i%3===0 && i%5===0){
    console.log(i +"fizzBuzz");
  }
  else if (i%3===0){
    console.log(i+"fizz");
  }
  else if(i%5===0){
    console.log(i +"buzz")
  }
  else{
    console.log(i)
  }
}
  
