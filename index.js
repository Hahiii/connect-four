document.addEventListener("DOMContentLoaded", () => {

    var playerRed;
    var playerBlue;
    var gameField = document.querySelector(".game-field").children;
    var victory = document.querySelector(".players-victory-container");
    var playersName = document.querySelectorAll(".player");
    var setPlayers = document.querySelector(".players-name-container");
    var setPlayerName = document.querySelectorAll(".players");
    var turnColor = document.querySelectorAll(".turn-pieces");
    var wins = document.querySelectorAll(".wins");
    var form = document.querySelector("form");
    form.addEventListener("click", function () {
        event.preventDefault();
    });

    var newGme = document.querySelector("#new-game");
    newGme.addEventListener("click", resetToStartNewGame, false);

    var keepPlaying = document.querySelector("#play-again");
    keepPlaying.addEventListener("click", resetGameFiled, false);

    var startGame = document.querySelector(".start-game");
    startGame.addEventListener("click", setNamesAndStartTheGame, false);

    var gameFieldArray = [
        ["", "", "", "", "", "", ""],
        ["", "", "", "", "", "", ""],
        ["", "", "", "", "", "", ""],
        ["", "", "", "", "", "", ""],
        ["", "", "", "", "", "", ""],
        ["", "", "", "", "", "", ""],
    ];

    function Players(id, isActive, wins, name, backgroundColor, textColor, positionX, positionY) {
        this.id = id,
            this.isActive = isActive,
            this.wins = wins,
            this.name = name,
            this.backgroundColor = backgroundColor,
            this.textColor = textColor,
            this.positionX = positionX,
            this.positionY = positionY
    }

    function setNamesAndStartTheGame() {
        if (playersName[0].value.length > 0 && playersName[1].value.length > 0) {
            playerRed = new Players("red", true, 0, playersName[0].value, "radial-gradient(#bc1d1d, #a61f1f)", "rgb(165, 59, 59)");
            playerBlue = new Players("blue", false, 0, playersName[1].value, "radial-gradient(#1d20bc, #2d1fa6)", "rgb(45, 61, 137)");
            setPlayerName[0].innerHTML = playerRed.name;
            setPlayerName[1].innerHTML = playerBlue.name;
            setPlayers.dataset.sectionDisplay = "false";
            turnColor[1].style.visibility = "hidden";
        }
    }

    for (let i = 0; i < gameField.length; i++) {
        gameField[i].addEventListener("click", function () {
            for (let x = 5; x >= 0; x--) {
                if (event.currentTarget.children[x].children[0].style.backgroundColor == "") {
                    if (playerRed.isActive) {
                        turnColor[1].style.visibility = "visible";
                        event.currentTarget.children[x].children[0].style.background = playerRed.backgroundColor;
                        event.currentTarget.children[x].classList.add("active");
                        playerRed.positionX = Number(event.currentTarget.children[x].id);
                        playerRed.positionY = Number(event.currentTarget.id);
                        gameFieldArray[playerRed.positionX][playerRed.positionY] = "red";
                        if (checkGameFieldForVictory(gameFieldArray, playerRed.positionX, playerRed.positionY)) {
                            victorieIWonYeeee();
                        }
                        changePayersTurn();

                    } else {
                        event.currentTarget.children[x].children[0].style.background = playerBlue.backgroundColor;
                        event.currentTarget.children[x].classList.add("active");
                        playerBlue.positionX = Number(event.currentTarget.children[x].id);
                        playerBlue.positionY = Number(event.currentTarget.id);
                        gameFieldArray[playerBlue.positionX][playerBlue.positionY] = "blue";
                        if (checkGameFieldForVictory(gameFieldArray, playerBlue.positionX, playerBlue.positionY)) {
                            victorieIWonYeeee();
                        }
                        changePayersTurn();
                    }
                    break;
                }
            }
        });
    };

    function checkGameFieldForVictory(arr, x, y) {
        var horizontal = checkHorizontal(arr, x, y);
        var vertical = checkDown(arr, x, y);
        var leftTopToRightBottom = diagonalLeftTopToBottomRight(arr, x, y);
        var leftBottomToRightTop = diagonalLeftBottomToTopRight(arr, x, y);
        return (
            horizontal.length >= 4 ||
            vertical.length >= 4 ||
            leftTopToRightBottom.length >= 4 ||
            leftBottomToRightTop.length >= 4
        );
    };

    function changePayersTurn() {
        if (playerRed.isActive) {
            turnColor[1].classList.remove('playing-blue');
            turnColor[0].classList.add('playing-red');
            playerRed.isActive = false;
            playerBlue.isActive = true;

        } else {
            turnColor[0].classList.remove('playing-red');
            turnColor[1].classList.add('playing-blue');
            playerBlue.isActive = false;
            playerRed.isActive = true;
        }
    }

    function checkDown(arr, x, y) {
        var vertical = [];
        vertical.push([x, y])
        while (x < 5) {
            if (arr[x][y] === arr[x + 1][y]) {
                vertical.push([x + 1, y])
            } else {
                break;
            }
            x++
        }
        return vertical;
    };

    function checkHorizontal(arr, x, y) {
        var toTheRight = right(arr, x, y);
        var toTheFeft = left(arr, x, y);

        var horizontal = toTheRight.concat(toTheFeft)
        horizontal.unshift([x, y])
        return horizontal;
    };

    function right(arr, x, y) {
        var right = [];
        while (y < 6) {
            if (arr[x][y] === arr[x][y + 1]) {
                right.push([x, y + 1])
            } else {
                break;
            }
            y++
        }
        return right;
    };

    function left(arr, x, y) {
        var left = [];
        while (y > 0) {
            if (arr[x][y] === arr[x][y - 1]) {
                left.push([x, y - 1])
            } else {
                break;
            }
            y--
        }
        return left;
    };

    function diagonalLeftBottomToTopRight(arr, x, y) {
        var rightTop = diagonalRightTop(arr, x, y);
        var leftBottom = diagonalLeftBottom(arr, x, y);
        var leftBottomToTopRight = rightTop.concat(leftBottom);
        leftBottomToTopRight.unshift([x, y]);

        return leftBottomToTopRight;
    };

    function diagonalLeftBottom(arr, x, y) {
        var leftBottom = [];
        while (x < 5 && y > 0) {
            if (arr[x][y] === arr[x + 1][y - 1]) {
                leftBottom.push([x + 1, y - 1]);
            } else {
                break;
            }
            y--;
            x++;
        }
        return leftBottom;
    };

    function diagonalRightTop(arr, x, y) {
        var rightTop = [];
        while (x > 0 && y < 6) {
            if (arr[x][y] === arr[x - 1][y + 1]) {
                rightTop.push([x - 1, y + 1]);
            } else {
                break;
            }
            y++;
            x--;
        }
        return rightTop;
    };

    function diagonalLeftTopToBottomRight(arr, x, y) {
        var leftTop = diagonalLeftTop(arr, x, y);
        var rightBottom = diagonalRightBottom(arr, x, y);
        var leftTopToBottomRight = leftTop.concat(rightBottom);
        leftTopToBottomRight.unshift([x, y])
        return leftTopToBottomRight;
    };

    function diagonalLeftTop(arr, x, y) {
        var leftTop = [];
        while (x > 0 && y > 0) {
            if (arr[x][y] === arr[x - 1][y - 1]) {
                leftTop.push([x - 1, y - 1]);
            } else {
                break;
            }
            x--;
            y--;
        }
        return leftTop;
    };

    function diagonalRightBottom(arr, x, y) {
        var rightBottom = [];

        while (x < 5 && y < 6) {
            if (arr[x][y] === arr[x + 1][y + 1]) {
                rightBottom.push([x + 1, y + 1]);
            } else {
                break;
            }
            x++;
            y++;
        }
        return rightBottom;
    };

    function victorieIWonYeeee() {
        victory.dataset.victoryDisplay = "true";
        victory.children[0].classList.remove("red", "blue");
        var winner = document.querySelector(".winner");
        if (playerRed.isActive) {
            victory.children[0].classList.add("red");
            winner.innerHTML = `Congratulations ${playerRed.name} you Won.!`;
            winner.style.color = playerRed.textColor;
            playerRed.wins += 1;
            wins[0].innerHTML = playerRed.wins;
        } else {
            victory.children[0].classList.add("blue");
            winner.innerHTML = `Congratulations ${playerBlue.name} you Won.!`;
            winner.style.color = playerBlue.textColor;
            playerBlue.wins += 1;
            wins[2].innerHTML = playerBlue.wins;
        }
    };

    function resetGameFiled() {
        for (var i = 0; i < gameField.length; i++) {
            for (var j = 0; j < gameField[i].children.length; j++) {
                gameField[i].children[j].children[0].style.background = "";
                gameField[i].children[j].classList.remove("active");
            }
        }
        victory.dataset.victoryDisplay = "false";
        resetGameFieldArray();
    };

    function resetGameFieldArray() {
        for (var i = 0; i < gameFieldArray.length; i++) {
            for (var j = 0; j < gameFieldArray[i].length; j++) {
                gameFieldArray[i][j] = "";
            }
        }
    };

    function resetToStartNewGame() {
        setPlayers.dataset.sectionDisplay = "true"
        victory.children[0].classList.remove("red", "blue");
        wins[0].innerHTML = 0;
        wins[2].innerHTML = 0;
        playersName[0].value = "";
        playersName[1].value = "";
        turnColor[0].classList.remove("playing-red");
        turnColor[1].classList.remove("playing-blue");
        setPlayerName[0].innerHTML = "Red Player"
        setPlayerName[1].innerHTML = "Blue Player"
        victory.dataset.victoryDisplay = "false";
        resetGameFiled();
    }


});