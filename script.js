//O HTML e o CSS, assim como os recursos de imagem e som, foram fornecidos pela Alura.

//O script abaixo foi escrito por mim

const html = document.querySelector('html');
const title = document.querySelector('.app__title');
const image = document.querySelector('.app__image');
const buttons = document.querySelectorAll('.app__card-button');
const temp = document.querySelector('#timer');
const songSwitch = document.querySelector('#alternar-musica');
const playpauseButton = document.querySelector('#start-pause');
const playpauseImg = document.querySelector('.app__card-primary-butto-icon');
const playpauseText = document.querySelector('#start-pause span');

const songAudio = new Audio('/sons/luna-rise-part-one.mp3');
const playAudio = new Audio('/sons/play.wav');
const pauseAudio = new Audio('/sons/pause.mp3');
const beepAudio = new Audio('/sons/beep.mp3');

const sections = ['foco','descanso-curto','descanso-longo'];
const sectionsTitle = [
    `Otimize sua produtividade,<br>
    <strong class="app__title-strong">mergulhe no que importa.</strong>`,
    `Que tal dar uma respirada?<br>
    <strong class="app__title-strong">Faça uma pausa curta!</strong>`,
    `Hora de voltar à superfície.<br>
    <strong class="app__title-strong">Faça uma pausa longa.</strong>`
];
const sectionImages = sections.map((section) => {

    return `/imagens/${section}.png`;
});
const sectionsIntervals = [1500,300,900];

let tempContextCount = 3;

buttons.forEach((button,i) => {

    button.addEventListener('click', () => {

            html.setAttribute('data-contexto',sections[i]);
            image.setAttribute('src',sectionImages[i]);
            title.innerHTML = sectionsTitle[i];
            updateSelectedButton(i);
            tempContextCount = sectionsIntervals[i];
            resetTemp();
            tempPrint();

    })
})

function updateSelectedButton(selectedIndex){

    buttons.forEach((button,i) => {

        if(selectedIndex === i) button.classList.add('active');
        else button.classList.remove('active');
    })
}

songAudio.loop = true;
let isSongSwitchOn = false;

songSwitch.addEventListener('change', (event) => {

    if(event.target.checked == true){
        isSongSwitchOn = true;
        if(interval != null) songAudio.play();
    }
    else{
        isSongSwitchOn = false;
        songAudio.pause();
        songAudio.currentTime = 0;
    }
});


playpauseButton.addEventListener('click', () => {
    
    if(playpauseText.textContent === 'Pausar'){
        
        pauseTemp();
        songAudio.pause();
        pauseAudio.play();
    }
    else{
        
        playTemp();
        playAudio.play();
        if(isSongSwitchOn) songAudio.play();
    } 
});

let tempCount = tempContextCount;
let interval;
tempPrint();

const count = () => {

    tempCount--;
    if(tempCount === 0){

        resetTemp();
        beepAudio.play();
        taskListElements[selectedTask].querySelector('svg').dispatchEvent(new Event('click'));
    }
    tempPrint();
}

function playTemp(){

    interval = setInterval(count, 1000);
    playpauseImg.setAttribute('src','/imagens/pause.png');
    playpauseText.textContent = 'Pausar';
    playpauseText.textContent = 'Pausar';
    
    playpauseText.textContent = 'Pausar'; 
    
}

function pauseTemp(){
    
    clearInterval(interval);
    interval = null;
    playpauseImg.setAttribute('src','/imagens/play_arrow.png');
    playpauseText.textContent = 'Começar';
    playpauseText.textContent = 'Começar';
    
    playpauseText.textContent = 'Começar';  
    
}

function resetTemp(){

    pauseTemp();
    tempCount = tempContextCount;
    songAudio.pause();
    songAudio.currentTime = 0;
}

function tempPrint() {

    const tempClockCount = new Date(tempCount*1000);
    const tempClock = tempClockCount.toLocaleString('pt-Br',{minute: '2-digit',second: '2-digit'});
    temp.innerHTML = `${tempClock}`;
}