
const question = document.getElementById("question");
const button = document.getElementById("next-btn");
const yesBtn = document.getElementById("Yes");
const noBtn = document.getElementById("No");
const result = document.getElementById("result");
const restartBtn = document.getElementById("restart");


const questions = [
  { text: "Is the sky blue?", answer: true },
  { text: "Is fire cold?", answer: false},
  { text: "Is water wet?", answer: true },
  { text: "Is the earth flat?", answer: false },
  { text: "Is snow white?", answer: true },
  { text: "Is the sun a star?", answer: true },
  { text: "Is grass red?", answer: false },
  { text: "Is chocolate sweet?", answer: true },
  { text: "Did Bayern Munchen win the 2020 CL?", answer: true },
  { text: "Is Arteta Arsenal’s manager in 2026?", answer: true },
  { text: "Is 6 + 36 - 4 + 49 = 87?", answer: true },
  { text: "6 x 5 + 5 - 5/ = 10", answer: false },
  { text: "are The first numbers of Pi 3,141 ?", answer: true },
  { text: "was America discovered in 1987?", answer: false },
  { text: "Yes?", answer: true },
  { text: "is it possible to count to infinity with limited time?", answer: false },
  { text: "Did TuPac die in 1996?", answer: true },
  { text: "Was Obama The 44th president of USA?", answer: true },
  { text: "Did Pablo Escobar have a lot of children?", answer: false },
  { text: "Click yes?", answer: true },
  { text: "The next Question is a lie(Click yes)?", answer: true },
  { text: "Click no", answer: true },
  { text: "Same answer asnswer as the last question?", answer: true },
  { text: "dont click yes?", answer: false },
  { text: "The next Question is a lie(Click yes)?", answer: true },
  { text: "The next Question is a lie(Click yes)?", answer: true },
  

];

let currentQuestionIndex = 0;
let answered = false;

showQuestion();

function showQuestion(){
    answered = false;
    result .textContent ="";
    button.style.display = "none";

    question.textContent = questions[currentQuestionIndex].text;
}



function checkAnswer(userAnswer){
    if(answered) return;
    answered = true;    

    const correctAnswer = questions[currentQuestionIndex].answer;

    if(userAnswer !== correctAnswer){
        result.textContent = "wrong X Restart!";
        setTimeout(restartQuiz, 2000);
        return;
    } 

    button.style.display = "inline-block";
    }

    yesBtn.addEventListener("click",()=>checkAnswer(true));
    noBtn.addEventListener("click",()=>checkAnswer(false));
    restartBtn .addEventListener("click",restartQuiz);


    button.addEventListener("click",()=>{
        currentQuestionIndex++;
        if(currentQuestionIndex < questions.length){
            showQuestion();
        }   else{
                finishQuiz();     
        }
    });

    function restartQuiz(){
        currentQuestionIndex = 0;
        showQuestion();
    }

    function finishQuiz(){
        question.textContent = "Quiz Finished! Well done!";
        result.textContent = "You answered all questions correctly!";
        nextBtn.style.display = "none";
    }



