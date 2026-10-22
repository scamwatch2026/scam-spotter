

// Find the main sections and buttons in index.html.
const welcomeScreen = document.getElementById("welcome-screen");
const quizScreen = document.getElementById("quiz-screen");
const resultsScreen = document.getElementById("results-screen");

const startButton = document.getElementById("start-button");
const checkButton = document.getElementById("check-button");
const nextButton = document.getElementById("next-button");
const restartButton = document.getElementById("restart-button");

const progress = document.getElementById("progress");
const scenarioTitle = document.getElementById("scenario-title");
const scenarioDescription = document.getElementById("scenario-description");
const answerOptions = document.getElementById("answer-options");
const answerFieldset = document.getElementById("answer-fieldset");

const feedback = document.getElementById("feedback");
const feedbackTitle = document.getElementById("feedback-title");
const feedbackExplanation = document.getElementById("feedback-explanation");

const finalScore = document.getElementById("final-score");
const resultsMessage = document.getElementById("results-message");
const resultsTitle = document.getElementById("results-title");

// These variables remember the quiz's progress.
let currentIndex = 0; // Which scenario is being shown
let score = 0;        // Number of correct answers
let answered = false; // Has this scenario been checked?

/*
  START OR RESTART THE QUIZ

  Reset the score and return to the first scenario.
*/
function startQuiz() {
  currentIndex = 0;
  score = 0;
  answered = false;

  welcomeScreen.hidden = true;
  resultsScreen.hidden = true;
  quizScreen.hidden = false;

  showScenario();
}

/*
  DISPLAY ONE SCENARIO

  Read the scenario data from scenarios.js and put it
  onto the page. The same function works for every question.
*/
function showScenario() {
  const scenario = scenarios[currentIndex];

  // Update the question and progress information.
  progress.textContent =
    `Scenario ${currentIndex + 1} of ${scenarios.length}`;

  scenarioTitle.textContent = scenario.title;
  scenarioDescription.textContent = scenario.description;

  // Remove answer choices from the previous scenario.
  answerOptions.replaceChildren();

  // Create a radio button and label for every answer.
  scenario.answers.forEach((answer, index) => {
    const label = document.createElement("label");
    label.className = "answer-option";

    const radio = document.createElement("input");
    radio.type = "radio";
    radio.name = "answer";
    radio.value = index;

    // Enable Check Answer once the user selects an answer.
    radio.addEventListener("change", () => {
      checkButton.disabled = false;
    });

    const answerText = document.createElement("span");
    answerText.textContent = answer;

    label.append(radio, answerText);
    answerOptions.appendChild(label);
  });

  // Reset the feedback and buttons for the new scenario.
  answered = false;
  checkButton.disabled = true;
  checkButton.hidden = false;
  nextButton.hidden = true;

  feedback.hidden = true;
  feedback.classList.remove("correct", "incorrect");

  // Move keyboard focus to the new question.
  scenarioTitle.focus();
}

/*
  CHECK THE SELECTED ANSWER

  Compare the selected answer's number with correctAnswer.
  Add one point only when the answer is correct.
*/
function checkAnswer() {
  // Do not allow a second check of the same scenario.
  if (answered) {
    return;
  }

  const selectedAnswer = document.querySelector(
    'input[name="answer"]:checked'
  );

  // Give a reminder if no answer has been selected.
  if (!selectedAnswer) {
    return;
  }

  const scenario = scenarios[currentIndex];
  const answerIndex = Number(selectedAnswer.value);
  const isCorrect = answerIndex === scenario.correctAnswer;

  // Record the answer only once.
  answered = true;

  if (isCorrect) {
    score++;
    feedbackTitle.textContent = "Correct!";
    feedback.classList.add("correct");
  } else {
    feedbackTitle.textContent = "Not quite.";
    feedback.classList.add("incorrect");
  }

  // Explain the warning signs, regardless of the result.
  feedbackExplanation.textContent = scenario.explanation;
  feedback.hidden = false;

  // Stop the user changing the answer after checking it.
  answerFieldset.querySelectorAll("input").forEach((radio) => {
    radio.disabled = true;
  });

  checkButton.hidden = true;

  // Change the button text on the last scenario.
  if (currentIndex === scenarios.length - 1) {
    nextButton.textContent = "See My Results";
  } else {
    nextButton.textContent = "Next Scenario";
  }

  nextButton.hidden = false;

  // Move keyboard focus to the feedback so it is easy to find.
  feedbackTitle.setAttribute("tabindex", "-1");
  feedbackTitle.focus();
}

/*
  MOVE FORWARD

  Show the next scenario, or finish the quiz if there
  are no scenarios left.
*/
function nextScenario() {
  // Do not allow the user to skip checking an answer.
  if (!answered) {
    return;
  }

  currentIndex++;

  if (currentIndex < scenarios.length) {
    showScenario();
  } else {
    showResults();
  }
}

/*
  SHOW THE FINAL SCORE

  Calculate the result and display a friendly message.
*/
function showResults() {
  quizScreen.hidden = true;
  resultsScreen.hidden = false;

  finalScore.textContent =
    `Your score: ${score} out of ${scenarios.length}`;

  // Choose a message based on the final score.
  if (score === scenarios.length) {
    resultsMessage.textContent =
      "Excellent work! You spotted all the warning signs.";
  } else if (score >= Math.ceil(scenarios.length / 2)) {
    resultsMessage.textContent =
      "Good effort! Keep practising to build your scam-spotting skills.";
  } else {
    resultsMessage.textContent =
      "Keep learning! Reviewing the explanations will help you recognise warning signs.";
  }

  resultsTitle.focus();
}

// Connect each button to the function it should run.
startButton.addEventListener("click", startQuiz);
checkButton.addEventListener("click", checkAnswer);
nextButton.addEventListener("click", nextScenario);
restartButton.addEventListener("click", startQuiz);
