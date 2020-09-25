const msgElement = document.getElementById("msg");
const randomNumber = getRandomNumber();

window.SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

let recognition = new window.SpeechRecognition();

// Start recognition and game
recognition.start();

function onSpeak(e) {
  const msg = e.results[0][0].transcript;

  writeMessage(msg);
  checkNumber(msg);
}

// Write what user speaks
function writeMessage(msg) {
  msgElement.innerHTML = `
    <div>You said: </div>
    <span class="box">${msg}</span>
  `;
}

function checkNumber(msg) {
  const num = +msg;

  if (Number.isNaN(num))
    msgElement.innerHTML += "<div>That is not a valid number...</div>";
  if (num > 100 || num < 1)
    msgElement.innerHTML += "<div>Number must be between 1 and 100</div>";
  if (num === randomNumber) {
    document.body.innerHTML = `
      <h2>Congrats! You have guessed the number
      <br><br>It was ${num}</h2>
      <button class="play-again" id="play-again">Play Again</button>`;
  } else if (num > randomNumber) {
    msgElement.innerHTML += "<div>GO LOWER</div>";
  } else if (num < randomNumber) {
    msgElement.innerHTML += "<div>GO HIGHER</div>";
  }
}

// Generate random number
function getRandomNumber() {
  return Math.ceil(Math.random() * 100);
}

// Speak result
recognition.addEventListener("result", onSpeak);

// End SpeechRecognition service
recognition.addEventListener("end", () => recognition.start());

document.body.addEventListener("click", (e) => {
  if (e.target.id === "play-again") {
    window.location.reload();
  }
});
