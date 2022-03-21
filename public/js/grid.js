function createTable(levelChoice) {
    let level, size, fontSize, nbMine;
    switch (levelChoice) {
        case 'Easy':
            level = 10;
            size = 50;
            fontSize = 30;
            nbMine = 10;
            break;
        case 'Medium':
            level = 20;
            size = 35;
            fontSize = 20;
            nbMine = 50;
            break;
        case 'Hard':
            level = 30;
            size = 25;
            fontSize = 15;
            nbMine = 100;
            break;
        default:
            level = 10;
            size = 50;
            fontSize = 30;
            nbMine = 10;
            break;
    }

    let body = document.querySelector('body');
    let backButton = document.createElement('button');
    let gameDiv = document.createElement('div');
    gameDiv.id = 'game';
    backButton.id = 'back';
    backButton.innerHTML = 'Back to levels';
    backButton.style.margin = '10px';
    gameDiv.appendChild(backButton);
    body.appendChild(gameDiv);
    bindButtonBack()
    let table = document.createElement('table');
    table.setAttribute('cellpadding', '0');
    table.setAttribute('cellspacing', '0');
    table.id = 'table';
    table.style.margin = 'auto';
    table.className = level;
    gameDiv.appendChild(table);

    for (let i = 0; i < level; i++) {
        let tr = document.createElement('tr');
        table.appendChild(tr);
        for (let j = 0; j < level; j++) {
            let td = document.createElement('td');
            let button = document.createElement('button');
            button.className = 'case';
            button.id = 'x' + j + 'y' + i;
            td.appendChild(button);
            tr.appendChild(td);
        }
    }

    let button = document.querySelectorAll('.case');
    button.forEach(function (button) {
        button.style.width = size + 'px';
        button.style.height = size + 'px';
        button.style.fontSize = fontSize + 'px';
        button.style.border = '0.5px solid black';
        button.style.backgroundColor = 'grey';
        button.style.textAlign = 'center';
        button.style.verticalAlign = 'middle';
    });
    addCSSBackButton(backButton);
    dellRightClick();
    bindButton();
    createMine(nbMine);
}

function bindButton() {
    let button = document.querySelectorAll('.case');
    button.forEach(function (button) {
        button.addEventListener('contextmenu', function (e) {
            e.preventDefault();
                if(button.classList.contains('flag') == false){
                    if(button.classList.contains('discovered') == false){
                        button.style.backgroundColor = 'grey';
                        button.classList.add('flag');
                        button.innerHTML = flag;
                    }
                }else{
                    button.classList.remove('flag');
                    button.innerHTML = "";
                }
        });

        button.addEventListener('click', function (e) {
            e.preventDefault();
            
            if(button.classList.contains('flag') == false){
                button.style.backgroundColor = 'lightgrey';
                nbMineAround(button);
                if(button.classList.contains('mine')){
                    button.classList.add('discovered');
                    button.innerHTML = mine;
                    gameOver();
                }else{
                    winGame();
                }
            }
        });
    });
}

function createMine(nbMine){
    let nbLine = 0;
    let line = document.querySelectorAll('tr');
    line.forEach(function () {
        nbLine++;
    });

    let nbMineByLine = nbMine/nbLine;
    let nbColumn = 0;
    let column = line[0].querySelectorAll('td');
    column.forEach(function () {
        nbColumn++;
    });

    let nbMineByCase = nbMineByLine/nbColumn;
    let caseButton = document.querySelectorAll('.case');
    let nbMineTable = 0;
    caseButton.forEach(function (button) {
        let random = Math.random();
        if(nbMineTable < nbMine){
            if (random <= nbMineByCase) {
                nbMineTable++;
                button.classList.add('mine');
            }
        }
    });

    while(nbMineTable < nbMine){
        let randomLine = Math.floor(Math.random()*nbLine);
        let randomColumn = Math.floor(Math.random()*nbColumn);
        let button = document.querySelector('#x'+randomColumn + 'y'+randomLine);
        if(button.innerHTML != mine){
            button.classList.add('mine');
            nbMineTable++;
        }
    }
}

function nbMineAround(button){
    if(button.classList.contains('mine')){
        button.innerHTML = mine;
        button.style.backgroundColor = 'lightgrey';
    }else{
            
        let x, y = button.id;
        x = parseInt(y.match(/\d+/g)[0]);
        y = parseInt(y.match(/\d+/g)[1]);

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

        if(button.classList.contains('mine') == false){
            button.classList.add('discovered');
            button.style.backgroundColor = 'lightgrey';
        }

        if(y>0){
            if(buttonTop.classList.contains('mine')) nbMine++;
            if(x>0){
                if(buttonTopLeft.classList.contains('mine')) nbMine++;
            }
            if(x!=level-1){
                if(buttonTopRight.classList.contains('mine')) nbMine++;
            }
        }
        if(y!=level-1){
            if(buttonBottom.classList.contains('mine')) nbMine++;
            if(x>0){
                if(buttonBottomLeft.classList.contains('mine')) nbMine++;
            }
            if(x!=level-1){
                if(buttonBottomRight.classList.contains('mine')) nbMine++;
            }
        }
        if(x>0){
            if(buttonLeft.classList.contains('mine')) nbMine++; 
        }
        if(x!=level-1){
            if(buttonRight.classList.contains('mine')) nbMine++;
        }
        
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
}