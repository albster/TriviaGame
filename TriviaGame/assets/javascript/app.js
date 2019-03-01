$(document).ready(function() {
    // function creates start button and initial screen
    
    function openingPage() {
        openScreen = "<p class='text-center main-button-container'><a class='btn btn-warning btn-md btn-block start-button' href='#' role='button'>Yes!</a></p>";
        $("#mainArea").append(openScreen);
    }
    
    openingPage();
    
    //on-click event for start button start game
    
    $("#mainArea").on("click", ".start-button", function(event){
        event.preventDefault();  
        clickSound.play();
        $('.jumbotron').hide();
            
        generateQuestions();
    
        timerWrapper();
    
    }); // Closes start-button click
    
    $("body").on("click", ".answer", function(event){
        
        clickSound.play();
        selectedAnswer = $(this).text();
        
        selectedAnswer === correctAnswers[questionCounter] ? (
            //alert = win
            clearInterval(theClock),
            generateWin()) :
            //else
            (//alert = lose
            clearInterval(theClock),
            generateLoss()
        )
    }); // ends .answer click
    
    $("body").on("click", ".reset-button", function(event){
        clickSound.play();
        resetGame();

    }); // ends reset-button click
    
    });  //  Ends jQuery wrapper
    
    function timeoutLoss() {
        unansweredTally++;
        gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>Baby, you're out of time!  The correct answer was: " + correctAnswers[questionCounter] + "</p>" + "<img class='center-block img-wrong' src='TriviaGame/assets/images/xpng.gif'>";
        $("#mainArea").html(gameHTML);
        setTimeout(wait, 4000); 
    }
    
    function generateWin() {
        correctTally++;
        gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>You're right! The answer is: " + correctAnswers[questionCounter] + "</p>" + imageArray[questionCounter];
        $("#mainArea").html(gameHTML);
        
        setTimeout(wait, 4000);  
    }
    
    function generateLoss() {
        incorrectTally++;
        gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>Wrong! The correct answer is: "+ correctAnswers[questionCounter] + "</p>" + "<img class='center-block img-wrong' src='TriviaGame/assets/images/bk.gif'>";
        $("#mainArea").html(gameHTML);
        setTimeout(wait, 2500); 
    }
   

    function generateQuestions() {
        gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>15</span></p><p class='text-center'>" + questionArray[questionCounter] + "</p><p class='first-answer answer'>1. " + answerArray[questionCounter][0] + "</p><p class='answer'>2. "+answerArray[questionCounter][1]+"</p><p class='answer'>3. "+answerArray[questionCounter][2]+"</p><p class='answer'>4. "+answerArray[questionCounter][3]+"</p>";
        $("#mainArea").html(gameHTML);
    }; 
    
    function wait() {
        //ternary operator replacing if/else for generate more questions, found this solution to for shorter code.
    questionCounter < 7 ? 
        (questionCounter++,
        generateQuestions(),
        counter = 15,
        timerWrapper() ):
        
       (finalScreen())
    }; //end function
    
    function timerWrapper() {
        theClock = setInterval(fifteenSeconds, 1000);
        function fifteenSeconds() {
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
        gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + counter + "</span></p>" + "<p class='text-center'>End of game, wonder how you did?" + "</p>" + "<p class='summary-correct'>Answers you got right: " + correctTally + "</p>" + "<p>Answers you got wrong: " + incorrectTally + "</p>" + "<p>Unanswered: " + unansweredTally + "</p>" + "<p class='text-center reset-button-container'><a class='btn btn-warning btn-md btn-block reset-button' href='#' role='button'>Reset The Quiz!</a></p>";
        $("#mainArea").html(gameHTML);
    }
    
    function resetGame() {
        questionCounter = 0;
        correctTally = 0;
        incorrectTally = 0;
        unansweredTally = 0;
        counter = 15;
        generateQuestions();
        timerWrapper();
    }
    
    var openScreen;
    var gameHTML;
    var counter = 15;
    var questionArray = 
    [ "What member of The Beatles, was thought to have died on Nov.9th 1966?", 
    "What fashion model was dubbed 'The Face of 1966'?", 
    "What actress died on Aug.6th 1962?", 
    "What bands, front man was arrested on stage in Dec.9th 1967?",
    "What Italian film directed Mario Brava, was released in Italy in January 1968 but not in the US till December of 1968?", 
    "In what year did Ken Kesey and 13 Merry Pranksters drive across the USA on a Psychedelic trip to The Worlds Fair in NYC?", 
    "What artist said 'Take me, I am the drug; take me, I am hallucinogenic'?", 
    "What year was the book 'One flew over the cukoo's nest released'?" ];

    var answerArray = [
        ["John Lennon", "George Harrison", "Paul McCartny", "Ringo Starr"], 
        ["Sophia Louren","Peggy Moffit","Twiggy","Bridgette Bardot"], 
        ["Jane Mansfeild", "Marilyn Monroe", "Diana Barrymore", "Jane Fonda"], 
        ["Rolling Stones", "The Doors", "Deep Purple", "Black Sabboth"], 
        ["Blow Up", "Danger: Diabolik", "Girl on a motorcycle", "She killed in ecstasy"], 
        ["1969","1966","1964","1968"], 
        ["Andy Warhol", "Jasper Johns", "Salvidor Dali", "Picasso"], 
        ["1962","1969","1965","1968"], ];

    var imageArray = new Array();  
    imageArray[0] = "<img class='center-block' src='TriviaGame/assets/images/faul.gif'>";
    imageArray[1] = "<img class='center-block' src='TriviaGame/assets/images/twiggy.gif'>"; 
    imageArray[2] = "<img class='center-block' src='TriviaGame/assets/images/marilyn.gif'>"; 
    imageArray[3] = "<img class='center-block' src='TriviaGame/assets/images/morrison.gif'>";  
    imageArray[4] = "<img class='center-block' src='TriviaGame/assets/images/dd.jpg'>"; 
    imageArray[5] = "<img class='center-block' src='TriviaGame/assets/images/further.jpg'>"; 
    imageArray[6] = "<img class='center-block' src='TriviaGame/assets/images/dali.gif'>"; 
    imageArray[7] = "<img class='center-block' src='TriviaGame/assets/images/cuckoo.jpg'>"; 

    var correctAnswers = 
    [ "3. Paul McCartny", 
    "3. Twiggy", 
    "2. Marilyn Monroe", 
    "2. The Doors", 
    "2. Danger: Diabolik", 
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