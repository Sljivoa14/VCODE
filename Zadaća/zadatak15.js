const btn = document.getElementById("button");
const header = document.getElementById("head");

const rijeci = ["Početak", "Mača", "Cuko", "Sarajevo", "Škola"];
let index = 0;



btn.addEventListener("click", function () {
    index++;
  
    if (index === rijeci.length) {
      index = 0;
    }  
    header.textContent = rijeci[index];
});

