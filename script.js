// hämtar refrernser till html element med hjälp av klass namnen och lagrar dessa i sina variabler.
const startBtn = document.querySelector(".start-btn");
const popupInfo = document.querySelector(".popup");
const exitBtn = document.querySelector(".exit-btn");
const main = document.querySelector(".main");
const continueBtn = document.querySelector(".continue-btn");
const quizSection = document.querySelector(".quiz-section");
const quizBox = document.querySelector(".quiz-box");
const resultBox = document.querySelector(".result-box");
const tryAgainBtn = document.querySelector(".tryAgain-btn");
const goHomeBtn = document.querySelector(".goHome-btn");

// funktion som lägger till händelelyssnare på startBtn som aktiveras när knappen trycks, har även med console som visar att quizet är startat.
startBtn.onclick = () => {
  console.log("Quiz startad!");
  popupInfo.classList.add("active");
  main.classList.add("active");
};

// Funktion för att stänga popup rutan och återgå till startsidan och tar bort klassen active från popup informationen.
exitBtn.onclick = () => {
  console.log("Popup stängd, återgå till startsidan.");
  popupInfo.classList.remove("active");
  main.classList.remove("active");
};

// händelselyssnar för fortsätt knappen som loggar ett meddelande och visar quiz sektionen och quizbox samt döljer popup och huvudsektion.
continueBtn.onclick = () => {
  console.log("Fortsätt till quizsektionen.");
  quizSection.classList.add("active");
  popupInfo.classList.remove("active");
  main.classList.remove("active");
  quizBox.classList.add("active");

  // Visar den första frågan när sidan laddas
  showQuestions(0);
  // Uppdaterar frågenummer som visar frågan
  questionCounter(1);
  // Uppdaterar poängen i huvudet på quizboxen
  headerScore();
};

// visar quizboxen, döljer nästa knappen och resultat box för att möjliggöra omstart av quizet och console för meddelande.
tryAgainBtn.onclick = () => {
  console.log("Quizet startas om.");
  quizBox.classList.add("active");
  nextBtn.classList.remove("active");
  resultBox.classList.remove("active");

  // återställerr räknare och poängen
  questionCount = 0;
  questionNumb = 1;
  userScore = 0;

  // Visar första frågan igen
  showQuestions(questionCount);
  // Uppdaterar frågenummer
  questionCounter(questionNumb);

  // Uppdaterar poäng i header
  headerScore();
};

// Funktion för att gå till startsidan efter att ha klickat på "Gå hem"-knappen samt döljer quozensektionen
goHomeBtn.onclick = () => {
  console.log("Gå till startsidan.");
  quizSection.classList.remove("active");
  nextBtn.classList.remove("active");
  resultBox.classList.remove("active");

  // Återställ räknare och poäng
  questionCount = 0;
  questionNumb = 1;
  userScore = 0;

  // Visa första frågan igen
  showQuestions(questionCount);
  // Uppdatera frågenummer
  questionCounter(questionNumb);
};

// Variabler för att hålla reda på fråge- och poänginformation
let questionCount = 0;
let questionNumb = 1;
let userScore = 0;

// Nästa knappen
const nextBtn = document.querySelector(".next-btn");

// händeleluyssnare på nästa knappen
nextBtn.onclick = () => {
  // Kontrollerar om det finns fler frågor
  if (questionCount < questions.length - 1) {
    // Ökar räknaren för frågor och visa nästa fråga
    questionCount++;
    showQuestions(questionCount);

    // Ökar frågenumret och uppdatera frågeindikatorn
    questionNumb++;
    questionCounter(questionNumb);
  } else {
    // Visa resultatet när alla frågor är besvarade
    showResultBox();
  }

  // Aktivera nästa knapp efter varje klick
  nextBtn.classList.remove("active");
};

// Lista med svarsalternativ
const optionList = document.querySelector(".option-list");

