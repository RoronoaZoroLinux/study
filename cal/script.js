const screen = document.querySelector(".column2");
const small = document.querySelector(".column1");
const numbers = Array.from(document.querySelectorAll(".num")); 
const operators = Array.from(document.querySelectorAll(".op")); 
let memslot1 = "";
let memslot2 = "";
let memslot3 = null;
let op_second = false;
let operation = null;



numbers.forEach( key =>{

    key.addEventListener("click" , e=>{
    
        
        if(op_second === true){
            if(memslot2.length < 10){
                
                memslot2 += e.target.dataset.key;
                screen.innerText = memslot2;
            }
            return;
        }
        
        if(memslot1.length < 10){
            
            small.innerText ="";
            memslot1 += e.target.dataset.key;
            screen.innerText = memslot1;
        }

    })


} )

const f_del = function(e){
    

if(op_second === true){
    let foo = Array.from(memslot2);
    foo.pop();
    memslot2 = foo.join('');
    
    if(memslot2.length == 0){
        screen.innerText = 0;
        return;
    }
    screen.innerText = memslot2;
    return;

}

let foo = Array.from(memslot1);
foo.pop();
memslot1 = foo.join('');

if(memslot1.length == 0){
    screen.innerText = 0;
    return;
}
screen.innerText = memslot1;

}

const f_plus = function(e){

op_second = true;
operation = "PLUS";
small.innerText = memslot1;

}

const f_result = function(){

switch(operation){

    case "PLUS":
        memslot3 = parseFloat(memslot1) + parseFloat(memslot2);
        screen.innerText = memslot3;
        break;

}

small.innerText = memslot1 + " + " + memslot2;

op_second = false;
memslot2 = "";
memslot1 = String(memslot3);


}
document.querySelector("[data-key='PLUS']").addEventListener("click" , f_plus);
document.querySelector("[data-key='DEL']").addEventListener("click" , f_del);
document.querySelector("[data-key='RESULT']").addEventListener("click" , f_result);
