
const ucenici = [
  { ime: "Amar", godine: 15, ocjene: [5, 4, 5] },
  { ime: "Lejla", godine: 16, ocjene: [3, 4, 5] },
  { ime: "Tarik", godine: 15, ocjene: [2, 3, 4] }
];

ucenici.forEach(ucenik => console.log(ucenik.ime)); 

ucenici.forEach(ucenik => {
  console.log(ucenik.ime);
});

/*for ( let ucenik of ucenici) {
    console.log(ucenik.ime);
}
for (let i = 0; i < ucenici.length; i++) {
    console.log(ucenici[i].ime);
}*/

function dodajUcenika(ime, godine, ocjene){
    ucenici.push({ ime, godine, ocjene });

}
dodajUcenika("selma", 18, [5,2,5]);
console.log(ucenici);

function pronadjiUcenika(ime){
  const ucenik = ucenici.find(t => t.ime === ime);
  if(ucenik){                                   //nemoze bit ===true jer je objekat
    console.log("pronadjen ucenik ", ucenik);
    
  }
  else{
    console.log("ucenik nije pronadjen");
  }
}

pronadjiUcenika("selma");
pronadjiUcenika("andrej");


//prosjek 
//1. 
ucenici.forEach(ucenik => {
    const prosjek = ucenik.ocjene.reduce((suma, ocjena) => suma + ocjena, 0) / ucenik.ocjene.length;
    console.log(`${ucenik.ime}: ${prosjek.toFixed(2)}`);
 });

 //2. 
 for(let ucenik of ucenici){
    let suma = 0;
    for(let ocjena of ucenik.ocjene){
        suma+= ocjena;
    }
    ucenik.prosjek = suma / ucenik.ocjene.length;
    console.log(`${ucenik.ime}: ${prosjek}`);
 }
//prosjek u objekat 
// Dodaj novi property prosjek u objekat i za svakog učenika upiši odgovarajući

//1.
for(let ucenik of ucenici){
    let suma = 0;
    for(let ocjena of ucenik.ocjene){
        suma += ocjena;
    }
    ucenik.prosjek = suma / ucenik.ocjene.length;
} 


//2.

//najbolji učenik
//1.
let najbolji = ucenici[0];
for (let ucenik of ucenici){
    if(ucenik.prosjek > najbolji.prosjek){
        najbolji = ucenik;

    }
}
console.log("Najbolji učenik:", najbolji.ime);
//2.
let najbolji2= ucenici.reduce((najbolji, trenutni) => {
    return trenutni.prosjek > najbolji.prosjek ? trenutni : najbolji;
}, ucenici[0]);
console.log("Najbolji učenik (reduce):", najbolji2.ime);


//filtriraj ucenike koji imaju prosjek veći od 4
const veciOd4 = ucenici.filter(ucenik => ucenik.prosjek > 4)
console.log("Učenici sa prosjekom većim od 4:", veciOd4.map(u => u.ime).join(", "));

//sortiraj ucenike po prosjeku
//const sortirano = ucenici.sort((a, b) => b.prosjek - a.prosjek); //ne preporucuje se jer mijenja originalni niz, 
// bolje je napraviti kopiju niza i sortirati tu kopiju
const sortirano = [...ucenici].sort((a, b) => {return b.prosjek - a.prosjek});
console.log("Učenici sortirani po prosjeku:", sortirano.map(u => `${u.ime} (${u.prosjek.toFixed(2)})`).join(", "));
//toFixed(2) - ogranicava broj decimala na 2, vraca string, zato ne mogu koristiti u matematicim operacijama, ali mogu za ispis
//map transformise svaki element niza i smjesta ga u novi niz, u ovom slucaju transformise objekat u 
// string sa imenom i prosjekom, a zatim join spaja te stringove u jedan string sa zarezom izmedju


//------------------------------- ZADATAK 2

const proizvodi = [
{ naziv: "Laptop", cijena: 1500, kategorija: "tehnika", stanje: 5/* ukupnaVrijednost: 7500 */ }, 
{ naziv: "Telefon", cijena: 800, kategorija: "tehnika", stanje: 0 } /* ukupnaVrijednost: 0 */ ,
{ naziv: "Majica", cijena: 30, kategorija: "odjeca", stanje: 20 /* ukupnaVrijednost: 600 */ },
{ naziv: "Patike", cijena: 120, kategorija: "odjeca", stanje: 10 /* ukupnaVrijednost: 1200 */ }
];

