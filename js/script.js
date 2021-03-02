let pole = document.getElementById('pole');
let ball = document.getElementById('ball');
let palka = document.getElementById('palka');
let butSt = document.getElementById('butSt');
let butPaus = document.getElementById('butPaus');
let butNewGam = document.getElementById('butNewGam');

let pause = document.querySelector('.pause');
let gameOver = document.querySelector('.gameOver');
let countSp = document.querySelector('body>p:first-of-type>span');
let countLevSp = document.querySelector('body>p:nth-of-type(2)>span');
let countLevBalSp = document.querySelector('body>p:last-of-type>span');

let poleH = pole.getBoundingClientRect().height;
let poleW = pole.getBoundingClientRect().width;
let ballH = ball.getBoundingClientRect().height;
let ballW = ball.getBoundingClientRect().width;
let palkaH = palka.getBoundingClientRect().height;
let palkaW = palka.getBoundingClientRect().width;

let x = y = 0;
let xP = 0;
let bottom = true;
let right = true;
let step = 1;
let ident_1;
let count = 0;
let countLev = 1;
let countLevBal = 20;

function moveBall(){
    if(butPaus.value == 'pause') return false;
    if(x<=0)right = true;
    if(x>=poleW-ballW)right = false;
    if(y<=0)bottom = true;

    let palkaSt = palka.offsetLeft;
    if((y>=poleH-ballH-palkaH) && (x>=palkaSt-ballW/2) && (x<=palkaSt+palkaW-ballW/2)){
        bottom = false;
        countSp.innerHTML = ++count;
        countLevBalSp.innerHTML = countLevBal-count%20;
        if(count%20 == 0){
            countLevSp.innerHTML = ++countLev;
            ++step;
        }  
    }
       if(y>=poleH-ballH){
        gameOver.classList.add('show');
        butSt.disabled = 'disabled';
        butPaus.disabled = 'disabled';
        return;
    } 
    if(right && bottom){
        x+=step;
        y+=step;
    }
    if(!right && !bottom){
        x-=step;
        y-=step;
    }
    if(right && !bottom){
        x+=step;
        y-=step;
    }
    if(!right && bottom){
        x-=step;
        y+=step;
    }
    ball.style.left = x +'px';
    ball.style.top = y +'px';
}

pole.addEventListener('mousemove', (event)=>{
    let clShow = document.querySelector('.show');
    if(clShow) return;
    xP = event.offsetX-palkaW/2;
    let maxPalkaLeft = pole.clientWidth-palkaW;
    if(xP <=0) xP = 0;
    if(xP >= maxPalkaLeft) xP = maxPalkaLeft;
    palka.style.left = xP +'px';
})

butSt.addEventListener('click', (event)=>{
    if(butSt.value == 'play' || butNewGam.value == 'play'){
        return;
    } 
    else{
        ident_1 = setInterval(moveBall,4);
        butSt.value = 'play';
    } 
})

butPaus.addEventListener('click', (event)=>{
    if(butPaus.value == 'pause'){
        butPaus.value = '';
        butPaus.innerHTML = 'Пауза';
        pause.classList.remove('show');
    } 
    else{
        butPaus.value = 'pause';
        butPaus.innerHTML = 'Продолжить игру';
        pause.classList.add('show');
    } 
})

butNewGam.addEventListener('click', (event)=>{
    clearInterval(ident_1);
    x = y = 0;
    count = 0;
    countSp.innerHTML = '0';
    countLev = 1;
    countLevSp.innerHTML = '1';
    step = 1;
    gameOver.classList.remove('show');
    butSt.disabled = '';
    butPaus.disabled = '';
    butNewGam.value = 'play';
    ident_1 = setInterval(moveBall,4);
})
