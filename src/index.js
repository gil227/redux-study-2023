import {createStore} from "redux";

const getForm = document.querySelector('form');
const getInput = document.querySelector('.inputVal');
const getUl = document.querySelector('.LiWrap');

const ADD = "Add";
const MOD = "Mod";

const onAdd = (data) =>{
    return {type:ADD, val:data}
}
const onDel = (id) =>{
    return {type:MOD, id}
}
const setReducer = (state = [],action) =>{
    switch(action.type){
        case ADD:
            //push 하지말고(string 요소로 넣지말고)
            //무조건 object(Array) 요소로 만들자.!
            //스프레드 문법으로 state를 복사 하지 않으면 각각의 Array로 저장됨.(state로 데이터 스택을 쌓을수있다.)
            const setCreateObj = {val:action.val, id:Date.now()};
            return [setCreateObj,...state]
        case MOD:
            //filter 속성은 참인 값으로 구성된 새로운 배열을 생성한다.
            //이걸 이용하여 state에 존재하는 배열에서 해당하는(지우고싶은) 요소를 빼낸다.
            //그리고 그 뺴낸요소로 배열을 만드는데 필요 없는 배열이다.
            const setDeleteObj = state.filter(dataItem => dataItem.id !== action.id);
            return setDeleteObj;
        default : return state;
    }
};
const setDataStore = createStore(setReducer);

const onDispatchAdd = (data) =>{
    setDataStore.dispatch(onAdd(data));
}
const onDispatchDel = (e) =>{
    const getDelTarget = parseInt(e.target.parentNode.id);
    setDataStore.dispatch(onDel(getDelTarget));
}

const onPaint = () =>{
    const getData = setDataStore.getState();
    getUl.innerHTML = '';
    getData.forEach(data=>{
        const createLi = document.createElement('li');
        const createBtn = document.createElement('button');
        createBtn.innerHTML = 'Del';
        createLi.id = data.id;
        createLi.innerText = data.val;
        getUl.appendChild(createLi);
        createLi.appendChild(createBtn);
        createBtn.addEventListener('click',onDispatchDel);
    });
}
setDataStore.subscribe(()=>console.log(setDataStore.getState()));
setDataStore.subscribe(onPaint);

const onSubmit = (e) =>{
    e.preventDefault();
    const inputValue = getInput.value;
    getInput.value = '';
    onDispatchAdd(inputValue);
}

getForm.addEventListener('submit',onSubmit);