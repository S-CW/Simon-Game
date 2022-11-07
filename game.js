var gamePattern = [];
var userClickedPattern = [];

var level = 0;
var started = false;

var buttonColours = ['red', 'blue', 'green', 'yellow'];

// detect when a keyboard key has been pressed, then call nextSequence().
$(document).keypress(function() {
    if (!started) {

        // when game is started, h1 title changes text from 'Press A Key to Start' to 'Level 0'
        $('#level-title').text('Level ' + level);
        nextSequence();
        started = true;
    };

});


$('.btn').on('click', function() {
    var userChosenColour = $(this).attr('id');
    userClickedPattern.push(userChosenColour);
    // console.log(userClickedPattern)

    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length - 1) // Get last index number of an array
})


function nextSequence() {
    //  reset the userClickedPattern when nextSequence() is triggered
    userClickedPattern = [];
    level ++;
    $('#level-title').text('Level ' + level)

    var randomNumber = Math.floor(Math.random() * 3) + 1;

    var randomChosenNumber = buttonColours[randomNumber];

    gamePattern.push(randomChosenNumber);
    $('#' + randomChosenNumber).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenNumber);
};


function checkAnswer(currentLevel) {
if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    console.log('success');

    // Check if user has finish their sequence
    if (userClickedPattern.length === gamePattern.length) {
        setTimeout(function() {
            nextSequence();
    }, 1000);
    }
}
else {
    console.log('wrong');

    $('#level-title').text('Game Over, Press any key to Restart')
    playSound('wrong');

    $('body').addClass('game-over');
    setTimeout(function() {
        $('body').removeClass('game-over');
    }, 200)
    startOver();
};
};

function playSound(color) {
    var playAudio = new Audio('sounds/' + color + '.mp3');
    playAudio.play();
};

function animatePress(currentColor) {
    var color = $('#' + currentColor)
    color.addClass('pressed');
    setTimeout(function() {
        color.removeClass('pressed')
    }, 100);
};

function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}



