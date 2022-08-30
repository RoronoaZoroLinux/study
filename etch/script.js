const continer = document.querySelector('.container');



function build(){

    let newDiv = document.createElement("div");

    newDiv.classList.add('newDiv');
    newDiv.addEventListener("mouseover" , e => { e.target.style.backgroundColor = `rgb(${Math.floor(Math.random()*255)},${Math.floor(Math.random()*255)},${Math.floor(Math.random()*255)})`});
    
    continer.appendChild(newDiv); 

}

for(let i = 0 ; i < 1800 ; i++ ){
    
   build(); 

}

