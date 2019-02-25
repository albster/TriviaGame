$(document).ready(function() {
    // Create a function that creates the start button and initial screen
    
    function openingPage() {
        openScreen = "<p class='text-center main-button-container'><a class='btn btn-warning btn-md btn-block start-button' href='#' role='button'>Take The Trip</a></p>";
        $("#mainArea").append(openScreen);
    }
    
    openingPage();
    
    //on-click event for start button to begin name
    
    $("#mainArea").on("click", ".start-button", function(event){
        event.preventDefault();  // added line to test issue on GitHub Viewer
        clickSound.play();
        $('.jumbotron').hide();
            
        generateQuestions();
    
        timerWrapper();
    
    }); // Closes start-button click
    
    $("body").on("click", ".answer", function(event){
        
        clickSound.play();
        selectedAnswer = $(this).text();
        //ternary operator, if/else replacement
        selectedAnswer === correctAnswers[questionCounter] ? (
            //alert("correct");
            clearInterval(theClock),
            generateWin()) :
            //else
            (//alert("wrong answer!");
            clearInterval(theClock),
            generateLoss()
        )
    }); // Close .answer click
    
    $("body").on("click", ".reset-button", function(event){
        clickSound.play();
        resetGame();
    }); // Closes reset-button click
    
    });  //  Closes jQuery wrapper
    
    function timeoutLoss() {
        unansweredTally++;
        gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>You ran out of time!  The correct answer was: " + correctAnswers[questionCounter] + "</p>" + "<img class='center-block img-wrong' src='TriviaGame/assets/images/xpng.gif'>";
        $("#mainArea").html(gameHTML);
        setTimeout(wait, 3000);  //  change to 4000 or other amount
    }
    
    function generateWin() {
        correctTally++;
        gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>Correct! The answer is: " + correctAnswers[questionCounter] + "</p>" + imageArray[questionCounter];
        $("#mainArea").html(gameHTML);
        
        setTimeout(wait, 3000);  //end generatewin
    }
    
    function generateLoss() {
        incorrectTally++;
        gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>Wrong! The correct answer is: "+ correctAnswers[questionCounter] + "</p>" + "<img class='center-block img-wrong' src='TriviaGame/assets/images/x.gif'>";
        $("#mainArea").html(gameHTML);
        setTimeout(wait, 3000); 
    }
    //end generate loss

    function generateQuestions() {
        gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>30</span></p><p class='text-center'>" + questionArray[questionCounter] + "</p><p class='first-answer answer'>1. " + answerArray[questionCounter][0] + "</p><p class='answer'>2. "+answerArray[questionCounter][1]+"</p><p class='answer'>3. "+answerArray[questionCounter][2]+"</p><p class='answer'>4. "+answerArray[questionCounter][3]+"</p>";
        $("#mainArea").html(gameHTML);
    }; //end generate question
    
    function wait() {
        //ternary operator replacing if/else for generate more questions
    questionCounter < 7 ? 
        (questionCounter++,
        generateQuestions(),
        counter = 30,
        timerWrapper() ):
        
       (finalScreen())
    }; //end function
    
    function timerWrapper() {
        theClock = setInterval(thirtySeconds, 1000);
        function thirtySeconds() {
            if (counter === 0) {
                clearInterval(theClock);
                timeoutLoss();
            }
            if (counter > 0) {
                counter--;
            }
            $(".timer").html(counter);
        }
    }
    
    function finalScreen() {
        gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>All done, here's how you did!" + "</p>" + "<p class='summary-correct'>Correct Answers: " + correctTally + "</p>" + "<p>Wrong Answers: " + incorrectTally + "</p>" + "<p>Unanswered: " + unansweredTally + "</p>" + "<p class='text-center reset-button-container'><a class='btn btn-warning btn-md btn-block reset-button' href='#' role='button'>Reset The Quiz!</a></p>";
        $("#mainArea").html(gameHTML);
    }
    
    function resetGame() {
        questionCounter = 0;
        correctTally = 0;
        incorrectTally = 0;
        unansweredTally = 0;
        counter = 30;
        generateQuestions();
        timerWrapper();
    }
    
    var openScreen;
    var gameHTML;
    var counter = 30;
    var questionArray = 
    [ "What member of The Beatles, was thought to have died on Nov.9th 1966?", 
    "What fashion model was dubbed 'The Face of 1966'?", 
    "What actress died on Aug.6th 1962?", 
    "What bands, front man was arrested on stage in Dec.9th 1967?",
    "What couple appeared naked on their own LP?", 
    "In what year did Ken Kesey and 13 Merry Pranksters drive across the USA on a Psychedelic trip to The Worlds Fair in NYC?", 
    "What artist said 'Take me, I am the drug; take me, I am hallucinogenic'?", 
    "What year was the book 'One flew over the cukoo's nest released'?" ];

    var answerArray = [
        ["Johmn Lennon", "George Harrison", "Paul McCartny", "Ringo Starr"], 
        ["Sophia Louren","Peggy Moffit","Twiggy","Bridgette Bardot"], 
        ["Jane Mansfeild", "Marilyn Monroe", "Diana Barrymore", "Jane Fonda"], 
        ["Hawkwind", "The Doors", "Deep Purple", "Black Sabboth"], 
        ["Paul & Linda", "John & Yoko", "Sonny & Cher", "Ike and Tina"], 
        ["1969","1966","1964","1968"], 
        ["Andy Warhol", "Jasper Johns", "Salvidor Dali", "Picasso"], 
        ["1962","1969","1965","1968"], ];

    var imageArray = new Array();  
    imageArray[0] = "<img class='center-block' src='TriviaGame/assets/images/faul.gif'>";
    imageArray[1] = "<img class='center-block' src='TriviaGame/assets/images/twiggy.gif'>"; 
    imageArray[2] = "<img class='center-block' src='TriviaGame/assets/images/marilyn.gif'>"; 
    imageArray[3] = "<img class='center-block' src='TriviaGame/assets/images/morrison.gif'>";  
    imageArray[4] = "<img class='center-block' src='TriviaGame/assets/images/john&yoko.gif'>"; 
    imageArray[5] = "<img class='center-block' src='TriviaGame/assets/images/further.jpg'>"; 
    imageArray[6] = "<img class='center-block' src='TriviaGame/assets/images/dali.gif'>"; 
    imageArray[7] = "<img class='center-block' src='TriviaGame/assets/images/cuckoo.jpg'>"; 

    var correctAnswers = 
    [ "3. Paul McCartny", 
    "3. Twiggy", 
    "2. Marilyn Monroe", 
    "2. The Doors", 
    "2. John & Yoko", 
    "3. 1964", 
    "3. Salvidor Dali", 
    "1. 1962"];

    var questionCounter = 0;
    var selecterAnswer;
    var theClock;
    var correctTally = 0;
    var incorrectTally = 0;
    var unansweredTally = 0;
var clickSound = new Audio("TriviaGame/assets/sounds/click-sound.mp3");