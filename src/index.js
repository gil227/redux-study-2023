const add = document.getElementById('add');
const minus = document.getElementById('minus');
const number = document.getElementById('number');

let count = 0;
number.innerText = count;

const updateNumber = () =>{
    number.innerText = count;
}
const btnPlusHandle = () =>{
    count = count + 1;
    updateNumber();
}
const btnMinusHandle = () =>{
    count = count - 1;
    updateNumber();
}

add.addEventListener('click', btnPlusHandle);
minus.addEventListener('click', btnMinusHandle);