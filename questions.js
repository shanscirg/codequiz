// object containing quiz questions
let questions = [
  {
    title: "JavaScript is...",
    choices: ["the same as Java", "a fundamental programming language", "not useful in modern web development", "used to make static web pages"],
    answer: "a fundamental programming language"
  },
  {
    title: "Every variable is made up of a ______ and a _______.",
    choices: ["title, value", "key, property", "name, value", "name, number"],
    answer: "name, value"
  },
  {
    title: "The joining of two strings together is called ________.",
    choices: ["conclusion", "confirmation", "addition", "concatenation"],
    answer: "concatenation"
  },
  {
    title: "A useful function for debugging is ________().",
    choices: ["console.log", "confirm.log", "click.log", "console.com"],
    answer: "console.log"
  },
  {
    title: "What does DRY stand for?",
    choices: ["Don't Reveal Yourself", "Don't Repeat Yourself", "Do Repeat Yourself", "Don't wReck Yourself"],
    answer: "Don't Repeat Yourself"
  }
];

// hide all divs not currently being used
$("#quiz-container").hide();
$("#all-done").hide();
$(".correct").hide();
$(".incorrect").hide();
$("#highscores-container").hide();

// set question and scores to 0
let currentIndex = 0;
let correct = 0;
let incorrect = 0;

// cycles through questions on screen
function setNextQuestion() {
  $("#askQuestion").text(questions[currentIndex].title);
  $("#option1").text(questions[currentIndex].choices[0]);
  $("#option2").text(questions[currentIndex].choices[1]);
  $("#option3").text(questions[currentIndex].choices[2]);
  $("#option4").text(questions[currentIndex].choices[3]);
  console.log(questions[currentIndex]);
  console.log('currentIndex', currentIndex);
}

// when 'start' is clicked, show quiz container, cycle through questions, start timer
$("#start-button").on("click", function () {
  $("#startScreen").hide();
  $("#highscore").hide();
  $("#quiz-container").show();
  setNextQuestion();
  // timer
  let timeLeft = 75;
  let downloadTimer = setInterval(function () {
    $("#time").html("Time: " + timeLeft + " seconds remaining");
    timeLeft -= 1;
    if (timeLeft <= 0) {
      clearInterval(downloadTimer);
      $("#time").html("Finished");
      $("#quiz-container").hide();
      allDone();
    }
  }, 1000);
  // when any answer is clicked, do this...
  $(".nextQuestion").on("click", function () {
    // if correct answer is clicked, add to 'correct' variable and display "Correct!" to user
    if ($(this).text() === questions[currentIndex].answer) {
      correct += 10;
      $(".correct").show();
      setTimeout(function () {
        $('.correct').fadeOut('fast');
      }, 1000);
      // or, if incorrect answer is clicked, add to 'incorrect' variable, display "Incorrect!" to user, and deduct 10 seconds from timer
    } else {
      incorrect++;
      $(".incorrect").show();
      setTimeout(function () {
        $('.incorrect').fadeOut('fast');
      }, 1000);
      timeLeft = timeLeft - 10;
    }
    // if currentIndex is less than 4 (length of questions array), add one to currentIndex to get to next question & run new question
    if (currentIndex < 4) {
      currentIndex++;
      setNextQuestion();
      // otherwise, finish quiz and move to all-done page 
    } else {
      $("#quiz-container").hide();
      allDone();
      clearInterval(downloadTimer);
      $("#time").html("Finished with " + timeLeft + " seconds left!");
    }
  });
})

// jumps to all-done page
function allDone() {
  $("#all-done").show();
  $("#finalScore").html("Your final score is " + correct + "!");
  $("#highscore").show();
}


// STORE SCORES
let highScoreList = JSON.parse(localStorage.getItem('highScoreList')) || [];

// function that stores initials/scores to local storage and adds each one to the scoreboard
function generateHighscore() {
  localStorage.setItem('highScoreList', JSON.stringify(highScoreList));
  for (let i = 0; i < highScoreList.length; i++) {
    const currentUser = highScoreList[i];
    console.log(currentUser);
    $("#scoreList").prepend("<br><hr>" + currentUser.userInitials + " - " + currentUser.score);
  }
}

// when initials & score are submitted, store them into an object and push into highScoreList
$("#submitInitials").on("click", function () {
  let newUser = {
    userInitials: $("#enterInitials").val(),
    score: correct
  }
  highScoreList.push(newUser);
  generateHighscore();
  $("#all-done").hide();
  $("#highscore").show();
  $("#highscores-container").show();
})

// when 'highscore' link is clicked, show highscore page
$("#highscore").on("click", function () {
  $("#highscores-container").show();
  $("#startScreen").hide();
  generateHighscore();
})

// highscore link style
document.querySelector("#highscore").style.color = "blue";

// click clear and it clears localStorage & page
$("#clearScores").on("click", function () {
  localStorage.clear();
  $("#scoreList").empty();
  highScoreList = [];
})