// Funktion för att visa frågorna
function showQuestions(index) {
  // Hämta element för frågetext, bild och svarsalternativ
  const questionText = document.querySelector(".question-text");
  const questionImage = document.querySelector(".question-image");

  // Uppdatera frågetext
  questionText.textContent = `${questions[index].numb}. ${questions[index].question}`;

  // Visa frågebild om det finns en
  if (questions[index].image) {
    questionImage.innerHTML = `<img src="${questions[index].image}" alt="Question Image">`;
  } else {
    // Rensa frågebilden om ingen bild finns
    questionImage.innerHTML = "";
  }

  // Skapa html för svarsalternativ och ger dynamisk generering som sen ska integrerars med olika svarsalternativen
  let optionTag = `<div class="option"><span>${questions[index].options[0]}</span></div>
  <div class="option"><span>${questions[index].options[1]}</span></div>
  <div class="option"><span>${questions[index].options[2]}</span></div>
  <div class="option"><span>${questions[index].options[3]}</span></div>`;

  // Uppdaterar html för svarsalternativ
  optionList.innerHTML = optionTag;

  // klick händelse för varje svarsalternativ
  const option = document.querySelectorAll(".option");
  for (let i = 0; i < option.length; i++) {
    option[i].setAttribute("onclick", "optionSelected(this)");
  }
}

// Funktion för att hantera valt svar
function optionSelected(answer) {
  // Hämta användarens svar och det korrekta svaret
  let userAnswer = answer.textContent;
  let correctAnswer = questions[questionCount].answer;
  let allOptions = optionList.children.length;

  // Kontrollera om svaret är korrekt eller inte
  if (userAnswer == correctAnswer) {
    // Om korrekt, markera som rätt och öka poängen
    answer.classList.add("correct");
    userScore += 1;
    // Uppdatera poäng i header
    headerScore();
  } else {
    // Om fel, markera som fel och visa det korrekta svaret
    answer.classList.add("incorrect");

    // visar det korrekta svaret och markera det
    for (let i = 0; i < allOptions; i++) {
      if (optionList.children[i].textContent == correctAnswer) {
        optionList.children[i].setAttribute("class", "option correct");
      }
    }

    // Inaktiverar andra alternativ efter att ha svarat
    for (let i = 0; i < allOptions; i++) {
      optionList.children[i].classList.add("disabled");
    }
  }

  // Aktiverar nästa knapp efter varje klick oavsett om svaret är rätt eller fel
  nextBtn.classList.add("active");
}

// Funktion för att uppdatera frågeindikatorn
function questionCounter(index) {
  const questionTotal = document.querySelector(".question-total");
  questionTotal.textContent = `${index} av ${questions.length} Frågor`;
}

// Funktion för att uppdatera poäng i header
function headerScore() {
  const headerScoreText = document.querySelector(".header-score");
  headerScoreText.textContent = `Poäng: ${userScore} / ${questions.length}`;
}

// Funktion för att visa resultatboxen när quizet är klart
function showResultBox() {
  // Dölj quizbox och visa resultatbox
  quizBox.classList.remove("active");
  resultBox.classList.add("active");

  // Uppdatera resultattext
  const scoreText = document.querySelector(".score-text");
  scoreText.textContent = `Ditt resultat ${userScore} av ${questions.length}`;

  // Skapar liv i den en cirkulära progresscirkeln, % baserad på poäng
  const circularProgress = document.querySelector(".circular-progress");
  const progressValue = document.querySelector(".progress-value");
  let progressStartValue = -1;
  let progressEndValue = ((userScore * 2) / questions.length) * 50;
  let speed = 20;

  // skapar rörligheten i den cirkulära progresscirkeln efter att du svarat på allt i %.
  let progress = setInterval(() => {
    progressStartValue++;
    progressValue.textContent = `${progressStartValue}%`;
    circularProgress.style.background = `conic-gradient(#c40094 ${
      progressStartValue * 3.6
    }deg, rgba(255, 255, 255, 0.1) 0deg)`;
    if (progressStartValue == progressEndValue) {
      clearInterval(progress);
    }
  }, speed);
}
