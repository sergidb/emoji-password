const MS_TIMEOUT = 1000;
const users = {
    "Emily": {
        name: "Emily",
        password: "🐶🐼🐸",
    },
    "Hannah": {
        name: "Hannah",
        password: "🐵🐷🐶",
    },
    "Olivia": {
        name: "Olivia",
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
    // Get all elements with the class ".emoji-keyboard-item"
    var emojiKeyboardItems = document.querySelectorAll(".emoji-keyboard-item");

    // Add an event listener to each element
    emojiKeyboardItems.forEach(function (item) {
        // When the element is clicked, call the handleEmojiKeyboardItemClick function
        // and pass it the inner HTML of the element as a parameter
        item.addEventListener("click", function () {
            handleEmojiKeyboardItemClick(item.innerHTML);
        });
    });
}

function addUserControlEventHandlers() {
    // Get all elements with the class ".user-control"
    var userControls = document.querySelectorAll(".user-control");

    // Add an event listener to each element
    userControls.forEach(function (control) {
        // When the element is clicked, call the handleUserControlClick function
        // and pass it the inner HTML of the child element with the class ".user-name" as a parameter
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
    // Hide #password and show #users
    document.querySelector("#password").classList.add('collapsed');
    document.querySelector("#content").classList.add('collapsed');
    document.querySelector("#users").classList.remove('collapsed');
}

function showPassword() {


    // Hide #content and show #password
    document.querySelector("#content").classList.add('collapsed');
    document.querySelector("#users").classList.add('collapsed');
    document.querySelector("#password").classList.remove('collapsed');
}

function showContent() {
    // Hide #password and show #content
    document.querySelector("#password").classList.add('collapsed');
    document.querySelector("#users").classList.add('collapsed');
    document.querySelector("#content").classList.remove('collapsed');

    // Substitute the user name in the content
    document.querySelector("#username").innerHTML = selectedUser;
}