// Defining questions
var question1 = new question({
    charName: "1. What does TCP stand for?",
    answerOptions: ["Transmission Control Protocol", "Transmission Communication Protocol", "Transfer Control Protocol", "Transfer Communication Protocol"],
    answer: 0,
    pageNumber: "page-1"
});

var question2 = new question({
    charName: "2. What is the purpose of a firewall?",
    answerOptions: ["To increase network speed", "To block unauthorized access", "To manage network traffic", "To monitor email communications"],
    answer: 1,
    pageNumber: "page-2"
});

var question3 = new question({
    charName: "3. What does DNS stand for?",
    answerOptions: ["Dynamic Name System", "Domain Name System", "Distributed Network Service", "Domain Network System"],
    answer: 1,
    pageNumber: "page-3"
});

var question4 = new question({
    charName: "4. What is the function of a router?",
    answerOptions: ["To connect devices to the internet", "To manage email services", "To store files and data", "To provide antivirus protection"],
    answer: 0,
    pageNumber: "page-4"
});

var question5 = new question({
    charName: "5. Which protocol is used to securely access a remote server?",
    answerOptions: ["HTTP", "FTP", "SSH", "SMTP"],
    answer: 2,
    pageNumber: "page-5"
});

// Defining prototype
function question(option) {
    this.charName = option.charName;
    this.answerOptions = option.answerOptions;
    this.answer = option.answer;
    this.pageNumber = option.pageNumber;
}

// Questions HTML template
var genQuestion = function(x) {
    var stage = $('#questions');
    stage.append('<div id="' + x.pageNumber + '" class="page"></div>');

    var questionsPage = $('#' + x.pageNumber);
    questionsPage.append('<h1>Network Concepts Quiz</h1><hr/>');
    questionsPage.append('<p class="charName">' + x.charName + '</p>');
    questionsPage.append('<form>');
    questionsPage.append('<input type="radio" name="tv1" value="0" checked>' + x.answerOptions[0] + '<br/>');
    questionsPage.append('<input type="radio" name="tv1" value="1">' + x.answerOptions[1] + '<br/>');
    questionsPage.append('<input type="radio" name="tv1" value="2">' + x.answerOptions[2] + '<br/>');
    questionsPage.append('<input type="radio" name="tv1" value="3">' + x.answerOptions[3] + '<br/>');
    questionsPage.append('</form>');
    questionsPage.append('<div class="feedback"></div>');
    questionsPage.append('<button>next</button>');
}

// Variables
var count = 0;
var nextPage = 1;

// Calculate score
function showScore() {
    $('.score').text(count + " out of 5");
}

// Checking answer
function checkAnswer(x) {
    var finalAnswer = $('input:checked').val();
    var feedback = $('.page:visible .feedback');

    if (finalAnswer == x.answer) {
        feedback.html('<p style="color: green;">Correct!</p>');
        count++;
    } else {
        feedback.html('<p style="color: red;">Wrong! The correct answer is: ' + x.answerOptions[x.answer] + '</p>');
    }

    if (nextPage == 5) {
        setTimeout(function() {
            $('#questions').hide();
            $('#finish').show();
            showScore();
        }, 2000); // Delay to show feedback before moving to results
    } else {
        nextPage++;
        setTimeout(function() {
            $('.page').hide();
            $('#finish').hide();
            $('#page-' + nextPage).show();
        }, 2000); // Delay to show feedback before moving to next question
    }
}

// Create a new game and questions
function newGame() {
    genQuestion(question1);
    genQuestion(question2);
    genQuestion(question3);
    genQuestion(question4);
    genQuestion(question5);
}

// Restart game
function restart() {
    count = 0;
    nextPage = 1;
    $('#start-page').show();
    $('#page-1').hide();
    $('#page-2').hide();
    $('#page-3').hide();
    $('#page-4').hide();
    $('#page-5').hide();
    $('#finish').hide();
    $('#questions').show();
    $('.score').empty();
    $('#finish').hide();
}

$(document).ready(function() {
    // When the start button is clicked
    $('#start-page button').click(function() {
        $('#start-page').hide();
        $('#page-1').show();
        $('#page-2').hide();
        $('#page-3').hide();
        $('#page-4').hide();
        $('#page-5').hide();
        $('#finish').hide();
    });

    // Generating the questions
    newGame();

    // Events when next button is clicked
    $('#page-1 button').click(function() {
        checkAnswer(question1);
    });

    $('#page-2 button').click(function() {
        checkAnswer(question2);
    });

    $('#page-3 button').click(function() {
        checkAnswer(question3);
    });

    $('#page-4 button').click(function() {
        checkAnswer(question4);
    });

    $('#page-5 button').click(function() {
        checkAnswer(question5);
    });

    // Event when try again is clicked
    $('#finish button').click(function() {
        restart();
    });
});