/*var HTML = "index.html"; 
localStorage.setItem("content", HTML);
document.write(localStorage['content']);
*/
//document.querySelector(`[data-serial = '${e.target.dataset.serial -1}']`).style.backgroundColor = 'blue';
const container = document.querySelector('.container');
document.getElementById('btn_rainbow').addEventListener('click' , e=>{ selectedColor = 'rainbow' ; eraser = false;});
document.getElementById('btn_black').addEventListener('click' , e=>{ selectedColor = 'black' ; eraser = false;});
document.getElementById('btn_eraser').addEventListener('click' , e=>{ selectedColor = 'white'; eraser = true; });
document.getElementById('btn_grid').addEventListener('click', toggleGrid);
document.getElementById('btn_clear').addEventListener('click', clear);
document.getElementById('btn_mouseMode').addEventListener('click' , e=>{ if(mouseMode) mouseMode =false; else{mouseMode = true;} });

let canvasSizeX = 30;
let canvasSizeY = 20;
let size_newDiv = 20;

container.style.gridTemplateColumns = `repeat(${canvasSizeX} , 0fr)`
container.style.gridTemplateRows = `repeat(${canvasSizeY} , 0fr)`



let canvasMaxHeight = `${(parseInt(size_newDiv) * parseInt(canvasSizeY) ) + Number(6)}px`;
let canvasMaxWidth =  `${(parseInt(size_newDiv) * parseInt(canvasSizeX) ) + Number(6)}px`;



document.querySelector(".box").style.maxHeight = canvasMaxHeight;
document.querySelector(".box").style.maxWidth = canvasMaxWidth;

let mouseMode = false;
let eraser = false;
let gridEnabled = true;
let selectedColor = "black";

let mouseDown = false
document.body.onmousedown = () => (mouseDown = true);
document.body.onmouseup = () => {mouseDown = false ; if(mouseMode) document.querySelector('.container').style.cursor = 'auto'};

function brushSize(e){

    document.querySelector(`[data-serial = '${e.target.dataset.serial -1}']`).style.backgroundColor = `rgb(${Math.floor(Math.random()*255)},${Math.floor(Math.random()*255)},${Math.floor(Math.random()*255)})`;
    document.querySelector(`[data-serial = '${Number(e.target.dataset.serial) + Number(1)}']`).style.backgroundColor = `rgb(${Math.floor(Math.random()*255)},${Math.floor(Math.random()*255)},${Math.floor(Math.random()*255)})`;
    document.querySelector(`[data-serial = '${Number(e.target.dataset.serial) + Number(canvasSizeX)}']`).style.backgroundColor = `rgb(${Math.floor(Math.random()*255)},${Math.floor(Math.random()*255)},${Math.floor(Math.random()*255)})`;
    document.querySelector(`[data-serial = '${Number(e.target.dataset.serial) - Number(canvasSizeX)}']`).style.backgroundColor = `rgb(${Math.floor(Math.random()*255)},${Math.floor(Math.random()*255)},${Math.floor(Math.random()*255)})`;
    //document.querySelector(`[data-serial = '${Number(e.target.dataset.serial) - Number(canvasSizeX+ 1)}']`).style.backgroundColor = `rgb(${Math.floor(Math.random()*255)},${Math.floor(Math.random()*255)},${Math.floor(Math.random()*255)})`;
    //document.querySelector(`[data-serial = '${Number(e.target.dataset.serial) - Number(canvasSizeX -1)}']`).style.backgroundColor = `rgb(${Math.floor(Math.random()*255)},${Math.floor(Math.random()*255)},${Math.floor(Math.random()*255)})`;
    //document.querySelector(`[data-serial = '${Number(e.target.dataset.serial) + Number(canvasSizeX+ 1)}']`).style.backgroundColor = `rgb(${Math.floor(Math.random()*255)},${Math.floor(Math.random()*255)},${Math.floor(Math.random()*255)})`;
    //document.querySelector(`[data-serial = '${Number(e.target.dataset.serial) + Number(canvasSizeX -1)}']`).style.backgroundColor = `rgb(${Math.floor(Math.random()*255)},${Math.floor(Math.random()*255)},${Math.floor(Math.random()*255)})`;
}

function changeColor(e){
    
    if(e.type == "mouseover" && !mouseDown) return;
    
    if (mouseMode) document.querySelector('.container').style.cursor =  'none';

    if(selectedColor == 'rainbow'){
        
        let rgb = `rgb(${Math.floor(Math.random()*255)},${Math.floor(Math.random()*255)},${Math.floor(Math.random()*255)})`;
       
            e.target.style.backgroundColor = rgb;
            brushSize(e);
          
    }
    else{
        if(!eraser){
        
        e.target.style.backgroundColor = selectedColor;
        }
        else{
            e.target.style.backgroundColor = 'transparent';
        }
    }



}

function clear(){

    Array.from(document.querySelectorAll('.newDiv')).forEach( element => {
        element.style.backgroundColor= "white";
      } );

}

function build(i){

        let newDiv = document.createElement("div");
        newDiv.classList.add('newDiv');
        newDiv.dataset.serial = i;
        newDiv.style.height = size_newDiv + "px";
        newDiv.style.width = size_newDiv + "px";
        container.appendChild(newDiv); 
        newDiv.addEventListener('click' , changeColor);
        newDiv.addEventListener('mouseover' , changeColor);


}

function toggleGrid(){

       if(gridEnabled){

        Array.from(document.querySelectorAll('.newDiv')).forEach( element => {
            element.style.border = "hidden";
          } );


          gridEnabled = false;

       }

       else{

        Array.from(document.querySelectorAll('.newDiv')).forEach( element => {
            element.style.border = "1px solid dimgray";
          } );

          gridEnabled = true;

       }


}


Array.from(document.querySelectorAll('[data-color]')).forEach(cell => {

    cell.style.backgroundColor = cell.dataset.color;
    cell.addEventListener('click', ()=> {selectedColor = cell.dataset.color});
    
})



for(let i = 0 ; i < canvasSizeX * canvasSizeY ; i++ ){
    
   build(i); 
   

}