const naStanju = [];
for (let proizvod of proizvodi) {
    if(proizvod.stanje > 0){
        naStanju.push(proizvod);
    }
}

console.log("proizvodi na stanju: ", naStanju);
console.log("Proizvodi na stanju:", naStanju.map(p => p.naziv).join(", "));

for (let i = 0; i < proizvodi.length; i++) {
    if(!proizvodi[i].stanje > 0){
        proizvodi[i].delete = true;
        console.log(`Proizvod ${proizvodi[i].naziv} je obrisan jer nema na stanju.`);   

    }
}

const samoNazivi = proizvodi.map(p => p.naziv);
console.log("Nazivi proizvoda:", samoNazivi.join(", "));

const tehnika = proizvodi.filter(p=> p.kategorija === "tehnika");
console.log("Proizvodi iz kategorije tehnika:", tehnika.map(p => p.naziv).join(", "));

const ukupnaVrijednost = proizvodi.map(p => ({
  ...p,
  ukupnaVrijednost: p.cijena * p.stanje
}));
console.log("Proizvodi s ukupnom vrijednošću:", ukupnaVrijednost);

//...p = spread operator, uzima sve postojeće propertyje iz objekta p i dodaje ih u novi objekat, a 
// zatim dodaje ili prepisuje property ukupnaVrijednost. Na taj način ne mijenjamo originalni objekat p, 
// već stvaramo novi objekat koji ima sve iste propertyje plus novi property ukupnaVrijednost.   

proizvodi.map(p => {
  p.ukupnaVrijednost = p.cijena * p.stanje;
});
 // ne preporučuje se jer mijenja originalne objekte u nizu, 
// što može dovesti do neželjenih posljedica ako se ti objekti koriste negdje drugdje u kodu. 
// Bolje je koristiti map za stvaranje novih
//  objekata s dodatnim propertyjem, kao što je prikazano u prethodnom primjeru.   

// grupiši proizvode u tehnika=[] i odjeca=[]
const grupiraniProizvodi = proizvodi.reduce((acc, proizvod) => {
  if (proizvod.kategorija === "tehnika") {
    acc.tehnika.push(proizvod);
  } 
  else if (proizvod.kategorija === "odjeca") {
    acc.odjeca.push(proizvod);
  }

  return acc;
}, { tehnika: [], odjeca: [] });

console.log("Grupirani proizvodi:", grupiraniProizvodi);

//najskuplji proizvod tehnika i odjeca


const najskupljiTehnika = proizvodi.reduce((acc, proizvod) => {
    if(proizvod.kategorija === "tehnika"){
        if(!acc || proizvod.cijena > acc.cijena){
            acc = proizvod;
        }
    }
    return acc;
},null);

console.log("Najskuplji proizvod u kategoriji tehnika:", najskupljiTehnika.naziv);

const najskupljiOdjeca = proizvodi.reduce((acc, proizvod) => {
    if(proizvod.kategorija === "odjeca"){
        if(acc===null || proizvod.cijena > acc.cijena){
            acc=proizvod;
        }
        else if(proizvod.cijena === acc.cijena){
            acc.push(proizvod);
        }
    }
    return acc;
}, null);

if(Array.isArray(najskupljiOdjeca)){
    console.log("Najskuplji proizvodi u kategoriji odjeca:", najskupljiOdjeca.map(p => p.naziv).join(", "));
}
else if(najskupljiOdjeca){
    console.log("najjckuplja odjeca:", najskupljiOdjeca.naziv);
}
else{
    console.log("Nema proizvoda u kategoriji odjeca.");
}


//najeftiniji proizvod tehnika i odjeca

const najeftinijiTehnika= proizvodi.reduce((acc,proizvod)=>{
    if(proizvod.kategorija === "tehnika"){
        if(!acc || proizvod.cijena < acc.cijena){
            acc= rpoizvod;
        }

    }
    /*if(proizvod.kategorija === "odjeca"){
        if(!acc || proizvod.cijena < acc.cijena){
            acc = proizvod;
        }
    }*/
    return acc;
}, null);

