function dellRightClick() {
    let table = document.querySelectorAll('#table');
    table.forEach(function (table) {
        table.addEventListener('contextmenu', function (e) {
            e.preventDefault();
        });
    });
}

function unactivateButton(){
    let button = document.querySelectorAll('.case');
    button.forEach(function (button) {
        button.disabled = true;
    });
}

function bindButtonBack() {
    let backButton = document.querySelector('#back');
    backButton.addEventListener('click', function () {
        let gameDiv = document.querySelector('#game');
        gameDiv.remove();
        createMenu();
    });
}

function addMessage(message){
    let messageDiv = document.createElement('p');
    messageDiv.innerHTML = message;
    let gameDiv = document.querySelector('#game');
    messageDiv.style.fontSize = '20px';
    gameDiv.appendChild(messageDiv);

}

function winGame(){
    let discovered = document.querySelectorAll('.discovered').length;
    let level = document.querySelector('#table').className;
    let nbMine = document.querySelectorAll('.mine').length;
    if(discovered == (level*level)-nbMine){
        addMessage("You win !");
        unactivateButton();
    }
}

function gameOver(){
    unactivateButton();
    addMessage("Game Over !");
}