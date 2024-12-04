const questions=[
    {
        question: "What does HTML stand for?",
        answers: [
            {text:"Hyper Text Markup Language", correct: true},
            {text:"Hyper Text Meta Language", correct: false},
            {text:"Hyper Text Media Language", correct: false},
            {text:"Hyper Text Modeling Language", correct: false},
        ]
    },
    {
        question: "Which css property is used to set the background color of an element?",
        answers: [
            {text:"color", correct: false},
            {text:"background-color", correct: true},
            {text:"font-size", correct: false},
            {text:"text-align", correct: false},
        ]
    },
    {
        question: "What is the main purpose of SQL?",
        answers: [
            {text:"To manage operating systems", correct: false},
            {text:"To manage databases", correct: true},
            {text:"To manage networks", correct: false},
            {text:"To manage applications", correct: false},
        ]
    },
    {
        question: "What does CSS stand for?",
        answers: [
            {text:"Cascading Style Systems", correct: false},
            {text:"Computer Style Systems", correct: false},
            {text:"Cascading Style Sheets", correct: true},
            {text:"Creative Style Solutions", correct: false},
        ]
    },
];

const questionElement=document.getElementById("question");
const answerButtons=document.getElementById("answer-buttons");
const nextButton=document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}
function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + " . " + currentQuestion.
    question;

    currentQuestion.answers.forEach(answer =>{
        const button= document.createElement("button");
        button.innerHTML= answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}
function resetState(){
    nextButton.style.display="none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild);
    }
}
function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct ==="true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }
    else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button=>{
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled=true;
    });
    nextButton.style.display="block";
}
function showScore(){
    resetState();
    questionElement.innerHTML = `You Scored ${score} out of ${questions.
    length}!`;
    nextButton.innerHTML="Play Again";
    nextButton.style.display="block";
}
function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }
    else{
        showScore();
    }
}
nextButton.addEventListener("click", ()=>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }
    else{
        startQuiz();
    }
});
startQuiz();

