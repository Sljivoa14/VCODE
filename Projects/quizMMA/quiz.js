
const scores = {
  mcgregor: 0,
  khabib: 0,
  silva: 0,
  jones: 0,
  gsp: 0,
  fedor: 0,
  crocop: 0,
  rampage: 0,
  mightymouse: 0
};


const question = document.querySelector(".question");
const buttons = document.querySelectorAll(".answer-btn");
const result = document.getElementById("resultFinal");
const finalImg= document.getElementById("finalImage");
const restart = document.getElementById("restart");
/*const question = document.querySelector(".question"); - const question=document.querySelctorAll(".question");*/


buttons.forEach(button => {button.addEventListener("click", () => {
    const fighter = button.dataset.fighter;
    if (fighter) {
      scores[fighter]++;
    }
  
/*

buttons.forEach(button => {
  button.addEventListener("click", () => {
    const fighter = button.dataset.fighter;
    if (!fighter) return;*/

    const answerBox = button.parentElement;
    const selectedBtn = answerBox.querySelector(".selected");

    // clicking same button → deselect
    if (button === selectedBtn) {
      button.classList.remove("selected");
      scores[fighter]--;
      return;
    }

    // remove previous selection
    if (selectedBtn) {
      const oldFighter = selectedBtn.dataset.fighter;
      selectedBtn.classList.remove("selected");
      scores[oldFighter]--;
    }

    // select new one
    button.classList.add("selected");
    scores[fighter]++;
  });
});

function restartQuiz() {
    scores[fighter] = 0;
    result.textContent = "";
    finalImg.src = "";

};

  // Deselect all buttons
  restart.addEventListener("click", () => {
    buttons.forEach(button => {
      button.classList.remove("selected");
      finalImg.src = "";
      result.textContent = "";
      scores[fighter] = 0;
    })
  });   




function finishQuiz() {
  if (!allAnswered()) return;
  let topFighter = "";
  let topScore = 0;

  for (let fighter in scores) {
    if (scores[fighter] > topScore) {
      topScore = scores[fighter];
      topFighter = fighter;
    }
  }

  showResult(topFighter);
}

const allAnswerBoxes = document.querySelectorAll(".answer");

function allAnswered() {
  for (let box of allAnswerBoxes) {
    const selected = box.querySelector(".selected");

    if (!selected) {
      return false; // missing answer
    }
  }
  return true; // all answered
}

/*document.getElementById("finishQ").addEventListener("click",finishQuiz);
("click", () => {
   if(allAnswered=false){
    alert("Please complete all questions before finishing.");
    return;
    }
})*/

document.getElementById("finishQ").addEventListener("click", () => {
  if (!allAnswered()) {
    alert("Please complete all questions before finishing.");

    return;
  }

  finishQuiz();
});

function showResult(fighter) {
  let name = "";
  let img = "";

  if (fighter === "mcgregor") {
    name = "Conor McGregor";
    img = "mcgregor.webp";
  } 
  else if (fighter === "khabib") {
    name = "Khabib Nurmagomedov";
    img = "khabib.jpg";
  } 
  else if (fighter === "silva") {
    name = "Anderson Silva";
    img = "silva.webp";

  } 
  else if (fighter === "jones") {
    name = "Jon Jones";
    img = "jones.webp";
  }
    else if (fighter ==="gsp") {
    name = "Georges St-Pierre";
    img = "gsp.webp";
  }
    else if (fighter === "fedor") {
    name = "Fedor Emelianenko";
    img = "fedor.jpg";
  }

    else if (fighter === "crocop") {
    name = "Mirko Cro Cop";
    img = "croCop.jpg";
  }
    else if (fighter === "rampage") {
    name = "Rampage Jackson";
    img = "rampage.webp";
  } 
    else {
    name = "Demetrious Johnson";
    img = "download.jpg";
  }

  result.textContent= name;
  finalImg.src= img;
}
/*
const allAnswerBoxes = document.querySelectorAll(".answer");

function allAnswered() {
  for (let box of allAnswerBoxes) {
    const selected = box.querySelector(".selected");
    if (!selected) {
      return false; // missing answer
    }
  }
  return true; // all answered
}



document.getElementById("finishQ").addEventListener("click", () => {
  if (!allAnswered()) {
    alert("Please complete all questions before finishing.");
    
    return;
  }

   showResult=false;

  showResult();
});
*/

