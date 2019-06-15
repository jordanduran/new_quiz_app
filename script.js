// Quiz Questions

const myQuestions = [
  {
    question:
      "How many muscles do you have in total in all your fingers combined?",
    answers: ["None", "Ten", "Twenty-two", "Twenty"],
    correct: 0
  },
  {
    question: "Which of the following characters are rabbits?",
    answers: [
      "Easter Bunny",
      "Bugs Bunny",
      "Brer Rabbit",
      "None, they are hares"
    ],
    correct: 3
  },
  {
    question: "How many toes does a two toed sloth have?",
    answers: ["Two", "Ten", "Six or Eight", "None"],
    correct: 2
  },
  {
    question: "How many man made artifacts on Earth can be seen from space?",
    answers: ["Six on a clear day", "Thousands", "None", "Only the Great Wall"],
    correct: 1
  },
  {
    question: "What was Billy the Kid's real first name?",
    answers: ["William", "Bill", "Kidd", "Henry"],
    correct: 3
  },
  {
    question: "What kind of animal is the longest in the world?",
    answers: ["Jellyfish", "Bill", "Worm", "Whale"],
    correct: 2
  },
  {
    question: "Why is a marathon race distance 26 miles and 385 yards?",
    answers: [
      "No one knows",
      "Completely by accident",
      "For the convenience of the British royal family",
      "It is the distance from Marathon, Greece, to Athens"
    ],
    correct: 2
  },
  {
    question: "Which eye did Lord Nelson wear his eye-patch on?",
    answers: [
      "It depended on his mood",
      "He never wore an eye-patch",
      "His left",
      "His right"
    ],
    correct: 1
  },
  {
    question: "Which of these species are the most murderous mammals?",
    answers: ["Chimpanzees", "Meerkats", "Dogs", "Elk"],
    correct: 1
  },
  {
    question: "How many actors played Harry Potter in the Harry Potter movies?",
    answers: ["Two", "One", "Eight", "Five"],
    correct: 3
  }
];

// Starting point for user is 0

let score = 0;
let current = 0;

// Function for starting quiz

function startQuiz() {
  $(".start-button").click(function() {
    $(".start-quiz").hide();
    $(".next-button").hide();
    $(".questions").show();
    $("p.score").show();
    displayQuestion();
    $(".score").text("Current Score: " + score);
    console.log("Start Quiz button clicked");
  });
}

// Function for Next button

function handleNextButton() {
  $(".next-button").click(function(event) {
    console.log("Next button clicked");
    displayQuestion();
    $(".next-button").hide();
    $("#feedback").empty();
    $(".restart-button").show();
  });
}

// Function for Submit button

function handleSubmitButton() {
  $("div.form-container").on("submit", ".submit-button", function(event) {
    event.preventDefault();
    console.log("Form submitted");
    let userAnswer = $("input[name=answer]:checked", ".submit-button").val();
    console.log(userAnswer);
    checkAnswer(userAnswer);
    $(".submit-button").hide();
    $(".next-button").show();
  });
}

// Function for Restart button

function handleRestartButton() {
  $(".restart-button").click(function() {
    location.reload();
    console.log("Restart button clicked");
  });
}

// Function for displaying the question

function displayQuestion() {
  $(".question-number").text("Question Number: " + (current + 1) + "/10");
  if (current < myQuestions.length) {
    let listQuestion = myQuestions[current];
    $("div.form-container").html("");
    $("div.form-container").append('<form class="submit-button">');
    $(".submit-button").append('<fieldset>')
    $("fieldset").append(`<legend>${listQuestion.question}</fieldset>`)
    for (let i = 0; i < listQuestion.answers.length; i++) {
      $("fieldset").append(
        `<div>
            <input class="answer-button" id="answer-${i}" type="radio" name="answer" value="${i}" checked>
            <label for="answer-${i}" id = "${i}"> 
            ${listQuestion.answers[i]}
            </label> 
        </div>`
      );
    }
    $(".submit-button").append('<input type="submit" value="Check Answer"/>');

    $("div.form-container").append("</form>");
  } else {
    
    // show summary of how many answers are correct

    displayScore();
  }
}

// Checks answer from the array to see if the one chosen is the one that is correct

function checkAnswer(answer) {
    console.log("Check answer button clicked");
  let listQuestion = myQuestions[current];
  if (listQuestion.correct == answer) {
    score++;
    $("#feedback").html("<p>You got it right!</p>");
  } else {
    $("#feedback").html(
      `<p>Sorry, wrong answer!</p><p>Correct answer: ${
        listQuestion.answers[listQuestion.correct]
      }</p>`
    );
  }
  $(".score").text("Current Score: " + score);
  current++;
}

//Display score
function displayScore() {
  $(".questions").hide();
  $(".end-quiz").show();
  $(".end-score").text("Your score is: " + score + "/10");
  if (score >= 0) {
    $(".comment").text("Thanks for playing!");
  }
}

// Main function that handles the entire quiz app

function handleQuizApp() {
$(".restart-button").hide();
$(".next-button").hide();
$("p.score").hide();
  startQuiz();
  handleNextButton();
  handleSubmitButton();
  handleRestartButton();
}

// Callback our main function once DOM is ready.

$(handleQuizApp);