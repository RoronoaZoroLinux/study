
let layer_created = false;

document.querySelector('#btn_layer_1').disabled = 'true';
document.querySelector('#btn_layer_2').disabled = 'true';

function createLayer(){
    
    if(layer_created) return;

    Array.from(document.querySelectorAll('[data-serial]')).forEach(cell => {

        cell.dataset.layerid = cell.dataset.serial;
        
        
    })
   
    document.querySelector('#btn_create_layer').disabled = 'true';
 
    document.querySelector('#btn_layer_1').disabled = false;
    document.querySelector('#btn_layer_2').disabled = false;
    document.querySelector('#btn_layer_2').style.border = '5px blue solid';
}

document.querySelector('#btn_create_layer').addEventListener('click' , createLayer);

document.querySelector('#btn_layer_1').addEventListener('click' , e=> {

    Array.from(document.querySelectorAll('[data-layerid]')).forEach(cell => {

        cell.style.display ='none';

    })

    document.querySelector('#btn_layer_1').style.border = '5px blue solid';
    document.querySelector('#btn_layer_2').style.border = 'none';

});

document.querySelector('#btn_layer_2').addEventListener('click' , e=> {

    Array.from(document.querySelectorAll('[data-layerid]')).forEach(cell => {

        cell.style.display ='inline-block';
   
    })

    document.querySelector('#btn_layer_2').style.border = '5px blue solid';
    document.querySelector('#btn_layer_1').style.border = 'none';

});
