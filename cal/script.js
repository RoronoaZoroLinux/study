const screen = document.querySelector(".column2");
const small = document.querySelector(".column1");
const numbers = Array.from(document.querySelectorAll(".num")); 
const operators = Array.from(document.querySelectorAll(".op")); 

let memslot1 = "";
let memslot2 = "";
let memslot3 = "";
let symbol = "";
let op_second = false;
let operation = null;

numbers.forEach( key =>{

    key.addEventListener("click" , e=>{
        if(op_second === true){

                memslot2 += e.target.dataset.key;
                screen.innerText = memslot2;
        
            return;
        }
            small.innerText ="";
            memslot1 += e.target.dataset.key;
            screen.innerText = memslot1;
    })
} );

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

};

const f_func = function(e){

f_rmdot();
if(op_second === true) return;
if(memslot1 == "") memslot1 = 0;

memslot2 = "";

operation = e.target.dataset.key;
symbol = e.target.innerText;

op_second = true;
small.innerText = memslot1+" "+symbol;
screen.innerText = "0";
};

const f_result = function(){

if(!op_second) return;
f_undef2f();

switch(operation){

    case "PLUS":
        memslot3 = (parseFloat(memslot1) + parseFloat(memslot2)).toFixed(4);
        break;
        
    case "MINUS":
        memslot3 = (parseFloat(memslot1) - parseFloat(memslot2)).toFixed(4);
        break;

    case "DIVIDE":
        if(memslot2 == 0) memslot2 = 1;

        memslot3 = (parseFloat(memslot1) / parseFloat(memslot2)).toFixed(4);
        break;

    case "MULTIPLY":
        memslot3 = (parseFloat(memslot1) * parseFloat(memslot2)).toFixed(4);
        break;
}

f_regex();
f_rmdot();

screen.innerHTML = memslot3;
small.innerText = memslot1 +` ${symbol} `+ memslot2;
op_second = false;
memslot1 = String(memslot3);
};

const f_regex = function(){
    memslot3 = memslot3.replace(/(0*$)/, "");
    if(memslot3.at(-1) == "."){
        memslot3 = memslot3.replace(/\./, "");
    }
};

const f_undef2f = function(){
    if(memslot1 == "" || memslot1 == undefined || memslot1 == null){
        memslot1 = "0";
    }
    if(memslot2 == "" || memslot2 == undefined || memslot2 == null){
        memslot2 = "0";
    }
};

const f_pm = function(){

if(screen.innerText == "0") return;

if(op_second == true){

memslot2 = String(-memslot2);
screen.innerText = memslot2;
return
}

memslot1 = String(-memslot1);
screen.innerText = memslot1;
};

const f_c = function(){
    location.reload();
};

const f_percent = function(){

if(op_second == true){
    memslot2 = (memslot1/100).toFixed(4);
    memslot2 = memslot2.replace(/(0*$)/, "");
    screen.innerText = memslot2;
}

};

const f_dot = function(){

if(op_second === true && !memslot2.includes(".")){
    if(memslot2 == "") memslot2=0;
    memslot2 = String(memslot2) + ".";
    screen.innerText = memslot2;
}
if(op_second === false && !memslot1.includes(".")){
    if(memslot1 == "") memslot1=0;
    memslot1 = String(memslot1) + ".";
    screen.innerText = memslot1;
}
}

const f_rmdot = function(){
    
    memslot1 = memslot1.replace(/(0*$)/, "");
    memslot2 = memslot2.replace(/(0*$)/, "");

    if(memslot1.at(-1) == "."){
        memslot1 = memslot1.replace(/\./, "");
    }
    if(memslot2.at(-1) == "."){
        memslot2 = memslot1.replace(/\./, "");
    }
}

document.querySelectorAll(".FUNC").forEach( key => {
    key.addEventListener("click" , f_func);
});

document.querySelector("[data-key='DEL']").addEventListener("click" , f_del);
document.querySelector("[data-key='RESULT']").addEventListener("click" , f_result);
document.querySelector("[data-key='PM']").addEventListener("click" , f_pm);
document.querySelector("[data-key='C']").addEventListener("click" , f_c);
document.querySelector("[data-key='PERCENT']").addEventListener("click" , f_percent);
document.querySelector("[data-key='DOT']").addEventListener("click" , f_dot);