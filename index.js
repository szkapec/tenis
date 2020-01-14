const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d');

canvas.width = 1000;
canvas.height = 500;

const cw = canvas.width;
const ch = canvas.height;
const pilka = 20; 
let pilkaX = cw/2 - pilka/2
let pilkaY = ch/2 - pilka/2

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


let szybkoscPilkiX = 3; //kierunki itd
let szybkoscPilkiY = 0;

function gracz() { 
    ctx.fillStyle = "green"
    ctx.fillRect(graczX , graczY, paletkaWidth, paletkaHeight )
 }

 function AI() {
    ctx.fillStyle = "green"
    ctx.fillRect(aiX , aiY, paletkaWidth, paletkaHeight )
 }

function ball() {
    ctx.fillStyle = "#fff"
    ctx.fillRect(pilkaX , pilkaY, pilka, pilka) //na poczatku jest na srodku

    pilkaX += szybkoscPilkiX;
    pilkaY += szybkoscPilkiY;

    if(pilkaY <= 0 || pilkaY+pilka>= ch) // __ 
    {
        szybkoscPilkiY = -szybkoscPilkiY;
    }
    if(pilkaX <= 0 || pilkaX >= cw- pilka)
    {
        szybkoscPilkiX = -szybkoscPilkiX
    }
}
canvas.addEventListener('mousemove', function() {
})

function table() {
    //stol
    ctx.fillStyle = "black"
    ctx.fillRect(0,0,cw,ch)
    //paski
    for(let pozycjaLini = 20; pozycjaLini < ch; pozycjaLini +=30)
    {
        ctx.fillStyle = "grey"
        ctx.fillRect(cw/2 - liniaWidth/2, pozycjaLini, liniaWidth, liniaHeight)  //x=1000/2 - 6/2, y=20 >> 50 >> 80... 
    }

}
function game() {
    table();
    ball()
    gracz();
    AI();
}

game()
setInterval(game, 1000/60) //20x na sekunde

