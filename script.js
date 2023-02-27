// defines the questions and answers
const questions = [
    {
      question: "Question 1: What JavaScript used for?",
      choices: [
        "To add styling to content",
        "To make websites interactive",
        "To manage data",
        "To add security to a website",
      ],
      correctAnswer: 1,
    },
    {
      question: "Question 2: What HTML element is used to link to a JavaScript file?",
      choices: ["<script>", "<javascript>", "<js>", "<java>"],
      correctAnswer: 0,
    },
    {
      question: "Question 3: What do you use to store multiple pieces of data in a single variable?",
      choices: ["groups", "data sets", "arrays", "containers"],
      correctAnswer: 2,
    },
    {
      question: "Question 4: What is the proper syntax to create a function called myFunction?",
      choices: [
        "function: myFunction()",
        "function = myFunction()",
        "function myFunction()",
        "function(myFunction)",
      ],
      correctAnswer: 2,
    },
    {
      question: "Question 5: What event occurs when a user clicks on an HTML element?",
      choices: ["onclick", "onmouseover", "onkeydown", "onload"],
      correctAnswer: 0,
    },
  ];
  
  // sets the variables 
  let currentQuestion = 0;
  let score = 0;
  let timer = 60;
  let timerInterval;
  let scores = [];
  
  // function to start the timer
  function startTimer() {
    clearInterval(timerInterval);
    timerInterval = setInterval(function () {
      timer--;
      document.getElementById("timer").textContent = timer;
      if (timer <= 0) {
        clearInterval(timerInterval);
        endQuiz();
      }
    }, 1000);
  }
  
  // function to display current question and answer choices
  function displayQuestion() {
    document.getElementById("question").textContent = questions[currentQuestion].question;
  
    const choices = document.getElementById("choices");
    choices.innerHTML = "";
  
    for (let i = 0; i < questions[currentQuestion].choices.length; i++) {
      const button = document.createElement("button");
      button.textContent = questions[currentQuestion].choices[i];
      button.setAttribute("data-index", i);
      button.addEventListener("click", function () {
        checkAnswer(i);
      });
      choices.appendChild(button);
    }
  }

  // function to start the quiz, hide the start button and display the quiz elements
  function startQuiz() {
    document.getElementById("start").style.display = "none";
    document.getElementById("title").style.display = "none";
    document.getElementById("description").style.display = "none";
    document.getElementById("wrapper").innerHTML = `
      <div id="quiz">
        <div id="timer">${timer}</div>
        <div id="question"></div>
        <div id="choices"></div>
        <div id="message"></div>
        <div id="scorebox"></div>
      </div>`;
    scores = JSON.parse(localStorage.getItem("scores")) || [];
    startTimer();
    displayQuestion();
  }
  
  // event listeners for start button and view high scores button
  document.addEventListener("DOMContentLoaded", function () {
    const startButton = document.getElementById("start");
    const viewScoresButton = document.getElementById("view-high-scores");
    viewScoresButton.addEventListener("click", function () {
      const scores = JSON.parse(localStorage.getItem("scores")) || [];
      showHighScores(scores, "");
    });
    startButton.addEventListener("click", function () {
      startQuiz();
    });  
  });
  
  // function to check if the answer is correct and display result below
  function checkAnswer(index) {
    if (index === questions[currentQuestion].correctAnswer) {
      document.getElementById("message").textContent = "Correct!";
      score++;
    } else {
      document.getElementById("message").textContent = "Incorrect!";
      timer -= 10;
    }
    currentQuestion++;
    if (currentQuestion < questions.length) {
      displayQuestion();
    } else {
      endQuiz();
    }
  }
  
  // function to end quiz, display the score
  function endQuiz() {
    clearInterval(timerInterval);
    document.getElementById("timer").textContent = "Time's up!";
    document.getElementById("question").textContent = `You got ${score} out of ${questions.length} correct!`;
    document.getElementById("choices").innerHTML = "";
    document.getElementById("message").innerHTML = "";

// code to display input box for initials/score 
const initialsForm = document.createElement("form");
const label = document.createElement("label");
label.textContent = "Enter your initials: ";
const input = document.createElement("input");
input.setAttribute("type", "text");
const submitButton = document.createElement("button");
submitButton.setAttribute("type", "submit");
submitButton.textContent = "Save";
initialsForm.appendChild(label);
initialsForm.appendChild(input);
initialsForm.appendChild(submitButton);
document.getElementById("scorebox").appendChild(initialsForm);

// save score to local storage when form is submitted
initialsForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const initials = input.value;
    scores.push({ initials, score });
    localStorage.setItem("scores", JSON.stringify(scores));
    showHighScores(scores, initials);
    initialsForm.remove();
  });

// function to display the list of high scores
function showHighScores(scores, initials) {
    scores.sort((a, b) => b.score - a.score);
    let highScoresHtml = `<h1>High Scores</h1>`;
    if (scores.length > 0) {
      highScoresHtml += `
        <ul>
          ${scores.map(scoreObj => `<li>${scoreObj.initials}: ${scoreObj.score}</li>`).join('')}
        </ul>
        <button id="play-again">Play Again</button>
        <button id="clear-scores">Clear Scores</button>
      `;
    } else {
      highScoresHtml += `
        <p>No high scores</p>
        <button id="play-again">Play Again</button>
      `;
    }
    document.getElementById('wrapper').innerHTML = highScoresHtml;
    // adding event listeners for the play again and clear scores buttons
    document.getElementById('play-again').addEventListener('click', function () {
      location.reload();
    });
    document.getElementById('clear-scores').addEventListener('click', function () {
      localStorage.removeItem('scores');
      showHighScores([], '');
    });
  }
}