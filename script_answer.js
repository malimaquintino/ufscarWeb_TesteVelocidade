const testWrapper = document.querySelector(".test-wrapper");
const testArea = document.querySelector("#test-area");
const originText = document.querySelector("#origin-text p").innerHTML;
const resetButton = document.querySelector("#reset");
const theTimer = document.querySelector(".timer");

timer = [0,0,0,0];
var interval;
var timerRunning = false;

// Adiciona zero inicial aos números <= 9 (apenas para estética):
function leadingZero(time) {
    if(time <= 9){
        time = "0" + time;
    }
    return time;
}

// Executa um timer padrão de minuto / segundo / centésimos:
function runTimer() {
    let currentTime = leadingZero(timer[0]) + ":" + leadingZero(timer[1]) + ":" + leadingZero(timer[2]);
    theTimer.innerHTML = currentTime;
    timer[3]++;

    timer[0] = Math.floor((timer[3]/100)/60);
    timer[1] = Math.floor((timer[3]/100) - (timer[0] * 60));
    timer[2] = Math.floor(timer[3] - (timer[1] * 100) - (timer[0] * 6000));
}

// Verifica se texto digitado com o fornecido na página:
function spellCheck() { 
    let textEntered = testArea.value;
    let originTextMatch = originText.substring(0, textEntered.length);
    
    if (textEntered == originText) {
        clearInterval(interval);
        testWrapper.style.borderColor = "#429890";
        desbloqueiaTrofeu();
    } else {
        if (textEntered == originTextMatch) {
            testWrapper.style.borderColor = "#65CCf3";
        } else {
            testWrapper.style.borderColor = "#E95D0F";
        }
    }
}

// Inicia o cronômetro:
function start(){
   let textEnteredLength = testArea.value.length;
    if (textEnteredLength === 0 && !timerRunning) {
        timerRunning = true;
        interval = setInterval(runTimer, 10);
    }
}

// Função de recomeçar:
function reset() {
    clearInterval(interval);
    interval = null;
    timer = [0,0,0,0];
    timerRunning = false;

    testArea.value = "";
    theTimer.innerHTML = "00:00:00";
    testWrapper.style.borderColor = "grey";
    //resetTrofeu();
}

function resetTrofeu(){
    localStorage.setItem("trofeu1", "0");
    localStorage.setItem("trofeu2", "0");
    localStorage.setItem("trofeu3", "0");
    localStorage.setItem("trofeu4", "0");
    localStorage.setItem("trofeu5", "0");
    exibirTrofeus();
}

function desbloqueiaTrofeu(){
    let tempo = '2019/07/01 '+leadingZero(timer[0]) + ":" + leadingZero(timer[1]);


    if (Date.parse(tempo) > Date.parse('2019/07/01 02:00')  && localStorage.getItem("trofeu1")!='1') {
        localStorage.setItem("trofeu1", 1);
        mostrarNotificacao();
        new Audio('song/AchievementUnlocked.mp3').play();
    }

    if (Date.parse(tempo) <= Date.parse('2019/07/01 02:00') && Date.parse(tempo) > Date.parse('2019/07/01 01:40')  && localStorage.getItem("trofeu2")!='1') {
        localStorage.setItem("trofeu2", 1);
        mostrarNotificacao();
        new Audio('song/AchievementUnlocked.mp3').play();
    }

    if (Date.parse(tempo) <= Date.parse('2019/07/01 01:40') && Date.parse(tempo) > Date.parse('2019/07/01 01:20')  && localStorage.getItem("trofeu3")!='1') {
        localStorage.setItem("trofeu3", 1);
        mostrarNotificacao();
        new Audio('song/AchievementUnlocked.mp3').play();
    }

    if (Date.parse(tempo) <= Date.parse('2019/07/01 01:20') && Date.parse(tempo) > Date.parse('2019/07/01 01:00')  && localStorage.getItem("trofeu4")!='1') {
        localStorage.setItem("trofeu4", 1);
        mostrarNotificacao();
        new Audio('song/AchievementUnlocked.mp3').play();
    }

    if (Date.parse(tempo) <= Date.parse('2019/07/01 01:00') && localStorage.getItem("trofeu5")!='1') {
        localStorage.setItem("trofeu5", 1);
        mostrarNotificacao();
        new Audio('song/AchievementUnlocked.mp3').play();
    }

    exibirTrofeus();
}

function exibirTrofeus(){

    let trofeu1 = localStorage.getItem("trofeu1");
    let trofeu2 = localStorage.getItem("trofeu2");
    let trofeu3 = localStorage.getItem("trofeu3");
    let trofeu4 = localStorage.getItem("trofeu4");
    let trofeu5 = localStorage.getItem("trofeu5");

    if (trofeu1 == '1' ) {
        document.getElementById("trofeu1-locked").classList.add("hide");
        document.getElementById("trofeu1-unlocked").classList.remove("hide");
    }

    if (trofeu2 == '1' ) {
        document.getElementById("trofeu2-locked").classList.add("hide");
        document.getElementById("trofeu2-unlocked").classList.remove("hide");
    }

    if (trofeu3 == '1' ) {
        document.getElementById("trofeu3-locked").classList.add("hide");
        document.getElementById("trofeu3-unlocked").classList.remove("hide");
    }

    if (trofeu4 == '1' ) {
        document.getElementById("trofeu4-locked").classList.add("hide");
        document.getElementById("trofeu4-unlocked").classList.remove("hide");
    }

    if (trofeu5 == '1' ) {
        document.getElementById("trofeu5-locked").classList.add("hide");
        document.getElementById("trofeu5-unlocked").classList.remove("hide");
    }
}

function ocultarNotificacao(){
    let element = document.getElementById("notificar");
    element.classList.add("hide");
}
function mostrarNotificacao(){
    let element = document.getElementById("notificar");
    element.classList.remove("hide");

    setTimeout(function(){ ocultarNotificacao() }, 3000);
}

// Listeners de eventos para entrada de teclado e o botão de recomeçar:
testArea.addEventListener("keypress", start, false);
testArea.addEventListener("keyup", spellCheck, false);
resetButton.addEventListener("click", reset, false);

window.onload = function() {
    exibirTrofeus();

    testArea.onpaste = function(){
        return false;
    }
};