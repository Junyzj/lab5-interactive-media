
// CCT360 Lab 5 - Simple JavaScript interactions
const audio = document.getElementById("cityAudio");
const picture = document.getElementById("picture");
const buttons = document.querySelectorAll(".buttons button");
let currentScene = 0;

function changeScene(number, jumpAudio) {
  currentScene = number;
  let image = document.getElementById("sceneImage");
  let title = document.getElementById("sceneTitle");
  let text = document.getElementById("sceneText");

  if (number === 0) {
    image.src = "images/morning.png";
    image.alt = "Morning beside the Pearl River in Guangzhou";
    title.textContent = "Morning by the Pearl River";
    text.textContent = "Birds, footsteps, and a quiet riverside.";
  } else if (number === 1) {
    image.src = "images/street.png";
    image.alt = "A bus on a busy Guangzhou street";
    title.textContent = "Busy City Street";
    text.textContent = "Traffic and buses fill the afternoon.";
  } else {
    image.src = "images/evening.png";
    image.alt = "Rainy evening near the Pearl River";
    title.textContent = "Rainy Evening";
    text.textContent = "Rain falls over the city and the river.";
  }

  picture.classList.toggle("raining", number === 2);

  buttons.forEach(function (button, index) {
    button.classList.toggle("active", index === number);
  });

  // Each scene has 25 seconds of the audio.
  if (jumpAudio) {
    if (audio.readyState >= 1) {
      audio.currentTime = number * 25;
    } else {
      audio.addEventListener("loadedmetadata", function () {
        audio.currentTime = number * 25;
      }, { once: true });
    }
  }
}

// Change the picture automatically as the audio progresses.
audio.addEventListener("timeupdate", function () {
  let number = 0;
  if (audio.currentTime >= 50) {
    number = 2;
  } else if (audio.currentTime >= 25) {
    number = 1;
  }
  if (number !== currentScene) {
    changeScene(number, false);
  }
});
