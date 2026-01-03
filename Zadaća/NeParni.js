const provjeriBtn = document.getElementById("provjeri");    
const input = document.getElementById("input");
const rezultat = document.getElementById("rezultat");

provjeriBtn.addEventListener("click", function() {
    if (input.value==""){
        rezultat.innerText = "Molim vas unesite broj!";
        }
        else if (input.value % 2===0){
            rezultat.innerText = "ovaj Broj je paran!";
        }
        else {
            rezultat.innerText = "ovaj Broj je NEparan!";
        }
    });
 



/*document.getElementById("provjeri").onclick = function() {
        let broj = parseInt(document.getElementById("input").value);
        if (broj % 2 !== 0) {
            alert("Broj je neparan");
        } else {
            alert("Broj je paran");
        }
    } */