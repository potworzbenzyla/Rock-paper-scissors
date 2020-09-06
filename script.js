let pointsLimit = 'NaN';
let gameMode;
let firstPlayerScore;
let secondPlayerScore;
let firstPlayerName;
let secondPlayerName;
let firstPlayerSelection;
let secondPlayerSelection;

window.onload = function settingEventListeners(){
    document.getElementById('paper').addEventListener('click', function(){playRound('paper')});
    document.getElementById('rock').addEventListener('click', function(){playRound('rock')});
    document.getElementById('scissors').addEventListener('click', function(){playRound('scissors')});
    document.getElementById('gameModeSingleplayer').addEventListener('click', function(){setGameMode("singleplayer")});
    document.getElementById('gameModeMultiplayer').addEventListener('click', function(){setGameMode("multiplayer")});
}

// informations about selections in last round and score.

function lastRoundInfo(roundWinner, firstPlayerSelection, secondPlayerSelection){
    var notification = document.createElement('div');
    notification.className = 'selectionHistoryAlert';
    if(roundWinner === 'draw'){
        notification.style.backgroundColor = 'rgb(110,110,110)';
        notification.innerHTML =  'Both players choosed ' + firstPlayerSelection + ', round tied.';
        if(gameMode === 'singleplayer'){
            document.getElementById('mainTextOutput').innerHTML = 'Draw';
        }
    }
    else{
        var notification = document.createElement('div');
        notification.className = 'selectionHistoryAlert';
        notification.innerHTML =  firstPlayerName + ' choosed ' + firstPlayerSelection + ', ' + secondPlayerName +' choosed ' + secondPlayerSelection + ', ' + roundWinner + ' won!';
        if(gameMode === 'singleplayer'){
            document.getElementById('mainTextOutput').innerHTML = roundWinner + ' won';
        }
        if(roundWinner === firstPlayerName){
            document.getElementById('firstPlayerScore').innerHTML = firstPlayerScore;
            notification.style.backgroundColor = 'rgb(0,255,0)';
        }
        else{
            document.getElementById('secondPlayerScore').innerHTML = secondPlayerScore;
            notification.style.backgroundColor = 'rgb(0,0,255)';
        }
    }
    document.getElementById('textOutput').appendChild(notification);
}

function newGame(){
    var notification = document.createElement('div');
    notification.style.backgroundColor = 'rgb(255,0,0)';
    notification.style.width = '100%';
    notification.innerHTML = 'Select gamemode.';
    document.getElementById('textOutput').appendChild(notification);
    document.getElementById('gameModeSelection').style.display = 'block';
}

// setting gamemode, nicknames and points need to win.

function setGameMode(mode){
    firstPlayerScore = 0;
    secondPlayerScore = 0;
    gameMode = mode;

    document.getElementById('firstPlayerScore').innerHTML = firstPlayerScore;
    document.getElementById('secondPlayerScore').innerHTML = secondPlayerScore;
    document.getElementById("textOutput").querySelectorAll('*').forEach(n => n.remove());;
    document.getElementById('gameModeSelection').style.display = 'none';

    do
        pointsLimit = prompt('Up to how many points do you want to play?');
    while(isNaN(pointsLimit)
    || pointsLimit < 1
    || pointsLimit == null
    );

    if(mode === 'singleplayer'){
        do
            firstPlayerName = prompt('Whats your name? (10 characters max)');
        while(
            firstPlayerName.length > 10
            || firstPlayerName.length == 0
        );
        secondPlayerName = 'Computer';
        document.getElementById('mainTextOutput').innerHTML = 'Good luck!';
    }
    else if(mode === 'multiplayer'){
        gameMode = 'multiplayer';
        do
            firstPlayerName = prompt('Whats first player name? (10 characters max)');
        while(
            firstPlayerName.length > 10
            || firstPlayerName == null
        );

        do
            secondPlayerName = prompt('Whats second player name? (10 characters max)');
        while(secondPlayerName.length > 10
            || secondPlayerName == null
            ||firstPlayerName === secondPlayerName
        );
        document.getElementById('mainTextOutput').innerHTML = firstPlayerName + ' try.';
    }
    document.getElementById('firstPlayerName').innerHTML = firstPlayerName;
    document.getElementById('secondPlayerName').innerHTML = secondPlayerName;
}

function computerSelection(secondPlayerSelection){
    var selectionOptions = ['rock','paper','scissors'];
    return selectionOptions[Math.floor(Math.random() * selectionOptions.length)];
}


//Round settlement.

function whoWon(firstPlayerSelection, secondPlayerSelection){
    if(firstPlayerSelection === secondPlayerSelection){
        lastRoundInfo('draw', firstPlayerSelection, secondPlayerSelection);
    }
    else if(
        secondPlayerSelection == 'rock' && firstPlayerSelection == 'scissors'
        ||secondPlayerSelection == 'scissors' && firstPlayerSelection == 'paper'
        ||secondPlayerSelection == 'paper' && firstPlayerSelection == 'rock'
    ){
        secondPlayerScore++;
        lastRoundInfo(secondPlayerName, firstPlayerSelection, secondPlayerSelection);
        }
    else{
        firstPlayerScore++;
        lastRoundInfo(firstPlayerName, firstPlayerSelection, secondPlayerSelection);
    }
    if(
        firstPlayerScore == pointsLimit
        || secondPlayerScore == pointsLimit
    ){
        newGame();
    }
}

let i = 0;

function playRound(selection){
    if(gameMode == undefined){
        var selectGamemode = document.createElement('div');
        selectGamemode.style.backgroundColor = 'red';
        selectGamemode.style.width = '100%';
        selectGamemode.innerHTML = 'Select gamemode.';
        document.getElementById('textOutput').appendChild(selectGamemode);
    }
    else{
        if(
            firstPlayerScore == pointsLimit
            || secondPlayerScore == pointsLimit)
            {
            document.getElementById('mainTextOutput').innerHTML = 'Try again!';
        }
        else{
            if(gameMode === 'singleplayer'){
                firstPlayerSelection = selection;
                secondPlayerSelection = computerSelection();
                whoWon(firstPlayerSelection, secondPlayerSelection);
            }
            else if(gameMode === 'multiplayer'){
                if(i == 1){
                    document.getElementById('mainTextOutput').innerHTML = firstPlayerName + ' try.';
                    secondPlayerSelection = selection;
                    whoWon(firstPlayerSelection, secondPlayerSelection);
                    i--;
                }
                else if (i == 0){
                    document.getElementById('mainTextOutput').innerHTML = secondPlayerName + ' try.';
                    firstPlayerSelection = selection;
                    i++;
                }
            }
        }
    }
}