const screen = document.querySelector(".column2");
const small = document.querySelector(".column1");
const numbers = Array.from(document.querySelectorAll(".num")); 
const operators = Array.from(document.querySelectorAll(".op")); 

numbers.forEach( key =>{

    key.addEventListener("click" , e=>{

        screen.innerText = e.target.dataset.key;

    })


} )

operators.forEach(key => {

    key.addEventListener("click", e=> {
        small.innerText = e.target.dataset.key;
    })

})

console.log(operators)
console.log(numbers)

