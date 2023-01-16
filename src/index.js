import {createStore} from "redux";

const add = document.getElementById('add');
const minus = document.getElementById('minus');
const number = document.getElementById('number');

const setReducer = (count = 0,action) =>{
    if(action.type === 'Add'){
        return count + 1;
    } else if(action.type === 'Mod'){
        return count - 1;
    } else return count;
};
const setCountStore = createStore(setReducer);
const setSubscribe = () =>{
    number.innerText = setCountStore.getState();
}
setCountStore.subscribe(setSubscribe);
const btnPlusHandler = () =>{
    setCountStore.dispatch({type:'Add'})
}
const btnMinusHandler = () =>{
    setCountStore.dispatch({type:'Mod'})
}

add.addEventListener('click', btnPlusHandler);
minus.addEventListener('click', btnMinusHandler);