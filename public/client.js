const socket = io();
let namee;
let textarea = document.querySelector('#textarea');
let messageArea = document.querySelector('.message_area');
let sendBtn = document.querySelector('#sendBtn');
let Jmessage = document.querySelector('.Jmessage');
let joinedPerson = document.querySelector('.joinedPerson');

do {
    namee = prompt('Entre your name');
    joinedPerson.innerText = `${namee} Joined`;
    socket.emit('new-user-joined', namee);
} while (!namee);

textarea.addEventListener('keyup', send);
function send(e) { if (e.key == 'Enter') { sendMessage(e.target.value); } }

function sendMessage(message) {
    let msg = {
        user: namee,
        message: message.trim(),
    }

    // msg Append
    appendMessage(msg, 'outgoing')
    textarea.value = "";

    // Send to server
    socket.emit('message', msg)
}

function appendMessage(msg, type) {
    let mainDiv = document.createElement('div');
    let className = type;
    mainDiv.classList.add(className, 'message');
    let markUp = `
    <h4>${msg.user}</h4>
    <p>${msg.message}</p>
    `
    mainDiv.innerHTML = markUp;
    messageArea.appendChild(mainDiv);
}

// receive msg 
socket.on('message', (msg) => {
    appendMessage(msg, 'incoming')
})

sendBtn.addEventListener('click', () => {
    sendMessage(textarea.value)
})

// var typed = new Typed('.typing', {
//     strings: [`${namee} typing...`],
//     typeSpeed: 40,
// });