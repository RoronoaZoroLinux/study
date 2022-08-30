//newDiv.addEventListener('click' , e=> {e.target.style.backgroundColor = `rgb(${Math.floor(Math.random()*255)},${Math.floor(Math.random()*255)},${Math.floor(Math.random()*255)})`}) 
const continer = document.querySelector('.container');
document.getElementById('btn_rainbow').addEventListener('click' , e=>{ selectedColor = 'rainbow' ; eraser = false;});
document.getElementById('btn_black').addEventListener('click' , e=>{ selectedColor = 'black' ; eraser = false;});
document.getElementById('btn_eraser').addEventListener('click' , e=>{ selectedColor = 'white'; eraser = true; });
document.getElementById('btn_grid').addEventListener('click', toggleGrid);
document.getElementById('btn_clear').addEventListener('click', clear);
document.getElementById('btn_mouseMode').addEventListener('click' , e=>{ if(mouseMode) mouseMode =false; else{mouseMode = true;} });

let mouseMode = false;
let eraser = false;
let gridEnabled = true;
let selectedColor = "black";

let mouseDown = false
document.body.onmousedown = () => (mouseDown = true);
document.body.onmouseup = () => {mouseDown = false ; if(mouseMode) document.querySelector('.container').style.cursor = 'auto'};


function changeColor(e){
    
    if(e.type == "mouseover" && !mouseDown) return;
    
    if (mouseMode) document.querySelector('.container').style.cursor =  'none';

    if(selectedColor == 'rainbow'){
        
        let rgb = `rgb(${Math.floor(Math.random()*255)},${Math.floor(Math.random()*255)},${Math.floor(Math.random()*255)})`;
       
        if(e.target.dataset.serial % 65 != 0);{

            document.querySelector(`[data-serial = '${e.target.dataset.serial}']`).style.backgroundColor = 'black';
            document.querySelector(`[data-serial = '${e.target.dataset.serial -1}']`).style.backgroundColor = 'green';
            document.querySelector(`[data-serial = '${Number(e.target.dataset.serial) + Number(1) }']`).style.backgroundColor = 'red';

        }

   
        
    }
    else{
        if(!eraser){
        document.querySelector(`[data-serial = '${e.target.dataset.serial}']`).style.backgroundColor = 'black';
        document.querySelector(`[data-serial = '${e.target.dataset.serial -1}']`).style.backgroundColor = 'blue';
        }
        else{
            e.target.style.backgroundColor = 'white';
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
        continer.appendChild(newDiv); 
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

for(let i = 0 ; i < 2220 ; i++ ){
    
   build(i); 

}

