const questions = [
    {
        question: "Which is largest animal in the world?",
        answer: [
            {text: "Shark" , correct: false},
            {text: "Blue Whale" , correct: true},
            {text: "Elephant" , correct: false},
            {text: "Giraffe" , correct: false},
        ]
    },
    {
        question: "Which is smallest country in the world?",
        answer: [
            {text: "Vatican City" , correct: true},
            {text: "Bhutan" , correct: false},
            {text: "Nepal" , correct: false},
            {text: "Shri Lanka" , correct: false},
        ]
    },
    {
        question: "Which is largest desert in the world?",
        answer: [
            {text: "Kalahari" , correct: false},
            {text: "Gobi" , correct: false},
            {text: "Sahara" , correct: false},
            {text: "Antarctica" , correct: true},
        ]
    },
    {
        question: "Which is the smallest continent in the world?",
        answer: [
            {text: "Asia" , correct: false},
            {text: "Australia" , correct: true},
            {text: "Arctic" , correct: false},
            {text: "Africa" , correct: false},
        ]
    }
];

const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState(); //it will reset previouc Qs and ans

    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + "." + currentQuestion.question;

    currentQuestion.answer.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}

function resetState(){ //it will deefine the function
    nextButton.style.display = "none";
    while(answerButtons.firstChild){
        answerButtons.removeChild(answerButtons.firstChild); //it will remove all previous answer
    }
}

function selectAnswer(e){ //when we will click on btn
    const selectedBtn = e.target; //it wil add the selected element btn in this variable selectedBtn
    const isCorrect = selectedBtn.dataset.correct === "true"; //then it will check the selectedBtn dataset "true"
    if(isCorrect){ //then if the dataset is true
        selectedBtn.classList.add("correct"); //then it will add the classname "correct"
        score++;
    }
    else{ //and if it is not true
        selectedBtn.classList.add("incorrect"); //then it will add the classname "incorrect"
    }

    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `You scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "Play Again";
    nextButton.style.display = "block";
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

nextButton.addEventListener("click", () => {
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }
    else{
        startQuiz();
    }
});

startQuiz();