console.log("Najeftiniji proizvod u kategoriji tehnika:", najeftinijiTehnika.naziv);

const najjeftinijaOdjeca = proizvodi.reduce((acc, proizvod) => {
    if(proizvod.kategorija === "odjeca"){
        if(!acc || proizvod.cijena < acc.cijena){
            acc = proizvod;
        }
    }
    return acc;
}, null);

console.log("Najeftiniji proizvod u kategoriji odjeca:", najeftinijiOdjeca.naziv);

//-------------------------------- ZADATAK 3

const narudzbe = [
{ id: 1, kupac: "Amar", iznos: 120 },
{ id: 2, kupac: "Lejla", iznos: 80 },
{ id: 3, kupac: "Amar", iznos: 200 },
{ id: 4, kupac: "Tarik", iznos: 50 }
];

//Koristeći map, napravi novi niz koji sadrži samo iznose narudžbi. Očekivano: [120, 80, 200, 50]
const iznosi = narudzbe.map( nrdzba => nrdzba.iznos);
console.log("Iznosi narudžbi:", iznosi);
//Koristeći forEach, ispiši sve narudžbe u formatu: Kupac Amar je napravio narudžbu od 120 KM
narudzbe.forEach(narudzba => console.log(`Kupac je ${narudzba.kupac} kupio  za ${narudzba.iznos} KM`));
//Koristeći filter, napravi novi niz koji sadrži samo narudžbe koje su veće od 100 KM. 
const velikNarudzbe = narudzbe.filter ( narudzbe => narrudzbe.iznos > 100);
console.log("Narudžbe veće od 100 KM:", velikNarudzbe);
//Koristeći reduce, izračunaj ukupni iznos svih narudžbi.
const ukupniiznos = narudzbe.reduce((suma, narudzbe)=> suma + narudzbe.iznos, 0);
console.log("Ukupni iznos svih narudžbi:", ukupniiznos);
//Koristeći reduce, napravi objekat koji grupiše ukupnu potrošnju po kupcu. Očekivano:
/*{
  Amar: 320,
  Lejla: 80,
  Tarik: 50
}
*/
const potrosnjaPoKupcu = narudzbe.reduce ((acc, narudzba)=>{
    if (!acc||acc[narudzba.kupac] === undefined){
        acc[narudzba.kupac]= narudzba.undefined
    }
    else{
        acc[narudzba.kupac] += narudzba.iznos;

    }
    return acc;
}, {});
console.log("Potrosnja po kupcu:", potrosnjaPoKupcu);
//Koristeći kombinaciju filter + map, napravi niz imena kupaca koji 
// su napravili narudžbe veće od 100 KM. Očekivano: ["Amar", "Amar"]
const kupciVelikiIznos = [];
narudzbe.filter(narudzba => narudzba.iznos > 100).forEach(narudzba => kupciVelikiIznos.push(narudzba.kupac));
map(narudzba => narudzba.kupac);
console.log("Kupci koji su napravili narudžbe veće od 100 KM:", kupciVelikiIznos);


//------------------------------- ZADATAK 4
const korisnici1  = [
  { id: 1, ime: "Amar", godine: 25, bodovi: [10, 20, 30] },
  { id: 2, ime: "Lejla", godine: 17, bodovi: [15, 25] },
  { id: 3, ime: "Tarik", godine: 30, bodovi: [5, 10, 15] }
];

const korisnici2 = korisnici1.slice(1);
console.log(korisnici2);     //kopija niza,brisemo prvi element iz kopije, ostali ostaju netaknuti


const korsnici3= korisnici1.splice(-1, 1);
console.log(korsnici3);     //brisemo elemente iz originalnog niza, dobijamo obrisane elemente u novom nizu
korisnici1.push( {id: 3, ime: "Tarik", godine: 30, bodovi: [5, 10, 15] });
console.log(korisnici1);     //originalni niz je promijenjen, obrisan je zadnji element, a zatim je ponovo dodat na kraj niza

//sortiraj od najmladjeg do najstarijeg
const sortiranje= [...korisnici1].sort((a, b) => a.godine - b.godine);
console.log("od najmaldjeg do najstarijeg:", sortiranje.map(k => `${k.ime} (${k.godine} godina)`).join(", ")); //map transformise svaki element niza u string sa imenom i godinama, a zatim join spaja te stringove u jedan string sa zarezom izmedju

