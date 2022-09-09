const screen = document.querySelector(".column2");
const small = document.querySelector(".column1");
const numbers = Array.from(document.querySelectorAll(".num")); 
const operators = Array.from(document.querySelectorAll(".op")); 
let memslot1 = "";
let memslot2 = "";
let memslot3 = "";
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
small.innerText ="";
let foo = Array.from(memslot1);
foo.pop();
memslot1 = foo.join('');

if(memslot1.length == 0){
    screen.innerText = 0;
    return;
}
screen.innerText = memslot1;

}

const f_func = function(e){
memslot2 = "";
operation = e.target.dataset.key;
    if(op_second === true){
     f_result();
     return;
    }
op_second = true;
small.innerText = memslot1;
screen.innerText = "0";
}

let regex

const f_result = function(){

f_undef2f();

switch(operation){

    case "PLUS":
        memslot3 = (parseFloat(memslot1) + parseFloat(memslot2)).toFixed(4);
        f_regex();
        screen.innerText = memslot3;
        small.innerText = memslot1 + " + " + memslot2;
        break;
        
    case "MINUS":
        memslot3 = (parseFloat(memslot1) - parseFloat(memslot2)).toFixed(4);
        f_regex();
        screen.innerText = memslot3;
        small.innerText = memslot1 + " - " + memslot2;
        break;

    case "DIVIDE":
        if(memslot2 == 0) memslot2 = 1;

        memslot3 = (parseFloat(memslot1) / parseFloat(memslot2)).toFixed(4);
            f_regex();

        screen.innerText = memslot3;
        small.innerText = memslot1 + " ÷ " + memslot2;
        break;

    case "MULTIPLY":
        memslot3 = (parseFloat(memslot1) * parseFloat(memslot2)).toFixed(4);
            f_regex();
        screen.innerHTML = memslot3;
        small.innerText = memslot1 + " × " + memslot2;
        break;

}



op_second = false;
memslot1 = String(memslot3);



}

const f_regex = function(){
    memslot3 = memslot3.replace(/(0*$)/, "");
    if(memslot3.at(-1) == "."){
        memslot3 = memslot3.replace(/\./, "");
    }

}

const f_undef2f = function(){
    if(memslot1 == "" || memslot1 == undefined || memslot1 == null){
        memslot1 = "0";
    }
    if(memslot2 == "" || memslot2 == undefined || memslot2 == null){
        memslot2 = "0";
    }
}

document.querySelectorAll(".FUNC").forEach( key => {
    key.addEventListener("click" , f_func);
} )
document.querySelector("[data-key='DEL']").addEventListener("click" , f_del);
document.querySelector("[data-key='RESULT']").addEventListener("click" , f_result);
