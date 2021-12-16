class DiceGame {
    constructor() {
        this.playerScore = 0;
        this.opponentScore = 0;
        this.playerDice1 = new Dice();
        this.playerDice2 = new Dice();
        this.opponentDice1 = new Dice();
        this.opponentDice2 = new Dice();
        this.turn = 1;
    }

    playTurn() {
        $("#roll-btn").prop("disabled",true);
        setTimeout(function() {
            $(".display-dice").each(function() {
                $(this).css("animation", "");
            });
            $("#roll-btn").prop("disabled",false);

        }, 3000);
        // Sets dice in history on the right pane
        let pDice1Value = this.playerDice1.rollDice($(".dice-one").eq(this.turn-1).children(), 1);
        let pDice2Value = this.playerDice2.rollDice($(".dice-two").eq(this.turn-1).children(), 2);
        let oDice1Value = this.opponentDice1.rollDice($(".dice-one").eq(this.turn).children(), 3);
        let oDice2Value = this.opponentDice2.rollDice($(".dice-two").eq(this.turn).children(), 4);
        

        let playerRoundScore = 0;
        if (pDice1Value == 1 || pDice2Value == 1) {
            playerRoundScore = 0;
        }
        else if (pDice1Value == pDice2Value) {
            playerRoundScore = (pDice2Value + pDice1Value) * 2;
        }
        else {
            playerRoundScore = (pDice2Value + pDice1Value);
        }

        let opponentRoundScore = 0;
        if (oDice1Value == 1 || oDice2Value == 1) {
            opponentRoundScore = 0;
        }
        else if (oDice1Value == oDice2Value) {
            opponentRoundScore = (oDice2Value + oDice1Value) * 2;
        }
        else {
            opponentRoundScore = (oDice2Value + oDice1Value);
        }

        setTimeout(function() {
            $(".round-score").eq(game.turn-1).text(playerRoundScore.toString());
            $(".round-score").eq(game.turn).text(opponentRoundScore.toString());
            game.turn += 2;
            game.updateScores(playerRoundScore, opponentRoundScore);

            if (game.turn == 7) {
                if (game.playerScore > game.opponentScore) {
                    $("#winner-text").text("You are the winner!");
                }
                else if (game.opponentScore > game.playerScore) {
                    $("#winner-text").text("You lost!");
                }
                else {
                    $("#winner-text").text("Tie!");
                }
                $("#results-popup").fadeTo(1,1);
            }
        }, 3000);
        
    }

    resetGame() {
        this.playerScore = 0;
        this.opponentScore = 0;
        this.turn = 1;
        $("#player-score").text(this.playerScore);
        $("#opponent-score").text(this.opponentScore);
        $("#results-popup").hide();
        $(".dice-one").each(function() {
            $(this).children().attr("src", "./images/Dice_1.png");
        });
        $(".dice-two").each(function() {
            $(this).children().attr("src", "./images/Dice_1.png");
        });
        $(".round-score").each(function() {
            $(this).text("0");
        });
    }

    updateScores(_playerScore, _opponentScore) {
        this.playerScore += parseInt(_playerScore);
        this.opponentScore += parseInt(_opponentScore);
        $("#player-score").text(this.playerScore);
        $("#opponent-score").text(this.opponentScore);
    }
}


class Dice {
    constructor() {}
    
    values = [1,2,3,4,5,6]

    rollDice(_element, _display) {
        this.value = this.values[Math.floor(Math.random()*this.values.length)];
        this.setDiceImage(_element, _display);
        return this.value;
    }

    setDiceImage(_element, _display) {
        let dice_num = this.value;
        $("#display-dice"+_display).attr("src", "./images/Dice_"+dice_num+".png");
        $("#display-dice"+_display).css("animation", "diceRoll 2s");
        setTimeout(function() {
            $(_element).attr("src", "./images/Dice_"+dice_num+".png");
        }, 3000);
        
    }
}

var game = new DiceGame();