//sortiraj od najstarijeg do najmladjeg
const sortiranje2 = [...korisnici1].sort((a, b) => b.godine - a.godine);
console.log("od najstarijeg do najmaldjeg:", sortiranje2);
 
//sortiranje po bodovima
const sortiranjePoBodovima = [...korisnici1].sort((a,b) =>b.bodovi.reduce((suma, bod) => suma + bod, 0) - a.bodovi.reduce((suma, bod) => suma + bod, 0));
console.log("Korisnici sortirani po ukupnim bodovima:", sortiranjePoBodovima.map(k => `${k.ime} (${k.bodovi.reduce((suma, bod) => suma + bod, 0)} bodova)`).join(", "));
//2.
const sortiranjePoBodovima2 = [...korisnici1].sort((a, b) => {
const bodoviA = a.bodovi.reduce((s,b)=> s+b,0);
const bodoviB = b.bodovi.reduce((s,b)=> s+b,0);
return bodoviB - bodoviA;
});
sortiranje.map(k => `${k.ime} (${k.godine} godina)`).join(", ");
console.log("Korisnici sortirani po ukupnim bodovima:", sortiranjePoBodovima2.map(k => `${k.ime} (${k.bodovi.reduce((suma, bod) => suma + bod, 0)} bodova)`).join(", "));

//kopija prvog uz pomoc spread operatora

const kopija = [...korisnici1];
console.log("Kopija korisnici1:", kopija);

//promjeni ime u toj kopiji
kopija[0].ime = "Amar2";
console.log("Kopija nakon promjene imena:", kopija);
console.log("Originalni niz nakon promjene imena u kopiji:", korisnici1); 
//ime se promijenilo i u originalnom nizu jer su objekti referentni tipovi, a spread operator pravi plitku kopiju niza, sto znaci da
//  se objekti unutar niza ne kopiraju, vec se samo referenca na te objekte kopira. 
// Dakle, kada promijenimo ime u kopiji, mijenjamo ime i u originalnom nizu jer oba niza sadrze reference na iste objekte.

//iz jednog korisnika, obrisi property godine
delete kopija[1].godine;
console.log("Kopija nakon brisanja propertyja godine:", kopija);    
console.log("Originalni niz nakon brisanja propertyja godine u kopiji:", korisnici1); 
//godine su obrisane i u originalnom nizu jer su objekti referentni tipovi, 
// a spread operator pravi plitku kopiju niza, sto znaci da se objekti unutar niza ne kopiraju, vec se samo referenca na te objekte kopira. Dakle, 
// kada obrisemo property godine u kopiji, mijenjamo i originalni niz jer oba niza sadrze reference na iste objekte.

//Za svakog korisnika izračunaj ukupan broj bodova
const svakiBrojBodova = korisnici1.map(n =>{return n.bodovi.reduce((suma, bod) => suma + bod, 0)});//ovo radi tako sto funkcija map vraca novi niz sa rezultatima 
// funkcije koja se primjenjuje na svaki element niza, a funkcija reduce se koristi za izracunavanje zbira bodova za svakog korisnika.
const svakiBrojBodova2 = korisnici1.map(n => n.bodovi.reduce((suma, bod) => suma + bod, 0));//ne radi jer funkcija map ne vraca nista, treba dodati return

console.log("Ukupan broj bodova za svakog korisnika:", svakiBrojBodova);

// za jednog korisnika izbirisi broj godine
const korisniciBezGodina = {...korisnici1[0]};
delete korisniciBezGodina.godine;
console.log("Korisnik bez godina:", korisniciBezGodina);

//ukupan broj bodova svih korisnika
const ukupnoBodova = korisnici1.reduce((suma, korisnik)=> suma + korisnik.bodovi.reduce((s,b)=> s+b,0), 0);
console.log("Ukupan broj bodova svih korisnika:", ukupnoBodova);
//inside
for(let korisnik of korisnici1){
    const ukupniBodovi = korisnik.bodovi.reduce((s, b) => s + b, 0);
    console.log(`Ukupan broj bodova za ${korisnik.ime}: ${ukupniBodovi}`);
}
//2
let rezultat = 0;
for(let k of korisnici1){
    let ukupnoB = 0;
    for(let b of k.bodovi){
        ukupnoB += b;
    }
    console.log(`Ukupan broj bodova za ${k.ime}: ${ukupnoB}`);
}




