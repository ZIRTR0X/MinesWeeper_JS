


function bindStartButton() {
    console.log("bindStartButton start");
    let startButton = document.querySelector('#start');
    console.log(startButton);
    startButton.addEventListener('click', function () {
        console.log('click');
        let levelChoice = document.querySelector('#answer').textContent;
        let menu = document.querySelector('#menu');
        menu.remove();
        // startGame(levelChoice);
        createTable(levelChoice);
    });
};


function bindLevelButtons() {
    let buttonLevel = document.querySelectorAll('.level');
    console.log(buttonLevel);
    buttonLevel.forEach(function (button) {
        button.addEventListener('click', function () {
            console.log('click');
            let levelChoice = button.textContent;
            let answer = document.querySelector('#answer');
            answer.textContent = levelChoice;
        });
    });
}
function createMenu() {
    let body = document.querySelector('body');
    let menu = document.createElement('div');
    menu.id = 'menu';
    let levelEasyButton = document.createElement('button');
    levelEasyButton.innerHTML = 'Easy';
    levelEasyButton.className = 'level';
    let levelMediumButton = document.createElement('button');
    levelMediumButton.innerHTML = 'Medium';
    levelMediumButton.className = 'level';
    let levelHardButton = document.createElement('button');
    levelHardButton.innerHTML = 'Hard';
    levelHardButton.className = 'level';
    let startButton = document.createElement('button');
    startButton.innerHTML = 'Start';
    startButton.id = 'start';
    let answer = document.createElement('p');
    answer.id = 'answer';
    let choices = document.createElement('p');
    choices.id = 'choices';
    choices.innerHTML = 'Choose a level :';

    menu.appendChild(choices);
    menu.appendChild(levelEasyButton);
    menu.appendChild(levelMediumButton);
    menu.appendChild(levelHardButton);
    menu.appendChild(answer);
    menu.appendChild(startButton);
    body.appendChild(menu);
    bindLevelButtons();
    bindStartButton();
}
function dellRightClick() {
    let table = document.querySelectorAll('#table');
    table.forEach(function (table) {
        table.addEventListener('contextmenu', function (e) {
            e.preventDefault();
        });
    });
}

function bindButtonBack() {
    let backButton = document.querySelector('#back');
    backButton.addEventListener('click', function () {
        console.log("hi");
        let gameDiv = document.querySelector('#game');
        gameDiv.remove();
        createMenu();
    });
}

function nbMineAround(button){
    button.style.backgroundColor = 'lightgrey';
    let x, y = button.id;
    x = parseInt(y.match(/\d+/g)[0]);
    y = parseInt(y.match(/\d+/g)[1]);

    console.log('x : '+x,' y : '+y);
    let buttonTop = document.querySelector('#x' + x + 'y' + (parseInt(y) - 1));
    let buttonBottom = document.querySelector('#x' + x + 'y' + (parseInt(y) + 1));
    let buttonLeft = document.querySelector('#x' + (parseInt(x) - 1) + 'y' + y);
    let buttonRight = document.querySelector('#x' + (parseInt(x) + 1) + 'y' + y);
    let buttonTopLeft = document.querySelector('#x' + (parseInt(x) - 1) + 'y' + (parseInt(y) - 1));
    let buttonTopRight = document.querySelector('#x' + (parseInt(x) + 1) + 'y' + (parseInt(y) - 1));
    let buttonBottomLeft = document.querySelector('#x' + (parseInt(x) - 1) + 'y' + (parseInt(y) + 1));
    let buttonBottomRight = document.querySelector('#x' + (parseInt(x) + 1) + 'y' + (parseInt(y) + 1));
    let nbMine = 0;
    let level = document.querySelector('#table').className;
    console.log("level : " + level);

    if(button.classList.contains('mine') == false){
        button.classList.add('discovered');
    }

    if(y>0){
        //buton top
        if(buttonTop.classList.contains('mine')){
            nbMine++;
        }
        if(x>0){
            //button top left
            if(buttonTopLeft.classList.contains('mine')){
                nbMine++;
            }
        }
        if(x!=level-1){
            //button top right
            if(buttonTopRight.classList.contains('mine')){
                nbMine++;
            }
        }
    }
    if(y!=level-1){
        //button bottom
        if(buttonBottom.classList.contains('mine')){
            nbMine++;
        }
        if(x>0){
            //button bottom left
            if(buttonBottomLeft.classList.contains('mine')){
                nbMine++;
            }
        }
        if(x!=level-1){
            //button bottom right
            if(buttonBottomRight.classList.contains('mine')){
                nbMine++;
            }
        }
    }
    if(x>0){
        //button left
        if(buttonLeft.classList.contains('mine')){
            nbMine++;
        }
    }
    if(x!=level-1){
        //button right
        if(buttonRight.classList.contains('mine')){
            nbMine++;
        }
    }

    console.log("nb Mine autour "+nbMine);
    button.innerHTML = nbMine;
    if(nbMine == 0){
        if(buttonTop!=null && buttonTop.classList.contains('discovered') == false && y>0) nbMineAround(buttonTop);
        if(buttonBottom!=null && buttonBottom.classList.contains('discovered') == false && y<level-1) nbMineAround(buttonBottom);
        if(buttonLeft!=null && buttonLeft.classList.contains('discovered') == false && x>0) nbMineAround(buttonLeft);
        if(buttonRight!=null && buttonRight.classList.contains('discovered') == false && x<level-1) nbMineAround(buttonRight);
        if(buttonTopLeft!=null && buttonTopLeft.classList.contains('discovered') == false && y>0 && x>0) nbMineAround(buttonTopLeft);
        if(buttonTopRight!=null && buttonTopRight.classList.contains('discovered') == false && y>0 && x<level-1) nbMineAround(buttonTopRight);
        if(buttonBottomLeft!=null && buttonBottomLeft.classList.contains('discovered') == false && y<level-1 && x>0) nbMineAround(buttonBottomLeft);
        if(buttonBottomRight!=null && buttonBottomRight.classList.contains('discovered') == false && y<level-1 && x<level-1) nbMineAround(buttonBottomRight);

    }
}

