var quiz = {
    currentQuestion: 0,
    correct: 0,
    incorrect: 0,
    questions: [{
        question: "What is the name of Jon Snow's direwolf?",
        answers: [
            "Ghost",
            "Grey Wind",
            "Graham",
            "Ricky"
        ],
        correctAnswer: 0
    }, {
        question: "What's the name of Lysa Arryn's way-too-old-to-be-nursing son?",
        answers: [
            "Ned",
            "Robin",
            "Edmore",
            "Tyrion"
        ],
        correctAnswer: 1
    }, {
        question: "What's the name of the explosive that gave the Lannisters the edge in the Battle of Blackwater?",
        answers: [
            "Wildfire",
            "Dragonfire",
            "Godsfire",
            "Pantsonfire"
        ],
        correctAnswer: 0
    }, {
        question: "How is \"The Queen Of Thorns\" more commonly known?",
        answers: [
            "Cersei Lannister",
            "Margaery Tyrell",
            "Olenna Tyrell",
            "E Jarvis Thribb"
        ],
        correctAnswer: 2
    }, {
        question: "What is Pycelle's official title in the Red Keep?",
        answers: [
            "Master of Coin",
            "Games Maester",
            "Lord Commander of the Kingsguard",
            "Grand Maester"
        ],
        correctAnswer: 3
    }, {
        question: "Which Lannister song signalled doom at the Red Wedding?",
        answers: [
            "The Rains Of Castermere",
            "A Golden Crown",
            "The Assassin's Dagger",
            "Tales Of Topographic Oceans"
        ],
        correctAnswer: 0
    }, {
        question: "What piece of fencing advice did Jon Snow give to Arya Stark? \"Stick them with the…\"",
        answers: [
            "\"…Prickly end\"",
            "\"…Sharp end\"",
            "\"…Futtocks End\"",
            "\"…Pointy end\""
        ],
        correctAnswer: 3
    }, {
        question: "Who said, \"Some day I'm gonna put a sword through your eye and out the back of your skull\"?",
        answers: [
            "Theon Greyjoy",
            "Shae",
            "Arya Stark",
            "The Mountain"
        ],
        correctAnswer: 2
    }, {
        question: "Who was burned alive on Drogo's funeral pyre?",
        answers: [
            "Khal Drogo",
            "Mirri Maz Duur",
            "Maris Piper",
            "Septa Mordane"
        ],
        correctAnswer: 1
    }, {
        question: "Who said, \"If you ever call me sister again, I'll have you strangled in your sleep\"?",
        answers: [
            "Annie Lennox",
            "Meg White",
            "Catelyn Stark",
            "Cersei Lannister"
        ],
        correctAnswer: 3
    }]
};

function constructQuestion(quiz) {
    return quiz.questions[quiz.currentQuestion].question;
}

function runQuiz(quiz) {
    console.log(quiz.currentQuestion);
    if (quiz.currentQuestion === 10) {
            $("#questions, #stats, #question-count").attr('hidden', true);
            $("#finish").removeAttr('hidden');
            $('.finalScore').text(quiz.correct + " / " + 10);
    } else {
        $('#current').text(quiz.currentQuestion + 1);
        $('#question-main-content').fadeIn('fast');
        $("#questions").fadeIn('fast');
        $('.questionText').text(constructQuestion(quiz));
        $('.question-count').find('#current').text(quiz.currentQuestion + 1);
        $('#questions').find('.radio').each(function(index, element) {
            $(this).find('span.options').text(quiz.questions[quiz.currentQuestion].answers[index]);
        });
    }
    $('#right').find('span').text(quiz.correct);
    $('#wrong').find('span').text(quiz.incorrect);
}

function failSuccess(quiz, userAnswer) {
    if (checkAnswer(userAnswer, quiz)) {
        $('#question-main-content').fadeOut('fast', function() {
            $('.answer-success').removeAttr('hidden');
        });
    } else {
        $('#question-main-content').fadeOut('fast', function() {
            $('.answer-failure').removeAttr('hidden');
        });
    }
}

function resetQuiz(quiz) {
    quiz.currentQuestion = 0;
    quiz.correct = 0;
    quiz.incorrect = 0;
}

function checkAnswer(userAnswer, quiz) {
    if (userAnswer === quiz.questions[quiz.currentQuestion].answers[quiz.questions[quiz.currentQuestion].correctAnswer]) {
        return true;
    }
    else {
        $(".desc-wrong-answer").html("The correct answer was <strong>" + quiz.questions[quiz.currentQuestion].answers[quiz.questions[quiz.currentQuestion].correctAnswer] + "</strong>.");
        return false;
    }
}

function calculateScore(answerResult, quiz) {
    if (answerResult) {
        quiz.correct += 1;
    } else {
        quiz.incorrect += 1;
    }
}

$(function() {

    $('#btn-start').click(function() {
        $('#intro').fadeOut('fast', function() {
            $('#questions').removeAttr('hidden');
        });
        runQuiz(quiz); 
    });

    $('#questions').on('click', '.btn-reset', function() {
        resetQuiz(quiz);
        runQuiz(quiz);
        $('input[name=option]:checked').prop("checked", false);
    });

    $('#questions').on('click', '.btn-next', function() {
        var userAnswer = $('input[name=option]:checked').siblings('.options').text();
        calculateScore(checkAnswer(userAnswer, quiz), quiz);
        failSuccess(quiz, userAnswer);
        $('input[name=option]:checked').prop("checked", false);
    });

    $(".answer-success, .answer-failure").on('click', '.continue', function() {
        $('.answer-success, .answer-failure').attr('hidden', true);
        quiz.currentQuestion += 1;
        runQuiz(quiz);
    });
});
