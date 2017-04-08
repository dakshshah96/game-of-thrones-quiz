/**

Hey there, looks like you liked this quiz enough to take a peek at the source code.
Thanks for doing so!

This project was made by Daksh Shah and you can read more about him at https://daksh.me

**/

// Main quiz object
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
        correctAnswer: 0,
        success: [
            "Alleluia!",
            "What do we say to the lord of death? Not today."
        ],
        failure: [
            "Ack!",
            "The things we love destroy us every time, lad. Remember that."
        ]
    }, {
        question: "What's the name of Lysa Arryn's way-too-old-to-be-nursing son?",
        answers: [
            "Ned",
            "Robin",
            "Edmore",
            "Tyrion"
        ],
        correctAnswer: 1,
        success: [
            "Hip, Hip, Hooray!",
            "A lion doesn't concern itself with the opinion of sheep."
        ],
        failure: [
            "Boo!",
            "When you play a game of thrones you win or you die."
        ]
    }, {
        question: "What's the name of the explosive that gave the Lannisters the edge in the Battle of Blackwater?",
        answers: [
            "Wildfire",
            "Dragonfire",
            "Godsfire",
            "Pantsonfire"
        ],
        correctAnswer: 0,
        success: [
            "Boo-ya!",
            "By what right does the wolf judge the lion?"
        ],
        failure: [
            "Eeeks!",
            "Nothing burns like the cold."
        ]
    }, {
        question: "How is \"The Queen Of Thorns\" more commonly known?",
        answers: [
            "Cersei Lannister",
            "Margaery Tyrell",
            "Olenna Tyrell",
            "E Jarvis Thribb"
        ],
        correctAnswer: 2,
        success: [
            "Ooh-la-la!",
            "Valar Morghulis!"
        ],
        failure: [
            "Neener-neener!",
            "A bruise is a lesson... and each lesson makes us better."
        ]
    }, {
        question: "What is Pycelle's official title in the Red Keep?",
        answers: [
            "Master of Coin",
            "Games Maester",
            "Lord Commander of the Kingsguard",
            "Grand Maester"
        ],
        correctAnswer: 3,
        success: [
            "Sis boom bah!",
            "Fire cannot kill a dragon."
        ],
        failure: [
            "Tchah!",
            "The man who fears losing has already lost."
        ]
    }, {
        question: "Which Lannister song signalled doom at the Red Wedding?",
        answers: [
            "The Rains Of Castermere",
            "A Golden Crown",
            "The Assassin's Dagger",
            "Tales Of Topographic Oceans"
        ],
        correctAnswer: 0,
        success: [
            "Ride like the wind!",
            "The only time a man can be brave is when he's afraid."
        ],
        failure: [
            "Bam!",
            "There is only one god, and his name is Death."
        ]
    }, {
        question: "What piece of fencing advice did Jon Snow give to Arya Stark? \"Stick them with the…\"",
        answers: [
            "\"…Prickly end\"",
            "\"…Sharp end\"",
            "\"…Futtocks End\"",
            "\"…Pointy end\""
        ],
        correctAnswer: 3,
        success: [
            "Whoop-de-doo!",
            "If we die, we die but first we'll live."
        ],
        failure: [
            "Pfffft!",
            "What we don't know is what usually gets us killed."
        ]
    }, {
        question: "Who said, \"Some day I'm gonna put a sword through your eye and out the back of your skull\"?",
        answers: [
            "Theon Greyjoy",
            "Shae",
            "Arya Stark",
            "The Mountain"
        ],
        correctAnswer: 2,
        success: [
            "Ludicrous Speed!",
            "Chaos isn't a pit. Chaos is a ladder."
        ],
        failure: [
            "Uh-oh!",
            "Nothing isn't better or worse than anything. Nothing is just nothing."
        ]
    }, {
        question: "Who was burned alive on Drogo's funeral pyre?",
        answers: [
            "Khal Drogo",
            "Mirri Maz Duur",
            "Maris Piper",
            "Septa Mordane"
        ],
        correctAnswer: 1,
        success: [
            "Off the charts!",
            "A dragon is not a slave."
        ],
        failure: [
            "Yikes!",
            "Any man who must say 'I am the king' is no true king."
        ]
    }, {
        question: "Who said, \"If you ever call me sister again, I'll have you strangled in your sleep\"?",
        answers: [
            "Annie Lennox",
            "Meg White",
            "Catelyn Stark",
            "Cersei Lannister"
        ],
        correctAnswer: 3,
        success: [
            "Yo-ho-ho!",
            "A very small man can cast a very large shadow."
        ],
        failure: [
            "Zoinks!",
            "If you think this has a happy ending, you haven’t been paying attention."
        ]
    }]
};

// Return the question based on current question number
function constructQuestion(quiz) {
    return quiz.questions[quiz.currentQuestion].question;
}

