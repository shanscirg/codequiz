/* global $ */
$(document).ready(function () {
  console.log("Good to go!");
});

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

$("#quiz-container").hide();
$("#all-done").hide();
$(".correct").hide();
$(".incorrect").hide();
$("#highscores-container").hide();


let currentIndex = 0;
let correct = 0;
let incorrect = 0;

$("#start-button").on("click", function () {
  console.log("The button works!");
  $("#startScreen").hide();
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
    // if click on correct answer, add to correct variable and display "Correct!" to user
    if ($(this).text() === questions[currentIndex].answer) {
      correct += 10;
      console.log('number correct', correct);
      $(".correct").show();
      setTimeout(function () {
        $('.correct').fadeOut('fast');
      }, 1000);
      // or, if click on incorrect answer, add to incorrect variable and display "Incorrect!" to user
    } else {
      incorrect++;
      console.log('number incorrect', incorrect);
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
    } else {
      $("#quiz-container").hide();
      allDone();
      clearInterval(downloadTimer);
      $("#time").html("Finished with " + timeLeft + " seconds left!");
    }
  });
})

function setNextQuestion() {
  $("#askQuestion").text(questions[currentIndex].title);
  $("#option1").text(questions[currentIndex].choices[0]);
  $("#option2").text(questions[currentIndex].choices[1]);
  $("#option3").text(questions[currentIndex].choices[2]);
  $("#option4").text(questions[currentIndex].choices[3]);
  console.log(questions[currentIndex]);
  console.log('currentIndex', currentIndex);
}

function allDone() {
  $("#all-done").show();
  $("#finalScore").html("Your final score is " + correct + "!");
}

let highScoreList = JSON.parse(localStorage.getItem('highScoreList')) || [];

function generateHighscore (){
  localStorage.setItem('highScoreList', JSON.stringify(highScoreList));
  for (let i = 0; i < highScoreList.length; i++) {
    const currentUser = highScoreList[i];
    console.log(currentUser);
    $("#scoreList").prepend("<br><hr>" + currentUser.userInitials + " - " + currentUser.score);
  }
}


$("#submitInitials").on("click", function () {
  let newUser = {
    userInitials: $("#enterInitials").val(),
    score: correct
  }
  highScoreList.push(newUser);
  generateHighscore();
  $("#all-done").hide();
  $("#highscores-container").show();
})

$("#highscore").on("click", function() {
  $("#highscores-container").show();
  $("#startScreen").hide();
  generateHighscore();
})


// style highscores link 
// hide highscores link when quiz is going

// click clear and it clears localStorage
$("#clearScores").on("click", function () {
  localStorage.clear();
  $("#scoreList").empty();
  highScoreList = [];
})
