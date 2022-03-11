function bindStartButton() {
    let startButton = document.querySelector('#start');
    startButton.addEventListener('click', function () {
        let levelChoice = document.querySelector('#answer').textContent;
        let menu = document.querySelector('#menu');
        menu.remove();
        createTable(levelChoice);
    });
};

function bindLevelButtons() {
    let buttonLevel = document.querySelectorAll('.level');
    buttonLevel.forEach(function (button) {
        button.addEventListener('click', function () {
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
    body.style.textAlign = 'center';
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