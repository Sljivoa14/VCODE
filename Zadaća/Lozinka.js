/*const password = document.getElementById("password");	
const checkBtn = document.getElementById("check");
const Result = document.getElementById("rezultat");

function checkPassword() {

    const len= password.length;
    if (length < 6) {
        Result.textContent = "Slaba lozinka";
    } else if (length < 10) {
        Result.textContent = "Srednja lozinka";
    } else {
        Result.textContent = "Jaka lozinka";
    }
}*/

function checkPassword() {
    let len = document.getElementById("password").value.length;

    if (len < 6) {
        document.getElementById("strength").textContent = "Slaba lozinka";
    } else if (len < 10) {
        document.getElementById("strength").textContent = "Srednja lozinka";
    } else {
        document.getElementById("strength").textContent = "Jaka lozinka";
    }
}