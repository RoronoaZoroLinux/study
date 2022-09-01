let layer_count = 1;
let selectedLayer = 1;
function createLayer(){
    

    Array.from(document.querySelectorAll('[data-serial]')).forEach(cell => {


        cell.setAttribute(`data-layer${layer_count}_value`,`transparent`);
        
        
    })
   
    createLayerButton();
}



document.querySelector('#btn_create_layer').addEventListener('click' , createLayer);

    function createLayerButton(){
        
        let newlayer = document.createElement('div');

        newlayer.classList.add('div_button');
        newlayer.setAttribute('data-layer',layer_count);
        newlayer.innerText ="layer"+ (layer_count);
        newlayer.addEventListener('click' , selectLayer)
        document.querySelector('.layerbox').appendChild(newlayer);
    
        layer_count++;
        
    }

createLayerButton();
document.querySelector('[data-layer]').style.backgroundColor = 'goldenrod';

function selectLayer(e){

e.target.style.backgroundColor = 'goldenrod';
selectedLayer = e.target.dataset.layer;


Array.from(document.querySelectorAll('[data-layer]')).forEach( button => {
    if(button.dataset.layer == selectedLayer)return;
    button.style.backgroundColor = 'rgb(163, 103, 121)';

})


Array.from(document.querySelectorAll('[data-serial]')).forEach( div => {
       
    div.style.backgroundColor = 'transparent';
        
    for(let i = 0 ; i < selectedLayer ; i++){

        if(div.getAttribute(`data-layer${Number(i+1)}_value`) != 'transparent') {
           
            div.style.backgroundColor = 'transparent';
            div.style.backgroundColor = div.getAttribute(`data-layer${Number(i+1)}_value`);

        }
   
        

    }

} )

}






/////////////////////////////////////////////////////////

//  EXPERIMENTAL AREA

/////////////////////////////////////////////////////////







/*var HTML = "index.html"; 
localStorage.setItem("content", HTML);
document.write(localStorage['content']);
*/
//document.querySelector(`[data-serial = '${e.target.dataset.serial -1}']`).style.backgroundColor = 'blue';
const container = document.querySelector('.container');
let rainbow = false;

document.getElementById('btn_rainbow').addEventListener('click' , e=>{ eraser = false; rainbow=true; changeColorpickScreen() });
document.getElementById('btn_black').addEventListener('click' , e=>{  eraser = false; rainbow = false; changeColorpickScreen()});
document.getElementById('btn_eraser').addEventListener('click' , e=>{ eraser = true; });
document.getElementById('btn_grid').addEventListener('click', toggleGrid);
document.getElementById('btn_clear').addEventListener('click', clear);
document.getElementById('btn_mouseMode').addEventListener('click' , e=>{ if(mouseMode) mouseMode =false; else{mouseMode = true;} });

let canvasSizeX = 40;
let canvasSizeY = 20;
let size_newDiv = 50;

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

function changeColorpickScreen(){
    
    if(rainbow){
        
        document.getElementById('selected_color').style.background =
        `linear-gradient(180deg, 
    
        rgb(${Math.floor(Math.random()*255)},
        ${Math.floor(Math.random()*255)},
        ${Math.floor(Math.random()*255)}) 0%,
         
        rgb(${Math.floor(Math.random()*255)},
         ${Math.floor(Math.random()*255)},
         ${Math.floor(Math.random()*255)}) 60%, 
         
         rgb(${Math.floor(Math.random()*255)}
         ,${Math.floor(Math.random()*255)},
         ${Math.floor(Math.random()*255)}) 100%)`;

    }
    else{
        document.getElementById('selected_color').style.background= '';
        document.getElementById('selected_color').style.backgroundColor = selectedColor;

    }

    
}


function changeColor(e){
    
    if(e.type == "mouseover" && !mouseDown) return;
    
    if (mouseMode) document.querySelector('.container').style.cursor =  'none';

    if(rainbow){
        
        let rgb = `rgb(${Math.floor(Math.random()*255)},${Math.floor(Math.random()*255)},${Math.floor(Math.random()*255)})`;
       
            e.target.style.backgroundColor = rgb;
            brushSize(e);
          
    }
    else{
        if(!eraser){
        
        e.target.style.backgroundColor = selectedColor;
        
        e.target.setAttribute(`data-layer${selectedLayer}_value`,selectedColor);
       


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
        newDiv.setAttribute(`data-layer1_value`,`transparent`);
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
    cell.addEventListener('click', ()=> {selectedColor = cell.dataset.color ; changeColorpickScreen()});
    
})



for(let i = 0 ; i < canvasSizeX * canvasSizeY ; i++ ){
    
   build(i); 
   
}


