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
    let deletelayer = document.createElement('div');
    
    let up = document.createElement('div');
    let down = document.createElement('div');
    let udc = document.createElement('div');
    
    up.classList.add('up');
    up.dataset.updown = layer_count;
    down.dataset.updown = layer_count;
    down.classList.add('down');
    udc.classList.add('udc');
    
    up.addEventListener('click' , layerup );
    down.addEventListener('click' , layerdown );
    
    udc.appendChild(up);
    udc.appendChild(down);
    
    container.classList.add('layercontainer');
        container.dataset.lcont = layer_count;
        
        disablelayer.classList.add('disablelayer');
        disablelayer.setAttribute(`data-layer${layer_count}_visible` , "true");
        disablelayer.setAttribute('data-toggle',layer_count);
        disablelayer.addEventListener('click', toggleLayer);
        
        deletelayer.classList.add('deletelayer');
        deletelayer.setAttribute(`data-delete` , `${layer_count}`);
        deletelayer.addEventListener('click' , f_deletelayer)
        
        newlayer.classList.add('div_layer_button');
        newlayer.setAttribute('data-layer',layer_count);
        newlayer.innerText ="layer"+ (layer_count);
        newlayer.addEventListener('click' , selectLayer);
        newlayer.addEventListener('dblclick' , e=>{ 
            let foo = prompt("Change Layer Name: " , e.target.innerText);
            if ( foo.trim().length === 0 ){
                foo = `layer${selectedLayer}`;
            }
            e.target.innerText = foo.toLowerCase();
        });
        
        container.appendChild(newlayer);
        container.appendChild(disablelayer);
        container.appendChild(deletelayer);
        container.appendChild(udc);
        
        document.querySelector('.layerbox').appendChild(container);
        
        layer_count++;
        
    }
    
    function create_change_layer(num , name ,bool ,appendindex){
        console.log(appendindex);
        let container = document.createElement('div');
        let newlayer = document.createElement('div');
        let disablelayer = document.createElement('div');
        let deletelayer = document.createElement('div');
    
        let up = document.createElement('div');
        let down = document.createElement('div');
        let udc = document.createElement('div');
    
        up.classList.add('up');
        up.dataset.updown = num;
        down.dataset.updown = num;
        down.classList.add('down');
        udc.classList.add('udc');
    
        up.addEventListener('click' , layerup );
        down.addEventListener('click' , layerdown );
    
        udc.appendChild(up);
        udc.appendChild(down);
    
        container.classList.add('layercontainer');
        container.dataset.lcont = num;
        
        disablelayer.classList.add('disablelayer');
        disablelayer.setAttribute(`data-layer${num}_visible` , `${bool}`);
        disablelayer.setAttribute('data-toggle',num);
        disablelayer.addEventListener('click', toggleLayer);
    
        deletelayer.classList.add('deletelayer');
        deletelayer.setAttribute(`data-delete` , `${num}`);
        deletelayer.addEventListener('click' , f_deletelayer)
    
        newlayer.classList.add('div_layer_button');
        newlayer.setAttribute('data-layer',num);
        newlayer.innerText =name;
        newlayer.addEventListener('click' , selectLayer);
        newlayer.addEventListener('dblclick' , e=>{ 
            let foo = prompt("Change Layer Name: " , e.target.innerText);
            if ( foo.trim().length === 0 ){
               foo = `layer${selectedLayer}`;
            }
                e.target.innerText = foo.toLowerCase();
        });
        
        container.appendChild(newlayer);
        container.appendChild(disablelayer);
        container.appendChild(deletelayer);
        container.appendChild(udc);
    
        let append = document.querySelector(`[data-lcont = "${appendindex}"]`);
        append.after(container);
        
    }
    function layerup(e){
        
    let clickedlayer = e.target.dataset.updown;
    let this_index;
    let layers = Array.from(document.querySelectorAll('[data-lcont]'));
    
    layers.forEach( function find(layer , index) {
        
        if(layer.dataset.lcont == clickedlayer){
            this_index = index;
        }
    });
    
    
    if(this_index == 0) {
        console.log(this_index)
        return;
    }

    let target_index = this_index-1;
    let ap1 = layers[this_index-2];
    let apnum = ap1.dataset.lcont;
    let this_layer = layers[this_index];
    let target_layer = layers[target_index]


    
    //get this layer
    ///////////////////////////////////////////////////////////////////////
    
    let thisnum = this_layer.dataset.lcont;
    let thisname = this_layer.querySelector(".div_layer_button").innerText;
    let thisbool = this_layer.querySelector(".disablelayer").getAttribute(`data-layer${clickedlayer}_visible`);

    ///////////////////////////////////////////////////////////////

    //get target layer 
    
    let targetnum  = target_layer.dataset.lcont;
    let targetname = target_layer.querySelector(".div_layer_button").innerText;
    let targetbool = target_layer.querySelector(".disablelayer").getAttribute(`data-layer${targetnum}_visible`);

    ////////////////////////////////////////
    //set this layer
    //crthis = document.createElement("div");
    this_layer.dataset.lcont = targetnum;
    this_layer.querySelector(".div_layer_button").innerText = targetname;
    this_layer.querySelector(".div_layer_button").dataset.layer = targetnum;
    this_layer.querySelector(".disablelayer").setAttribute(`data-layer${targetnum}_visible` ,targetbool);
    this_layer.querySelector(".disablelayer").dataset.toggle = targetnum;
    this_layer.querySelector(".deletelayer").dataset.delete = targetnum;
    this_layer.querySelector(".up").dataset.updown = targetnum;

    
    ////////////////////////////////////////
    //set target layer

    target_layer.dataset.lcont = thisnum;
    target_layer.querySelector(".div_layer_button").innerText = thisname;
    target_layer.querySelector(".div_layer_button").dataset.layer = thisnum; 
    target_layer.querySelector(".disablelayer").setAttribute(`data-layer${clickedlayer}_visible`, thisbool);  
    target_layer.querySelector(".disablelayer").dataset.toggle = thisnum; 
    target_layer.querySelector(".deletelayer").dataset.delete = thisnum; 
    this_layer.querySelector(".up").dataset.updown = thisnum; 

    /////////////////////////////////////
    // cahnge blocks

    let divs = Array.from(document.querySelectorAll(".newDiv"));
    
    divs.forEach( div => {

        let this1 = div.getAttribute(`data-layer${clickedlayer}_value`);
        let this2 = div.getAttribute(`data-l${clickedlayer}_h`);
        let target1 = div.getAttribute(`data-layer${targetnum}_value`);
        let target2 = div.getAttribute(`data-l${targetnum}_h`);
        
        div.setAttribute(`data-layer${clickedlayer}_value` , target1);
        div.setAttribute(`data-l${clickedlayer}_h` , target2);
        
        div.setAttribute(`data-layer${targetnum}_value` , this1);
        div.setAttribute(`data-l${targetnum}_h` , this2);

    })
    document.querySelector(".layerbox").removeChild(document.querySelector(`[data-lcont = '${clickedlayer}']`));
    document.querySelector(".layerbox").removeChild(document.querySelector(`[data-lcont = '${targetnum}']`));
  

    create_change_layer(thisnum,thisname,thisbool,apnum);
    create_change_layer(targetnum,targetname,targetbool,thisnum);
   
    refreshLayer();
}    


function layerdown(e){
    
    
    if(e.target.dataset.updown == layer_count-1){
        console.log("too down");
        
    }
}

function f_deletelayer(e){
    let a = e.target.dataset.delete;
    let layerbox = document.querySelector(".layerbox");
    layerbox.removeChild(layerbox.querySelector(`[data-lcont = '${e.target.dataset.delete}']`))
    
    Array.from(document.querySelectorAll(".newDiv")).forEach( div => {
        div.removeAttribute(`data-layer${a}_value`);
        div.removeAttribute(`data-l${a}_h`);


    })
    refreshLayer();

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
    



        if( a == 'transparent' || b == 'true' || a == null){
       
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

let canvasSizeX = 50;
let canvasSizeY = 10;
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



