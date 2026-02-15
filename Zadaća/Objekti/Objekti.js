let car = {
    brand: "Toyota",
    model: "Corolla",
    year: 2020,

};

console.log("Car Brand: " + car.brand);
console.log("Car Model: " + car.model);
console.log("Car Year: " + car.year);
console.log(car);

car.year = 2021; // update year
console.log("Updated Car Year: " + car.year);

/*
for(let i = 0; i < Object.keys(car).length; i++) {
    let key = Object.keys(car)[i];
    console.log()
}*/

for (let key in car) {
    console.log(key + ": " + car[key]);
}

let carz= [
    { brand: "Toyota", model: "Corolla", year: 2020 },
    { brand: "Honda", model: "Civic", year: 2019 },
    { brand: "Ford", model: "Mustang", year: 2021 }
];

carz.forEach(function(car) {
    console.log("brand :" + car.brand + ", model: " + car.model + ", year: " + car.year);
});

let person = {
    firstName: "John",
    lastName: "Doe",
    age:30,
    address: {
        street: "123 Main St",
        city: "Anytown",
        country: "USA"
    },
    hobbies: ["reading", "traveling", "swimming"]
};  

console.log("Age: " + person.street);

delete person.age;
console.log(person);


car.describe = function() {
    return `this is ${this.brand} ${this.model} from ${this.year}.`;
    //return `this is ${car.brand} ${car.model} from ${car.year}.`;
}

console.log(car.descibe());

let studentz = [
    { name: "Alice", grade: 85 },
    { name: "Bob", grade: 92 },
    { name: "Charlie", grade: 78 },
    {name: "david", grade:80},
    {name: "eva", grade:90},
    {name: "frank", grade: 75},
    {name: "grace", grade: 60},
    {name: "hannah", grade: 82},
    {name: "ivan", grade: 70},
    {name: "dianna", grade:67}
];
for (let i = 0; i < studentz.length; i++) {
    let student = studentz[i];
    if(studentz.grade >= 80){
        console.log(student.name + " has passed with grade: " + student.grade);
    }
    else {
        console.log(student.name + " has failed with grade: " + student.grade);
    }
}


/*----------------------------------------------------------------------------*/
/*
let objekat = {
    ime: "Marko",
    prezime: "Markovic",    
    godine: 28,
    zanimanje: "Programer"
};

let objekti = [
    {                                               
        ime: "Ana", 
        prezime: "Anic",
        godine: 25,
        zanimanje: "Dizajner"
    },                                          let x  = {};
                                                let y = [];     // Ovo su objekti, ali nisu isti tip objekta kao objekat iznad, jer imaju različite strukture i namjene.
    {
        ime: "Petar",
        prezime: "Petrovic",
        godine: 30,
        zanimanje: "Menadzer"
    },
    {
        ime: "Jelena",
        prezime: "Jelic",
        godine: 22,
        zanimanje: "Student"
    }
]; */

// zadatak br*1

var students = {
    name: "amar",
    Age: 22,
    rollno: 34
};
console.log(students.name);
console.log(students);

//zadatak br*2

var student = {
name : "David Rayy",
sclass : "VI",
rollno : 12 };

console.log(student);
delete student.rollno;
console.log(student);

//zadatak br*3

var studentL= {
    name : "David Rayy",
    sclass : "VI",
    rollno : 12 
    };

console.log(studentL.length);

//zadatak br*4

let library = [
    {
        title: 'The Road Ahead',    
        year: 1995,
        readingStatus: true,
    },
    {
        title: 'Walter Isaacson',    
        year: 2011, 
        readingStatus: true,
    },
    {
        title: 'Mockingjay: The Final Book of The Hunger Games',    
        year: 2010,
        readingStatus: false,
    }
]; 

for(let i=0; i<library.length; i++){
    var book = "'" + library[i].title + "'" + ' by ' + library[i].author + ".";
    
    if (library[i].readingStatus === true){    
      console.log("Already read " + book);
    }
    else {
     console.log("You still need to read " + book);
    }

};
