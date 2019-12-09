function generateQuiz() {
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

  let currentIndex = 0

  $("#start-button").on("click", function () {
    console.log("The button works!");
    $("#startScreen").hide();
    $("#quiz-container").show();
    incrementQuestion();
  }
  )

  function incrementQuestion() {
    $("#askQuestion").text(questions[currentIndex].title);
    $("#option1").text(questions[currentIndex].choices[0]);
    $("#option2").text(questions[currentIndex].choices[1]);
    $("#option3").text(questions[currentIndex].choices[2]);
    $("#option4").text(questions[currentIndex].choices[3]);
    console.log(questions[i]);
  }


  let correct = 0
  let incorrect = 0

  $(".nextQuestion").on("click", function () {
    if(currentIndex <= questions.length){
      currentIndex++;
    }
    incrementQuestion();
    if ($(this).text() === questions[currentIndex].answer) {
      correct++;
    } else {
      incorrect++;
    }
  });


  // sets timer
  let timeLeft = 75;
  let timer = $("#time");
  let timerId = setInterval(countdown, 1000);

  function countdown() {
    if (timeLeft == 0) {
      clearTimeout(timerId);
      // doSomething();
    } else {
      timer.textContent = timeLeft + ' seconds remaining';
      timeLeft--;
    }
  }


}

generateQuiz();