//Napraviti novi niz korisnika koji: imaju više od 30 ukupnih bodova, NE sadrže property godine i sortirani su po bodovima (opadajuće)
const noviNizKorisnika = korisnici1.map (k => ({
    ...k,
    ukupniBodovi: k.bodovi.reduce((s,b) => s+b,0)
}))
.filter(k => k.ukupniBodovi > 30)
.map(k => {
    const { godine, ...rest } = k; //destrukturiranje objekta, uzima sve propertyje osim godine i smjesta ih u novi objekat rest
    return rest;
})
.sort((a, b) => b.ukupniBodovi - a.ukupniBodovi);
console.log("Novi niz korisnika:", noviNizKorisnika);
//inside 

/*const noviNizKorisnika = korisnici1.map(k => {...k, ukupniBodovi: k.bodovi.reduce((s,b) => s+b,0)})
//prolazi kroz sve korisnike
//za svakog pravi novi objekat sa svim starim podacima(...k)
// dodaje novi property ukupniBodovi koji je zbir bodova za tog korisnika
//reduce ((s,b) => s+b,0) - sabira sve bodove u nizu bodova, pocetni zbir je 0
.filter(k => k.ukupniBodovi > 30) //filtrira korisnike koji imaju ukupne bodove vece od 30
.map(k => {
    const { godine, ...rest } = k; //destrukturiranje objekta, uzima sve propertyje osim godine i smjesta ih u novi objekat rest
    return rest; //vraca novi objekat bez propertyja godine
})
.sort((a, b) => b.ukupniBodovi - a.ukupniBodovi); //sortira korisnike po ukupnim bodovima u opadajucem redoslijedu
console.log("Novi niz korisnika:", noviNizKorisnika);
*/

//Dodaj novog korisnika u niz, ali: ne smiješ direktno mijenjati originalni niz i moraš koristiti spread (...)
const noviKorisnik = { id: 4, ime: "Selma", godine: 22, bodovi: [20, 30, 40] };
const noviNizKorisnika2 = [...korisnici1, noviKorisnik];
console.log("Novi niz korisnika sa dodatim korisnikom:", noviNizKorisnika2);


//-------------------------------- ZADATAK 5

//Napiši dvije funkcije koje rade istu stvar. Jednu napiši kao klasičnu funkciju,
//a drugu kao  arrow funkciju.Funkcija treba primiti 
//niz brojeva i vratiti novi niz gdje je svaki broj pomnožen sa 2

//Klasična funkcija
function pomnoziSaDva(niz) {
    const noviNiz = [];
    for (let i = 0; i < niz.length; i++) {
        noviNiz.push(niz[i] * 2);
    }
    return noviNiz;
}
//Arrow funkcija
const pomnoziSaDvaArrow = (niz) => {
    const noviNiz = [];
    for (let i = 0; i < niz.length; i++) {
        noviNiz.push(niz[i] * 2);
    }
    return noviNiz;
};
//Testiranje funkcija
const brojevi = [1, 2, 3, 4, 5];
console.log("Klasična funkcija:", pomnoziSaDva(brojevi));
console.log("Arrow funkcija:", pomnoziSaDvaArrow(brojevi));



//callback funkcija: Napiši funkciju koja će proći kroz niz primijeniti callback na svaki element i vratiti novi niz. 
// Poziv bi izgledao ovako: obradiNiz([1, 2, 3], (broj) => broj * 3);, a ispod prototip funkcije:
//function obradiNiz(niz, callback) {
// implementacija

function obradiNiz(niz, callback) {
    const noviNiz = [];
    for (let i = 0; i < niz.length; i++) {
        noviNiz.push(callback(niz[i]));
    }
    return noviNiz;
}
//Testiranje funkcije
const brojevi2 = [1, 2, 3];
const rezultat2 = obradiNiz(brojevi2, (broj) => broj * 3);
console.log("Rezultat obrade niza:", rezultat2);

