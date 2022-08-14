/*-----------------------------------Change language----------------------------------*/

const transcriptionObj = {
  en: {
    forest: "Forest",
    blackbird: "Blackbird",
    lark: "Lark",
    nightingale: "Nightingale",
    warbler: "Warbler",
    robin: "Robin",
  },
  ru: {
    forest: "Лес",
    blackbird: "Дрозд",
    lark: "Жаворонок",
    nightingale: "Соловей",
    warbler: "Славка",
    robin: "Зарянка",
  },
  it: {
    forest: "Foresta",
    blackbird: "Tordo",
    lark: "Allodola",
    nightingale: "Usignolo",
    warbler: "Sylvia",
    robin: "Pettirosso",
  },
};

const languageBtn = document.querySelectorAll(".language-btn");
const transcriptionText = document.querySelectorAll("[data-transcription]");
const languageDiv = document.querySelector(".language");
const linkImg = document.querySelectorAll(".nav-link-img");

languageDiv.addEventListener("click", changeLanguage);

function changeLanguage(event) {
  if (event.target.classList.contains("language-btn")) {
    console.log(event);
    for (let i = 0; i < languageBtn.length; i++) {
      languageBtn[i].classList.remove("current-language");
    }
    event.target.classList.add("current-language");

    let language = event.target.getAttribute("data-language");

    transcriptionText.forEach((item) => {
      let dataText =
        item.getAttribute(
          "data-transcription"
        ); /*получаем значение атрибута data у всех элементов для переводa */
      item.textContent = transcriptionObj[language][dataText];
    });
  }
}

/*----------------------------Audio Play-Stop--------------------------------------- */

const audio = document.querySelector("audio");
const audioBtn = document.querySelector(".audio-btn");
const curentDuration = document.querySelector(".current-duration");
const totalDuration = document.querySelector(".total-duration");

let isPlay = false;

function playAudio() {
  if (!isPlay) {
    audio.currentTime = 0;
    audio.play();
    audioBtn.classList.remove("play-btn");
    audioBtn.classList.add("stop-btn");
    isPlay = true;
  } else {
    audio.pause();
    isPlay = false;
    audioBtn.classList.remove("stop-btn");
    audioBtn.classList.add("play-btn");
  }
}

audioBtn.addEventListener("click", playAudio);

audio.addEventListener("ended", function () {
  playNext();
});

/*-------------------------------Prev-Next Buttons------------------------------------------- */

const next = document.querySelector(".next-btn");
const prev = document.querySelector(".prev-btn");
const screen = document.querySelector(".screen");
const navList = document.querySelector(".nav-list");
const navLink = document.querySelectorAll(".nav-link");
const durationRange = document.querySelector("#duration-range");
const volumeRange = document.querySelector("#volume-range");
const muteBtn = document.querySelector(".mute-btn");
let playNum = 0;

next.addEventListener("click", playNext);
prev.addEventListener("click", playPrev);

function playNext() {
  playNum++;
  for (let i = 0; i < navLink.length; i++) {
    if (playNum > navLink.length - 1) playNum = 0;
  }
  screen.style.backgroundImage = `url("assets/img/main-bg/${playNum + 1}.jpg")`;
  audio.src = `assets/audio/${playNum + 1}.mp3`;
  if (isPlay) {
    isPlay = true;
    audio.play();
  }
  for (let j = 0; j < linkImg.length; j++) {
    linkImg[j].classList.remove("current-track");
  }
  console.log("playNum after next:" + playNum);
  console.log(linkImg[playNum]);
  linkImg[playNum].classList.add("current-track");

  curentDuration.textContent = "00:00";
}

function playPrev() {
  playNum--;
  for (let i = 0; i < navLink.length; i++) {
    if (playNum < 0) playNum = navLink.length - 1;
  }
  screen.style.backgroundImage = `url("assets/img/main-bg/${playNum + 1}.jpg")`;
  audio.src = `assets/audio/${playNum + 1}.mp3`;
  if (isPlay) {
    audio.play();
  }

  console.log(playNum);
  for (let j = 0; j < linkImg.length; j++) {
    linkImg[j].classList.remove("current-track");
  }
  console.log("PlayNum after prev: " + playNum);
  console.log(linkImg[playNum]);
  linkImg[playNum].classList.add("current-track");

  curentDuration.textContent = "00:00";
}

/*-------------------------Change track with Menu image onclick--------------------------- */

navList.addEventListener("click", function changeImg(event) {
  if (
    event.target.classList.contains("nav-link-img") ||
    event.target.classList.contains("link-span")
  ) {
    for (let i = 0; i < linkImg.length; i++) {
      linkImg[i].classList.remove("current-track");
    }
    event.target.classList.add("current-track");
  }
});
console.log(isPlay);

for (let i = 0; i < navLink.length; i++) {
  navLink[i].addEventListener("click", function () {
    audio.src = `assets/audio/${i + 1}.mp3`;
    screen.style.backgroundImage = `url("assets/img/main-bg/${i + 1}.jpg")`;
    console.log("on:" + isPlay);
    if (isPlay) {
      isPlay = true;
      audio.currentTime = 0;
      audio.play();
    } else {
      isPlay = false;
    }
    playNum = i;
    console.log("playNum after choose track: " + playNum);
  });
}

muteBtn.addEventListener("click", function () {
  muteBtn.classList.toggle("mute");
});

/*-------------------- set track current time ---------------------- */

(function () {
  let toMMSS = function (totalsecs) {
    let sec_num = parseInt(totalsecs, 10); // don't forget the second param
    let minutes = Math.floor(sec_num / 60);
    let seconds = sec_num - minutes * 60;

    if (minutes < 10) {
      minutes = "0" + minutes;
    }
    if (seconds < 10) {
      seconds = "0" + seconds;
    }

    let time = minutes + ":" + seconds;
    return time;
  };

  function onloadedmetadata() {
    durationRange.setAttribute("max", Math.floor(audio.duration));
    totalDuration.textContent = toMMSS(audio.duration);
  }
  if (audio.duration) {
    onloadedmetadata();
  } else {
    audio.addEventListener("loadedmetadata", onloadedmetadata);
  }
  audio.addEventListener("timeupdate", function () {
    durationRange.setAttribute("value", audio.currentTime);
    curentDuration.textContent = toMMSS(audio.currentTime);
  });

  /*--------------------- set audio duration --------------------*/

  durationRange.addEventListener(
    "click",
    function (e) {
      audio.currentTime =
        Math.floor(audio.duration) * (e.offsetX / e.target.offsetWidth);
    },
    false
  );

  volumeRange.addEventListener(
    "input",
    function () {
      audio.volume = parseInt(this.value) / 10;
      step = 0.01;
      min = 0;
      max = 1;
      value = 1;
      if (audio.volume === 0) {
        muteBtn.classList.add("mute");
      }
      if (audio.volume !== 0 && muteBtn.classList.contains("mute")) {
        muteBtn.classList.remove("mute");
      }
    },
    false
  );

  muteBtn.addEventListener("click", function () {
    audio.volume = parseInt(volumeRange.value) / 10;
    volumeRange.classList.toggle("mute");
    console.log(volumeRange.classList.contains("mute"));
    if (!volumeRange.classList.contains("mute")) {
      audio.volume = 0.3;
      volumeRange.value = 3;
    } else {
      audio.volume = 0;
      volumeRange.value = 0;
    }
    console.log("on");
  });
})(this);