// The main function which runs the quiz
function runQuiz(quiz) {

    // Check if player had pressed play again on finish screen
    if (quiz.currentQuestion === 0) {
        $('#finish').attr('hidden', true);
    }
    // Check if player is on last question of quiz (9th question)
    if (quiz.currentQuestion === 10) {
            // Show finish screen
            $('#question-main-content').fadeOut('fast', function() {
                $('#finish').removeAttr('hidden');
            });
            // Display final score
            $('.finalScore').text(quiz.correct);
            // Display praise text based on performance
            if (quiz.correct < 5) {
                $('.praise-text').text('Bahaha! Have you ever seen GoT? Doesn\'t seem so.');
            } else if (quiz.correct < 8) {
                $('.praise-text').text('Hmm. Well done. You can do better though.');
            } else {
                $('.praise-text').text('Wow! Shekh Ma Shieraki Anni. You\'re king of the world!');
            }
    } else {
        // Update question number in heading
        $('#current').text(quiz.currentQuestion + 1);
        // Show main question screen
        $('#question-main-content').fadeIn('fast');
        // Embed question text
        $('.questionText').text(constructQuestion(quiz));
        // Fill in option choices
        $('#questions').find('.radio').each(function(index, element) {
            $(this).find('span.options').text(quiz.questions[quiz.currentQuestion].answers[index]);
        });
    }
    // Show correct/incorrect answers in progress bar
    $('.bg-success').text(quiz.correct);
    $('.bg-danger').text(quiz.incorrect);
    // Manipulate width of progress bar according to correct/incorrect
    $('.bg-success').css('width', quiz.correct * 10 + "%");
    $('.bg-danger').css('width', quiz.incorrect * 10 + "%");
}

// Handle switching screens on success/failure
function failSuccess(quiz, userAnswer) {
    if (checkAnswer(userAnswer, quiz)) {
        $('#question-main-content').fadeOut('fast', function() {
            $('.answer-success h2').text(quiz.questions[quiz.currentQuestion].success[0]);
            $('.answer-success p').text(quiz.questions[quiz.currentQuestion].success[1]);
            $('.answer-success').removeAttr('hidden');
        });
    } else {
        $('#question-main-content').fadeOut('fast', function() {
            $('.answer-failure h2').text(quiz.questions[quiz.currentQuestion].failure[0]);
            $('.desc-fail-message').text(quiz.questions[quiz.currentQuestion].failure[1]);
            $('.answer-failure').removeAttr('hidden');
        });
    }
}

// Handle quiz being reset by player
function resetQuiz(quiz) {
    quiz.currentQuestion = 0;
    quiz.correct = 0;
    quiz.incorrect = 0;
}

// Return true/false based on user answer
function checkAnswer(userAnswer, quiz) {
    if (userAnswer === quiz.questions[quiz.currentQuestion].answers[quiz.questions[quiz.currentQuestion].correctAnswer]) {
        return true;
    }
    else {
        $(".desc-wrong-answer").html("The correct answer was <strong>" + quiz.questions[quiz.currentQuestion].answers[quiz.questions[quiz.currentQuestion].correctAnswer] + "</strong>.");
        return false;
    }
}

// Increment correct/incorrect based on user answer
function calculateScore(answerResult, quiz) {
    if (answerResult) {
        quiz.correct += 1;
    } else {
        quiz.incorrect += 1;
    }
}

$(function() {

    // Handle radio options hover
    $('.radio label').hover(
        function() {
            if (!$(this).children('input[type="radio"]').is(':checked')) {
                $(this).css('background', '#6FC6FF');
            }
        }, function() {
            if (!$(this).children('input[type="radio"]').is(':checked')) {
                $(this).css('background', '#55acee');
            }
        }
    );

    // Handle radio options clicks
    $('.radio label').click(function() {
        $('.action-button .btn-next').removeClass('disabled');
        $('.options').css({'font-weight': 'normal', 'font-style': 'normal'});
        $('.radio label').css({'background': '#55acee', 'box-shadow': '0px 5px 0px 0px #3C93D5'});
        $(this).children('input[type="radio"]').prop('checked', true);
        $(this).css({'background': '#55acee', 'box-shadow': '0px 1px 0px 0px #55acee', 'transform': 'translate(0px, 5px)', '-webkit-transform': 'translate(0px, 5px)'});
        $(this).children('.options').css({'font-weight': 'bold', 'font-style': 'italic'});
    });

    // Handle start quiz button click
    $('#btn-start').click(function() {
        $('#intro').fadeOut('fast', function() {
            $('#questions').removeAttr('hidden');
        });
        runQuiz(quiz); 
    });

    // Handle reset button click
    $('#questions').on('click', '.btn-reset', function() {
        resetQuiz(quiz);
        runQuiz(quiz);
        // Reset and uncheck radio buttons on reset quiz
        $('.radio label').children('input[type="radio"]').prop('checked', false);
        $('.options').css({'font-weight': 'normal', 'font-style': 'normal'});
        $('.radio label').css({'background': '#55acee', 'box-shadow': '0px 5px 0px 0px #3C93D5'});
        // Disable submit button again
        $('.action-button .btn-next').addClass('disabled');
    });

    // Handle answer submit click
    $('#questions').on('click', '.btn-next', function() {
        var userAnswer = $('input[name=option]:checked').siblings('.options').text();
        calculateScore(checkAnswer(userAnswer, quiz), quiz);
        failSuccess(quiz, userAnswer);
        // Reset and uncheck radio buttons on submit
        $('.radio label').children('input[type="radio"]').prop('checked', false);
        $('.options').css({'font-weight': 'normal', 'font-style': 'normal'});
        $('.radio label').css({'background': '#55acee', 'box-shadow': '0px 5px 0px 0px #3C93D5'});
        // Disable submit button again
        $('.action-button .btn-next').addClass('disabled');
    });

    // Handle continue button click on answer/failure
    $(".answer-success, .answer-failure").on('click', '.continue', function() {
        $('.answer-success, .answer-failure').attr('hidden', true);
        quiz.currentQuestion += 1;
        runQuiz(quiz);
    });

    // Handle play again button click
    $('#finish').on('click', '.btn-reset', function() {
        resetQuiz(quiz);
        runQuiz(quiz);
    });
});
