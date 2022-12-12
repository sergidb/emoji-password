const MS_TIMEOUT = 1000;
const users = {
    "Emily": {
        password: "🐶🐼🐸",
    },
    "Hannah": {
        password: "🐵🐷🐶",
    },
    "Olivia": {
        password: "🐱🐧🐔",
    }
}

let selectedUser = "";
let selectedPassword = "";
let emojisEntered = 0;

window.onload = e => { addEventHandlers(); }

function addEventHandlers() {
    addEmojiKeyboardEventHandlers();
    addUserControlEventHandlers();
}

function addEmojiKeyboardEventHandlers() {

    var emojiKeyboardItems = document.querySelectorAll(".emoji-keyboard-item");

    emojiKeyboardItems.forEach(function (item) {
        item.addEventListener("click", function () {
            handleEmojiKeyboardItemClick(item.innerHTML);
        });
    });
}

function addUserControlEventHandlers() {

    var userControls = document.querySelectorAll(".user-control");

    userControls.forEach(function (control) {
        control.addEventListener("click", function () {
            var userName = control.querySelector(".user-name").innerHTML;
            handleUserControlClick(userName);
        });
    });
}

function handleEmojiKeyboardItemClick(emoji) {

    selectedPassword += emoji;
    emojisEntered++;

    if (emojisEntered == 3) {
        if (selectedPassword == users[selectedUser].password) {
            onPasswordChallengeSuccess();
        } else {
            onPasswordChallengeFailure();
        }
    }
}

function handleUserControlClick(userName) {
    selectedUser = userName;
    emojisEntered = 0;
    selectedPassword = "";

    showPassword();
}

function onPasswordChallengeSuccess() {

    const el = document.querySelector("#password-message");
    el.innerHTML = "SUCCESS";
    el.classList.remove('collapsed');

    setTimeout(() => {
        el.classList.add('collapsed');
        showContent();
    }, MS_TIMEOUT);
}

function onPasswordChallengeFailure() {
    
    const el = document.querySelector("#password-message");
    el.innerHTML = "FAIL";
    el.classList.remove('collapsed');

    setTimeout(() => {
        el.classList.add('collapsed');
        showUsers();
    }, MS_TIMEOUT);
}

function showUsers() {
    document.querySelector("#password").classList.add('collapsed');
    document.querySelector("#content").classList.add('collapsed');
    document.querySelector("#users").classList.remove('collapsed');
}

function showPassword() {
    document.querySelector("#content").classList.add('collapsed');
    document.querySelector("#users").classList.add('collapsed');
    document.querySelector("#password").classList.remove('collapsed');
}

function showContent() {
    document.querySelector("#password").classList.add('collapsed');
    document.querySelector("#users").classList.add('collapsed');
    document.querySelector("#content").classList.remove('collapsed');

    document.querySelector("#username").innerHTML = selectedUser;
}