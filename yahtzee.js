"use strict";
//Variables
var ns = {
    diceRoll: 0,
    rollCount: 3,
    turns: 3,
    buttArray: ["oneSub", "twoSub", "threeSub", "fourSub", "fiveSub", "sixSub", "tokButt", "fokButt", "fhButt", "ssButt", "lsButt", "yahButt", "chButt"],
    dieImgArray: ["1.png", "2.png", "3.png", "4.png", "5.png", "6.png"],
    scoreArray: [0, 0, 0, 0, 0],
    totalScore: 0,
    buttName: " ",
    upperSub: 0,
    upperTot: 0,
    lowerTot: 0,
    yahCheck: false,
    yahBo: 0
};

$(document).ready(function () {

    //Selects random number between 1 and 6 and rolls for each dice then assigns the image
    function rollDie() {
        for (var i = 1; i < 6; i++) {
            //Store html class name into var
            var diceNum = $("#dice" + i);
            //Check if that dice has keep class(if yes doesn't roll)
            if (!diceNum.hasClass('keep')) {
                ns.diceRoll = Math.floor(Math.random() * 6);
                var dieImage = "images/" + ns.dieImgArray[ns.diceRoll];
                document.getElementById("dice" + i).src = dieImage;
                //keeps track of the cards in num format for scoring
                ns.scoreArray[i - 1] = ns.diceRoll + 1;
            };
        };
    };
    //make images clickable adds a border as long as it's not ? img
    $(".die").click(function () {
        if ($(this).attr("src") != "images/q.png") {
            $(this).toggleClass('keep');
        }
    });
    //Allow three rolls on click of roll button
    $("#rollButton").click(function () {
        if (ns.rollCount > 0) {
            rollDie();
            $("#rollCount").text(--ns.rollCount + " roll(s) remaining.");
            //Adding animation
            $(".die").animate({ height: "100px" });
            $(".die").animate({ height: "150px" });
        };
    });

    //On first click it shows this info
    $(function () {
        function showInfo() {
            $("#info").show();
        }
        $("#rollButton").click(showInfo);
    });
    //Add border to all buttons with pseudo class
    $(":button").css("border", "2px solid #4CAF50");
    //Buttons
    $("input").click(function () {
        ns.buttName = $(this).attr("id");
        //Switch to run a function depending on the button clicked
        switch (ns.buttName) {
            case "oneSub":
                //Does the math and prints the score to the table all in one
                $("#oneScore").text(addScore(1).toString());
                nextRound();
                document.getElementById(ns.buttName).disabled = true;
                break;
            case "twoSub":
                $("#twoScore").text(addScore(2).toString());
                nextRound();
                document.getElementById(ns.buttName).disabled = true;
                break;
            case "threeSub":
                $("#threeScore").text(addScore(3).toString());
                nextRound();
                document.getElementById(ns.buttName).disabled = true;
                break;
            case "fourSub":
                $("#fourScore").text(addScore(4).toString());
                nextRound();
                document.getElementById(ns.buttName).disabled = true;
                break;
            case "fiveSub":
                $("#fiveScore").text(addScore(5).toString());
                nextRound();
                document.getElementById(ns.buttName).disabled = true;
                break;
            case "sixSub":
                $("#sixScore").text(addScore(6).toString());
                nextRound();
                document.getElementById(ns.buttName).disabled = true;
                break;
            case "tokButt":
                yahBoFunction();
                tokButtFunction();
                nextRound();
                document.getElementById(ns.buttName).disabled = true;
                break;
            case "fokButt":
                yahBoFunction();
                fokButtFunction();
                nextRound();
                document.getElementById(ns.buttName).disabled = true;
                break;
            case "fhButt":
                yahBoFunction();
                fhButtFunction();
                nextRound();
                document.getElementById(ns.buttName).disabled = true;
                break;
            case "ssButt":
                yahBoFunction();
                ssButtFunction();
                nextRound();
                document.getElementById(ns.buttName).disabled = true;
                break;
            case "lsButt":
                yahBoFunction();
                lsButtFunction();
                nextRound();
                document.getElementById(ns.buttName).disabled = true;
                break;
            case "yahButt":
                yahBoFunction();
                yahtzeeFunction();
                nextRound();
                document.getElementById(ns.buttName).disabled = true;
                break;
            case "chButt":
                yahBoFunction();
                chFunction();
                nextRound();
                document.getElementById(ns.buttName).disabled = true;
                break;
            case "resetButt":
                resetGame();
                break;
        };
        $("#totalScore").text(ns.totalScore);
    });
    //lower scoring function
    function addScore(score) {
        yahBoFunction();
        var sub = 0;
        for (var i = 0; i <= 4; i++) {
            if (ns.scoreArray[i] == score) {
                sub += score;
            }
        };

        ns.totalScore += sub;
        ns.upperSub += sub;
        ns.upperTot += sub;

        if (ns.upperSub >= 63) {
            ns.totalScore += 35;
            ns.upperTot += 35;
            $("#upperBonus").text("35");
        };

        $("#upperSub").text(ns.upperSub);
        $("#upperTotal").text(ns.upperTot);
        //makes it so that if you click the button straight after scoring you get 0
        ns.scoreArray = [0, 0, 0, 0, 0];
        return sub;
    };
    //tokButt function
    function tokButtFunction() {
        var sub = 0;
        ns.scoreArray.sort();
        for (var i = 0; i <= 2; i++) {
            if ((ns.scoreArray[i] == ns.scoreArray[i + 1])
                && (ns.scoreArray[i] == ns.scoreArray[i + 2])) {
                for (var i = 0; i <= 4; i++) {
                    sub += ns.scoreArray[i];
                };
            };
        };
        ns.totalScore += sub;
        ns.lowerTot += sub;
        $("#lowerTotal").text(ns.lowerTot);
        $("#tokScore").text(sub);
        ns.scoreArray = [0, 0, 0, 0, 0];
    };
    //fokButt function
    function fokButtFunction() {
        var sub = 0;
        ns.scoreArray.sort();
        for (var i = 0; i <= 1; i++) {
            if ((ns.scoreArray[i] == ns.scoreArray[i + 1])
                && (ns.scoreArray[i] == ns.scoreArray[i + 2])
                && (ns.scoreArray[i] == ns.scoreArray[i + 3])) {
                for (var i = 0; i <= 4; i++) {
                    sub += ns.scoreArray[i];
                };
            };
        };
        ns.totalScore += sub;
        ns.lowerTot += sub;
        $("#lowerTotal").text(ns.lowerTot);
        $("#fokScore").text(sub);
        ns.scoreArray = [0, 0, 0, 0, 0];
    };
    //fhButt function (fix)
    function fhButtFunction() {
        var sub = 0;
        ns.scoreArray.sort();
        if ((ns.scoreArray[0] == ns.scoreArray[1]) && (ns.scoreArray[0] == ns.scoreArray[2]) && (ns.scoreArray[3] == ns.scoreArray[4])
            && (ns.scoreArray[0] != 0) && (ns.scoreArray[0] != ns.scoreArray[4])
            ||
            (ns.scoreArray[0] == ns.scoreArray[1]) && (ns.scoreArray[2] == ns.scoreArray[3]) && (ns.scoreArray[2] == ns.scoreArray[4])
            && (ns.scoreArray[0] != 0) && (ns.scoreArray[0] != ns.scoreArray[4])) {
            sub += 25;
        };
        ns.totalScore += sub;
        ns.lowerTot += sub;
        $("#lowerTotal").text(ns.lowerTot);
        $("#fhScore").text(sub);
        jokerFunction();
        ns.scoreArray = [0, 0, 0, 0, 0];
    };
    //Small straight function
    function ssButtFunction() {
        var sub = 0;
        ns.scoreArray.sort();
        //see if this works
        var array = ns.scoreArray.slice().sort(function (a, b) {
            return a > b;
        }).reduce(function (a, b) {
            if (a.slice(-1)[0] !== b) a.push(b);
            return a;
        }, []);

        if ((array[0] + 1) == (array[1]) && (array[1] + 1) == (array[2]) && (array[2] + 1) == (array[3])) {
            sub += 30;
        };
        //End of test
        ns.totalScore += sub;
        ns.lowerTot += sub;
        $("#lowerTotal").text(ns.lowerTot);
        $("#ssScore").text(sub);
        jokerFunction();
        ns.scoreArray = [0, 0, 0, 0, 0];
    };
    //Large straight function
    function lsButtFunction() {
        var sub = 0;
        ns.scoreArray.sort();
        if ((ns.scoreArray[0] + 1) == (ns.scoreArray[1]) && (ns.scoreArray[1] + 1) == (ns.scoreArray[2]) && (ns.scoreArray[2] + 1) == (ns.scoreArray[3])
            && (ns.scoreArray[3] + 1) == (ns.scoreArray[4])) {
            sub += 40;
        };
        ns.totalScore += sub;
        ns.lowerTot += sub;
        $("#lowerTotal").text(ns.lowerTot);
        $("#lsScore").text(sub);
        jokerFunction();
        ns.scoreArray = [0, 0, 0, 0, 0];
    };
    //Yahtzee function
    function yahtzeeFunction() {
        var sub = 0;
        ns.scoreArray.sort();
        if ((ns.scoreArray[0] == ns.scoreArray[1])
            && (ns.scoreArray[0] == ns.scoreArray[2])
            && (ns.scoreArray[0] == ns.scoreArray[3])
            && (ns.scoreArray[0] == ns.scoreArray[4])
            && (ns.scoreArray[0]) != 0) {
            ns.yahCheck = true;
            sub += 50;
        };
        ns.totalScore += sub;
        ns.lowerTot += sub;
        $("#lowerTotal").text(ns.lowerTot);
        $("#yahScore").text(sub);
        ns.scoreArray = [0, 0, 0, 0, 0];
    };
    //Yahtzee bonus function
    function yahBoFunction() {
        if ((ns.scoreArray[0] == ns.scoreArray[1])
            && (ns.scoreArray[0] == ns.scoreArray[2])
            && (ns.scoreArray[0] == ns.scoreArray[3])
            && (ns.scoreArray[0] == ns.scoreArray[4])
            && (ns.scoreArray[0]) != 0) {
            if (ns.yahCheck == true) {
                ns.yahBo += 100;
                ns.totalScore += 100;
                ns.lowerTot += 100;
            };
        };
        $("#lowerTotal").text(ns.lowerTot);
        $("#yahBonus").text(ns.yahBo);
    };
    //Joker function
    function jokerFunction() {

        if ((ns.scoreArray[0] == ns.scoreArray[1])
            && (ns.scoreArray[0] == ns.scoreArray[2])
            && (ns.scoreArray[0] == ns.scoreArray[3])
            && (ns.scoreArray[0] == ns.scoreArray[4])
            && (ns.scoreArray[0] != 0)
            && (document.getElementById("yahButt").disabled === true)
            && (ns.yahCheck == false)) {
            if (ns.buttName == "fhButt") {
                var fhSub = 25;
                ns.totalScore += fhSub;
                ns.lowerTot += fhSub;
                $("#lowerTotal").text(ns.lowerTot);
                $("#fhScore").text(fhSub);
                ns.scoreArray = [0, 0, 0, 0, 0];
            };
            if (ns.buttName == "ssButt") {
                var ssSub = 30;
                ns.totalScore += ssSub;
                ns.lowerTot += ssSub;
                $("#lowerTotal").text(ns.lowerTot);
                $("#ssScore").text(ssSub);
                ns.scoreArray = [0, 0, 0, 0, 0];
            };
            if (ns.buttName == "lsButt") {
                var lsSub = 40;
                ns.totalScore += lsSub;
                ns.lowerTot += lsSub;
                $("#lowerTotal").text(ns.lowerTot);
                $("#lsScore").text(lsSub);
                ns.scoreArray = [0, 0, 0, 0, 0];
            };
        };
    };
    //Chance function
    function chFunction() {
        var sub = 0;
        for (var i = 0; i <= 4; i++) {
            sub += ns.scoreArray[i];
        };
        ns.totalScore += sub;
        ns.lowerTot += sub;
        $("#lowerTotal").text(ns.lowerTot);
        $("#chScore").text(sub);
        ns.scoreArray = [0, 0, 0, 0, 0];
    };
    //restart game after adding scores
    function nextRound() {
        ns.rollCount = 3;
        $("#rollCount").text("3 roll(s) remaining.");
        //removes keep classes
        if ($(".die").hasClass('keep')) {
            $(".die").removeClass('keep');
        };
        //resets the images
        for (var i = 1; i < 6; i++) {
            var dieImage = "images/q.png";
            document.getElementById("dice" + i).src = dieImage;
        };
    };
    //Reset button function (probs not function function) make it a click event
    function resetGame() {
        nextRound();
        //reset scores
        ns.totalScore = 0;
        ns.lowerTot = 0;
        ns.upperSub = 0;
        ns.upperTot = 0;
        ns.yahCheck = false;
        ns.yahBo = 0;
        ns.scoreArray = [0, 0, 0, 0, 0];
        $(".scoreCol").text(0);
        //reactivate buttons
        $.each(ns.buttArray, function (index, value) {
            document.getElementById(value).disabled = false;
        });
        
    };
});