function createTable(levelChoice) {
    let level;
    let size;
    let fontSize;
    let nbMine;
    if(levelChoice === "Easy"){
        level = 10;
        size = 50;
        fontSize = 30;
        nbMine = 10;
    }else if(levelChoice === "Medium") {
        level = 20;
        size = 35;
        fontSize = 20;
        nbMine = 50;
    }else if(levelChoice === "Hard") {
        level = 30;
        size = 25;
        fontSize = 15;
        nbMine = 100;
    }
    //creer interface
    let body = document.querySelector('body');
    let backButton = document.createElement('button');
    let gameDiv = document.createElement('div');
    gameDiv.id = 'game';
    backButton.id = 'back';
    backButton.innerHTML = 'Back';
    gameDiv.appendChild(backButton);
    body.appendChild(gameDiv);
    bindButtonBack()
    //creer tableau de x lignes et y colonnes
    let table = document.createElement('table');
    table.setAttribute('cellpadding', '0');
    table.setAttribute('cellspacing', '0');
    table.id = 'table';
    table.className = level;
    gameDiv.appendChild(table);
    //creer les lignes
    for (let i = 0; i < level; i++) {
        let tr = document.createElement('tr');
        table.appendChild(tr);
        //creer les colonnes
        for (let j = 0; j < level; j++) {
            let td = document.createElement('td');
            let button = document.createElement('button');
            button.className = 'case';
            //ajouter x et y dans l'id
            button.id = 'x' + j + 'y' + i;
            td.appendChild(button);
            tr.appendChild(td);
        }
    }
    //ajouter css au case
    let button = document.querySelectorAll('.case');
    button.forEach(function (button) {
        button.style.width = size + 'px';
        button.style.height = size + 'px';
        button.style.fontSize = fontSize + 'px';
        button.style.border = '0.5px solid black';
        button.style.backgroundColor = 'grey';
    });
    dellRightClick();
    bindButton();
    console.log(nbMine);
    createMine(nbMine);
}

function bindButton() {
    console.log("bindButton start");
    let button = document.querySelectorAll('.case');
    console.log(button);
    button.forEach(function (button) {
        button.addEventListener('contextmenu', function (e) {
            e.preventDefault();
            button.style.backgroundColor = 'grey';
            button.innerHTML = flag;
        });
        button.addEventListener('click', function (e) {
            e.preventDefault();
            button.style.backgroundColor = 'lightgrey';
            if(button.classList.contains('mine')){
                button.style.backgroundColor = 'red';
                button.innerHTML = mine;
            }else{
                let nbMineArd = nbMineAround(button);
            }
        });
        button.addEventListener('mousedown', function (e) {
            e.preventDefault();
            button.style.backgroundColor = 'grey';
            button.innerHTML = "";
        });
    });
}

function createMine(nbMine){
    console.log(nbMine);
    let nbLine = 0;
    let line = document.querySelectorAll('tr');
    line.forEach(function () {
        nbLine++;
    });
    console.log("Nb Line : " + nbLine);
    let nbMineByLine = nbMine/nbLine;
    console.log("% de mine par ligne : " + nbMineByLine);

    //nombre de colonne
    let nbColumn = 0;
    let column = line[0].querySelectorAll('td');
    column.forEach(function () {
        nbColumn++;
    });
    console.log("Nb Colonne : " + (nbColumn+1));

    //pourcentage de mine pour chaque case
    let nbMineByCase = nbMineByLine/nbColumn;
    console.log("% de mine par case : " + nbMineByCase);

    //selectionner toute les cases
    let caseButton = document.querySelectorAll('.case');
    //pour chaque case
    let nbMineTable = 0;
    caseButton.forEach(function (button) {
        //pour chaque ligne
        let random = Math.random();
        console.log(random);
        if(nbMineTable < nbMine){
            if (random <= nbMineByCase) {
                console.log("mine");
                nbMineTable++;
                // button.innerHTML = mine;
                button.classList.add('mine');
            }
        }
        
    });
    console.log("Nb Mine : " + nbMineTable);

    while(nbMineTable < nbMine){
        //case random
        let randomLine = Math.floor(Math.random()*nbLine);
        let randomColumn = Math.floor(Math.random()*nbColumn);
        //chercher le button avec comme id la ligne et colonne
        let button = document.querySelector('#x'+randomColumn + 'y'+randomLine);
        if(button.innerHTML != mine){
            // button.innerHTML = mine;
            button.classList.add('mine');
            nbMineTable++;
        }
    }
    console.log("Nb Mine : " + nbMineTable);

}

createMenu();

