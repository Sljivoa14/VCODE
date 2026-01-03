const inputField = document.getElementById("input");
const duplicateBtn = document.getElementById("dupliraj");
const resultDiv = document.getElementById("rezultat");

duplicateBtn.addEventListener("click", function() {
    const inputValue = inputField.value;
    resultDiv.textContent = inputValue + inputValue;
});

/*const all = document.querySelectorAll(".container");

all.addEventListener("click", function() {
 //   all.textContent = all.textContent + all.textContent;   
    
});
*/