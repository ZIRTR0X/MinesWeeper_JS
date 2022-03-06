
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
}

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
function dellRightClick() {
    let table = document.querySelectorAll('#table');
    table.forEach(function (table) {
        table.addEventListener('contextmenu', function (e) {
            e.preventDefault();
        });
    });
}

function createTable(levelChoice) {
    let level;
    if(levelChoice === "Easy") level = 10;
    if(levelChoice === "Medium") level = 20;
    if(levelChoice === "Hard") level = 30;
    //creer tableau de x lignes et y colonnes
    let table = document.createElement('table');
    table.id = 'table';
    let body = document.querySelector('body');
    body.appendChild(table);
    //creer les lignes
    for (let i = 0; i < level; i++) {
        let tr = document.createElement('tr');
        let button = document.createElement('button');
        button.className = 'case';
        button.innerHTML = "ㅤ";
        tr.appendChild(button);
        table.appendChild(tr);
        //creer les colonnes
        for (let j = 0; j < level-1; j++) {
            let td = document.createElement('td');
            let button = document.createElement('button');
            button.className = 'case';
            button.innerHTML = "ㅤ";
            td.appendChild(button);
            tr.appendChild(td);
        }
    }
    dellRightClick();
    bindButton();
}

function bindButton() {
    console.log("bindButton start");
    let button = document.querySelectorAll('.case');
    console.log(button);
    button.forEach(function (button) {
        button.addEventListener('contextmenu', function (e) {
            e.preventDefault();
            button.innerHTML = "F";
        });
        button.addEventListener('click', function (e) {
            e.preventDefault();
            button.innerHTML = "X";
        });
    });
    
}

createMenu();
bindLevelButtons();
bindStartButton();
