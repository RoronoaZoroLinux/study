//document.querySelector(`[data-toggle="${selectedLayer}"]`).getAttribute(`data-layer${selectedLayer}_visible`)  == 'false'
let layer_count = 1;
let selectedLayer = 1;
function createLayer(){
    

    Array.from(document.querySelectorAll('[data-serial]')).forEach(cell => {


        cell.setAttribute(`data-layer${layer_count}_value`,`transparent`);
        cell.setAttribute(`data-l${layer_count}_h`,`false`);
        
    })
   
    createLayerButton();
}



document.querySelector('#btn_create_layer').addEventListener('click' , createLayer);

    function createLayerButton(){
        
        let container = document.createElement('div');
        let newlayer = document.createElement('div');
        let disablelayer = document.createElement('div');

        container.classList.add('layercontainer');
        
        disablelayer.classList.add('disablelayer');
        disablelayer.setAttribute(`data-layer${layer_count}_visible` , "true");
        disablelayer.setAttribute('data-toggle',layer_count);
        disablelayer.addEventListener('click', toggleLayer);

        newlayer.classList.add('div_button');
        newlayer.setAttribute('data-layer',layer_count);
        newlayer.innerText ="layer"+ (layer_count);
        newlayer.addEventListener('click' , selectLayer);
        newlayer.addEventListener('dblclick' , e=> e.target.innerText = 'test');
        
        container.appendChild(newlayer);
        container.appendChild(disablelayer);

        document.querySelector('.layerbox').appendChild(container);
    
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

//refreshLayer();
}


function findcolor(div , lc){
    
    let a = div.getAttribute(`data-layer${lc}_value`);
    let b = div.getAttribute(`data-l${lc}_h`);
    
  
        if( a == 'transparent' || b == 'true' ){
       
            if((lc - 1) > 0){

            findcolor(div , (lc - 1) )

            }
            else{
                
                div.style.backgroundColor = "transparent";
                
            }
        }
        else {
            
            div.style.backgroundColor = a;
            
        }


 

}

function refreshLayer(){


    Array.from(document.querySelectorAll('[data-serial]')).forEach( div => {
        
                div.style.backgroundColor = 'transparent';
                findcolor(div,(layer_count-1));
                 

    });
/*

                if(document.querySelector(`[data-toggle="${selectedLayer}"]`).getAttribute(`data-layer${selectedLayer}_visible`)  == 'false'){

                    div.style.backgroundColor = 'transparent';
                
                }

            

        for(let i = 0 ; i < selectedLayer ; i++){
            
            let a = document.querySelector(`[data-layer${Number(i+1)}_visible]`).getAttribute(`data-layer${Number(i+1)}_visible`);
            
            
            if ( a == "true" && div.getAttribute(`data-layer${Number(i+1)}_value`) != 'transparent') {
               
                div.style.backgroundColor = 'transparent';
                div.style.backgroundColor = div.getAttribute(`data-layer${Number(i+1)}_value`);
    
            }
        }
    
    } )
    */

}

function toggleLayer(e){

let layer  = e.target.getAttribute('data-toggle');
let check = e.target.getAttribute(`data-layer${layer}_visible`);

let divs = Array.from(document.querySelectorAll('.newDiv')) ;

if(check == "true"){
e.target.setAttribute(`data-layer${layer}_visible` , "false");
divs.forEach( div => { div.setAttribute(`data-l${layer}_h`, 'true') ;})
e.target.style.backgroundColor = 'black';
}
else if(check == "false"){
e.target.setAttribute(`data-layer${layer}_visible` , "true");
divs.forEach( div => { div.setAttribute(`data-l${layer}_h`, 'false') ;})
e.target.style.backgroundColor = 'green';

}

refreshLayer();


}



/////////////////////////////////////////////////////////
//             EXPERIMENTAL AREA                       //
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
document.getElementById('btn_eraser').addEventListener('click' , e=>{ eraser = true; rainbow = false; });
document.getElementById('btn_grid').addEventListener('click', toggleGrid);
document.getElementById('btn_clear').addEventListener('click', clear);
document.getElementById('btn_mouseMode').addEventListener('click' , e=>{ if(mouseMode) mouseMode =false; else{mouseMode = true;} });

let canvasSizeX = 20;
let canvasSizeY = 20;
let size_newDiv = 25;

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
       
        e.target.setAttribute(`data-layer${selectedLayer}_value`,rgb);
        refreshLayer();
          
    }
    else{
        if(!eraser){
        
          
        if( document.querySelector(`[data-toggle="${selectedLayer}"]`).getAttribute(`data-layer${selectedLayer}_visible`)  == 'false'){
            //alert('you cant draw on a hidden layer')
            return;
        }
        
        e.target.setAttribute(`data-layer${selectedLayer}_value`,selectedColor);
       refreshLayer();


        }
        else{
            e.target.setAttribute(`data-layer${selectedLayer}_value`,'transparent');
            refreshLayer();
        }
    }



}

function clear(){

    Array.from(document.querySelectorAll('.newDiv')).forEach( element => {
        element.setAttribute(`data-layer${selectedLayer}_value`,'transparent')
      } );
      refreshLayer();
}

function build(i){

        let newDiv = document.createElement("div");
        newDiv.classList.add('newDiv');
        newDiv.dataset.serial = i;
        newDiv.style.height = size_newDiv + "px";
        newDiv.style.width = size_newDiv + "px";
        newDiv.setAttribute(`data-layer1_value`,`transparent`);
        newDiv.setAttribute(`data-l1_h`,`false`); 
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



