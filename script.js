const html = document.querySelector('html');

const btnFoco = document.querySelector('.app__card-button--foco');
const btnCurto = document.querySelector('.app__card-button--curto');
const btnLongo = document.querySelector('.app__card-button--longo');
const banner =  document.querySelector('.app__image');
const title = document.querySelector('.app__title');
const btns = document.querySelectorAll('.app__card-button');
const btnTimer  = document.querySelector('#start-pause');
const StartOrPauseBtn = document.querySelector('#start-pause span');
const timer = document.querySelector('#timer');
const mscFocoCheckBox = document.querySelector('#alternar-musica');
const playImage = document.querySelector('.app__card-primary-butto-icon');
const musica = new Audio('sons/luna-rise-part-one.mp3');
const startTimerAudio = new Audio('sons/play.wav');
const pauseTimerAudio = new Audio('sons/pause.mp3');
const fimTimerAudio = new Audio('sons/beep.mp3');
musica.loop = true;

let tempoSeg = 1500;


let intervaloId =null;

showTime() //mostra sempre na tela

mscFocoCheckBox.addEventListener('change', () => {
    if(mscFocoCheckBox.checked){
        musica.play();
        console.log('aaaaaaaaa')
    }
    else{
        musica.pause();
    }
})


btnFoco.addEventListener('click', () => {
    tempoSeg = 1500;
    alteraContexto('foco');
    btnFoco.classList.add('active');
})

btnCurto.addEventListener('click', () => {
    tempoSeg = 300;
    alteraContexto('descanso-curto');
    btnCurto.classList.add('active');
})

btnLongo.addEventListener('click', () => {
    tempoSeg = 900;
    alteraContexto('descanso-longo');
    btnLongo.classList.add('active');  
})

function alteraContexto (contexto) {
    showTime()
    btns.forEach(function (contexto){
        contexto.classList.remove('active')
    })
    html.setAttribute('data-contexto', contexto);
    banner.setAttribute('src', `/imagens/${contexto}.png`)
    switch(contexto){
        case "foco":
            title.innerHTML = `Otimize sua produtividade,<br>
            <strong class="app__title-strong">mergulhe no que importa.</strong>`
            break;
        case "descanso-curto":
            title.innerHTML = `Que tal dar uma respirada? <strong class="app__title-strong">Faça uma pausa curta!</strong>`
            break;
        case "descanso-longo": 
            title.innerHTML = `Hora de voltar à superfície.<strong class="app__title-strong"> Faça uma pausa longa.</strong>`
            break;

        default:
            break;
    }
}


const contagemRegressiva = () => {
    if(tempoSeg <= 0){
        fimTimerAudio.play();
        alert("Tempo finalizado")
        resetTimer();
        return;
    }
    tempoSeg -= 1;
    showTime();
}

btnTimer.addEventListener('click', startOrPauseTimer);

function startOrPauseTimer() {
    if(intervaloId){
        pauseTimerAudio.play();
        resetTimer();
        return
    }
    startTimerAudio.play();
    intervaloId = setInterval(contagemRegressiva, 1000);
    StartOrPauseBtn.innerHTML = "Pausar"
    playImage.setAttribute('src', `/imagens/pause.png`)
}

function resetTimer(){
    clearInterval(intervaloId);
    StartOrPauseBtn.innerHTML = "Começar"
    playImage.setAttribute('src', `/imagens/play_arrow.png`)
    intervaloId =null;
}

 function showTime(){
    const tempo = new Date(tempoSeg * 1000);
    const tempoFormatado = tempo.toLocaleTimeString('pt-br', {minute: '2-digit', second: '2-digit'})
    timer.innerHTML = `${tempoFormatado}`
 }

