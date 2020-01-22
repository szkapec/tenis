const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

let wyniki = document.querySelector('.wyniki')
let wyniki2 = document.querySelector('.wyniki2')

let gr1 = 0;
let gr2 = 0;

canvas.width = 1000;
canvas.height = 500;

const cw = canvas.width;
const ch = canvas.height;
const pilka = 20; 
let pilkaX = cw/2 - pilka/2;
let pilkaY = ch/2 - pilka/2;

//paletki 
const paletkaHeight = 100;
const paletkaWidth = 20;
const graczX = 70;
const aiX = 910;
let graczY = 200;
let aiY = 200;

//linie
const liniaWidth = 6;
const liniaHeight = 16;


let szybkoscPilkiX = -3; //kierunki itd
let szybkoscPilkiY = 3;

function gracz() { 
    ctx.fillStyle = "green";
    ctx.fillRect(graczX , graczY, paletkaWidth, paletkaHeight );
 }

 function AI() {
    ctx.fillStyle = "green";
    ctx.fillRect(aiX , aiY, paletkaWidth, paletkaHeight );
 }

function ball() {
    ctx.fillStyle = "#fff";
    ctx.fillRect(pilkaX , pilkaY, pilka, pilka); //na poczatku jest na srodku

    pilkaX += szybkoscPilkiX;
    pilkaY += szybkoscPilkiY;

    if(pilkaY <= 0 || pilkaY+pilka>= ch) // __ 
    {
        szybkoscPilkiY = -szybkoscPilkiY;
        przyspieszenie()
    }
    if(pilkaX <= 30 && pilkaX >= -10)
    {
        gr2++;
        wyniki2.innerHTML = `Wynik: ${gr2}`;
        pilkaX = cw/2 - pilka/2;
        pilkaY = ch/2 - pilka/2;
        szybkoscPilkiX = 3; //kierunki itd
        szybkoscPilkiY = 4;
    }
    if(pilkaX >= cw- pilka+20) {
        gr1++;
        wyniki.innerHTML = `Wynik: ${gr1}`;

        pilkaX = cw/2 - pilka/2;
        pilkaY = ch/2 - pilka/2;
        szybkoscPilkiX = 4; //kierunki itd
        szybkoscPilkiY = 3;
    }

    if(graczY < pilkaY && graczY + 100 > pilkaY && pilkaX <= 80) {
        szybkoscPilkiX = -szybkoscPilkiX;
        przyspieszenie()

    }
    if(aiY < pilkaY && aiY + 100 > pilkaY && pilkaX >= 900) {
        szybkoscPilkiX = -szybkoscPilkiX;
        przyspieszenie()

    }
}
let topCanvas = canvas.offsetTop;

canvas.addEventListener('mousemove', function(event) {
    graczY = event.clientY - topCanvas - paletkaHeight/2 ;
    
    if(graczY<0) {
        graczY = 0;
       
    }
    if (graczY > ch -paletkaHeight ) {
        graczY = ch -paletkaHeight ;
       
    }

    // aiY = graczY;
});

function table() {
    //stol
    ctx.fillStyle = "black";
    ctx.fillRect(0,0,cw,ch);
    //paski
    for(let pozycjaLini = 20; pozycjaLini < ch; pozycjaLini +=30)
    {
        ctx.fillStyle = "grey";
        ctx.fillRect(cw/2 - liniaWidth/2, pozycjaLini, liniaWidth, liniaHeight);  //x=1000/2 - 6/2, y=20 >> 50 >> 80... 
    }

}

function przyspieszenie() {

    //predkosc x
    if(szybkoscPilkiX > 0 && szybkoscPilkiX < 16) {
        szybkoscPilkiX += .2;
    }
    else if (szybkoscPilkiX < 0 && szybkoscPilkiX > -16)
    {
        szybkoscPilkiX -= .26;
    }
    //predkosc Y
    if(szybkoscPilkiY > 0 && szybkoscPilkiY < 16) {
        szybkoscPilkiY += .15;
    }
    else if (szybkoscPilkiY < 0 && szybkoscPilkiY > -16)
    {
        szybkoscPilkiY -= .19;
    }
}

function aiPosition() {
let srodekRakietki = aiY + paletkaHeight/2;

let srodekPilki = pilkaY + pilka/2;
    if(pilkaX > 500) {
        
        if(srodekRakietki  - srodekPilki > 200) {
            //console.log(">+200")
            aiY -= 5
        }
        else if(srodekRakietki  - srodekPilki > 50) {
            //console.log("+50-200")
            aiY -= 7
        }
        else if(srodekRakietki  - srodekPilki < -200) {
            //console.log("<-200")
            aiY += 5
        }
        else if(srodekRakietki  - srodekPilki < -50) {
            //console.log("-50-(-200)")
            aiY += 7
        }
        
    }

    else if(pilkaX <= 500 && pilkaX > 150) {
        if(srodekRakietki  - srodekPilki > 100) {
            aiY -= 5
        }
        else if (srodekRakietki  - srodekPilki < -100) {
            aiY +=7
        }
    }

}

function game() {
    table();
    ball();
    gracz();
    AI();
    aiPosition();
}

game();
setInterval(game, 1000/60); //20x na sekunde

