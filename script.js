/*-----------------------------------Change language----------------------------------*/

const transcriptionObj = {
    'en': {
        'forest': 'Forest',
        'blackbird': 'Blackbird',
        'lark': 'Lark',
        'nightingale': 'Nightingale',
        'warbler': 'Warbler',
        'robin': 'Robin'
    },
    'ru': {
        'forest': 'Лес',
        'blackbird': 'Дрозд',
        'lark': 'Жаворонок',
        'nightingale': 'Соловей',
        'warbler': 'Славка',
        'robin': 'Зарянка'
    },
    'it': {
        'forest': 'Foresta',
        'blackbird': 'Tordo',
        'lark': 'Allodola',
        'nightingale': 'Usignolo',
        'warbler': 'Sylvia',
        'robin': 'Pettirosso'
    }

}

const languageBtn = document.querySelectorAll('.language-btn');
const transcriptionText = document.querySelectorAll('[data-transcription]');
const languageDiv= document.querySelector('.language'); 
const linkImg = document.querySelectorAll('.nav-link-img');

languageDiv.addEventListener('click', changeLanguage);

function changeLanguage(event) {

    if (event.target.classList.contains('language-btn')) {
        console.log(event);
        for (let i = 0; i < languageBtn.length; i++) {
            languageBtn[i].classList.remove('current-language');
        }  
        event.target.classList.add('current-language');

        let language = event.target.getAttribute('data-language');

        transcriptionText.forEach(item => {
            let dataText = item.getAttribute("data-transcription");  /*получаем значение атрибута data у всех элементов для переводa */ 
            item.textContent = transcriptionObj[language][dataText];
           
            });  
       
   }
} 

/*----------------------------Audio Play-Stop--------------------------------------- */

const audio = document.querySelector('audio');
const audioBtn = document.querySelector('.audio-btn');
//const stopBtn = document.querySelector('.stop-btn');
let isPlay = false;

function playAudio() {
  if (!isPlay) {  
  audio.currentTime = 0;
  audio.play();
  audioBtn.classList.remove('play-btn');
  audioBtn.classList.add('stop-btn');
  isPlay = true;
  }
  else {
    audio.pause();
    isPlay = false;
    audioBtn.classList.remove('stop-btn');
    audioBtn.classList.add('play-btn');
  }
}

audioBtn.addEventListener('click', playAudio);


/*-------------------------------Prev-Next Buttons------------------------------------------- */
const next = document.querySelector('.next-btn');
const prev = document.querySelector('.prev-btn');
const screen = document.querySelector('.screen');
let playNum = 0;
let tracks = ['1', '2', '3', '4', '5', '6'];
let bgImg = ['1', '2', '3', '4', '5', '6'];

next.addEventListener('click', playNext);
prev.addEventListener('click', playPrev);

function playNext() {
    playNum++;
    for (let i = 0; i < tracks.length; i++) {
        if  (playNum > tracks.length - 1) playNum = 0;
    }
    screen.style.backgroundImage = `url("assets/img/main-bg/${playNum + 1}.jpg")`;
    audio.src = `assets/audio/${playNum + 1}.mp3`;
    if (isPlay) {
        isPlay = true;
        audio.play();
    }
    for (let j = 0; j < linkImg.length; j++) {
        linkImg[j].classList.remove('current-track');
    }
    console.log(playNum);
    console.log(linkImg[playNum]);
    linkImg[playNum].classList.add('current-track');
    
}
function playPrev() {
    playNum--;
    for (let i = 0; i < tracks.length; i++) {
        if  (playNum < 0) playNum = tracks.length - 1;
    }
    screen.style.backgroundImage = `url("assets/img/main-bg/${playNum + 1}.jpg")`;
    audio.src = `assets/audio/${playNum + 1}.mp3`;
    if (isPlay) {
        audio.play();
    }

    console.log(playNum);
    for (let j = 0; j < linkImg.length; j++) {
        linkImg[j].classList.remove('current-track');
    }
    console.log(playNum);
    console.log(linkImg[playNum]);
    linkImg[playNum].classList.add('current-track');
}


/*-------------------------Change track with Menu image onclick--------------------------- */

const navList = document.querySelector('.nav-list');
const navLink = document.querySelectorAll('.nav-link');


navList.addEventListener('click', function changeImg(event) {
    if (event.target.classList.contains('nav-link-img') || event.target.classList.contains('link-span')) {
        for (let i = 0; i < linkImg.length; i++) {
            linkImg[i].classList.remove('current-track');
        }
        event.target.classList.add('current-track');
    }
});

/* navList.addEventListener('click', function changeTrack(event) {
    for (let i = 0; i < navLink.length; i++) {
        navLink[i].addEventListener('click', function() {
            audio.src = `assets/audio/${i+1}.mp3`;
            screen.style.backgroundImage = `url("assets/img/main-bg/${i+1}.jpg")`;
        });
    }
    if (isPlay) {
        audio.play();
    }
});     */



document.querySelector('.forest').addEventListener('click', function() {
    audio.src = `assets/audio/1.mp3`;
    screen.style.backgroundImage = `url("assets/img/main-bg/1.jpg")`;
    if (isPlay) {
        audio.play();
    }
});
document.querySelector('.blackbird').addEventListener('click', function() {
    audio.src = `assets/audio/2.mp3`;
    screen.style.backgroundImage = `url("assets/img/main-bg/2.jpg")`;
    if (isPlay) {
        audio.play();
    }
});
document.querySelector('.lark').addEventListener('click', function() {
    audio.src = `assets/audio/3.mp3`;
    screen.style.backgroundImage = `url("assets/img/main-bg/3.jpg")`;
    if (isPlay) {
        audio.play();
    }
});
document.querySelector('.nightingale').addEventListener('click', function() {
    audio.src = `assets/audio/4.mp3`;
    screen.style.backgroundImage = `url("assets/img/main-bg/4.jpg")`;
    if (isPlay) {
        audio.play();
    }
});
document.querySelector('.warbler').addEventListener('click', function() {
    audio.src = `assets/audio/5.mp3`;
    screen.style.backgroundImage = `url("assets/img/main-bg/5.jpg")`;
    if (isPlay) {
        audio.play();
    }
});
document.querySelector('.robin').addEventListener('click', function() {
    audio.src = `assets/audio/6.mp3`;
    screen.style.backgroundImage = `url("assets/img/main-bg/6.jpg")`;
    if (isPlay) {
        audio.play();
    }
});






       
        
    




