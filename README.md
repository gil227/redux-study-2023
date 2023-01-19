# Redux Study(Vanilla)
1. 리덕스를 바닐라 js를 이용하여 사용하는 이유를 배운다.
2. 리액트를 환경에서 리덕스를 사용한다.

> 사전 지식은 리액트 기초와 리액트 훅에 관한 지식이 필요하다.

?? ~~리액트 훅을 다시 공부하고 다시 돌아오자....~~

# 1. Redux Store
리덕스에는 createStore라는 function이 있는데 data를 저장하는 store(보관소)를 만들어준다.

```js
//아래처럼 만든다.
const reducer = (state=0, action) => {
    if(action.type==='Hello'){
        return state +1;
    }
    return state;
}
const store = createStore(reducer);

//getState를 사용해서 data를 받아올 수 있다.
state.getState();
//dispatch를 쓰면 데이터를 넘겨줄 수 있다.(reducer함수의 인수로 받음 action)
//호출할때마다 reducer안에 있는 코드를 실행한다.
state.dispatch({type:'Hello'}); // 1
state.dispatch({type:'Hello'}); // 2
```
<br>

## 1.1 getState
getState를 사용해서 현재상태의 data(state)를 받아올 수 있다.

```
state.getState();
```

<br>

## 1.2 dispatch
dispatch를 쓰면 데이터를 인수값으로 넘겨줄 수 있다. 호출할때마다 reducer안에 있는 코드를 실행한다.

```
state.dispatch();
```

<br>

## 1.3 subscribe
subscribe는 data 값의 변화를 감지하여 함수를 실행한다.

```
//인수값으로 함수를 할당한다.
state.subscribe();
```

### 결과물
```js
import {createStore} from "redux";

const add = document.getElementById('add');
const minus = document.getElementById('minus');
const number = document.getElementById('number');


//값을 제어할 store
const setReducer = (count = 0,action) =>{
    if(action.type === 'Add'){
        return count + 1;
    } else if(action.type === 'Mod'){
        return count - 1;
    } else return count;
};
const setCountStore = createStore(setReducer);

//값을 HTML에 추가하는 f
const setSubscribe = () =>{
    number.innerText = setCountStore.getState();
}
setCountStore.subscribe(setSubscribe);

//값을 변화 시키는 핸들러
const btnPlusHandler = () =>{
    setCountStore.dispatch({type:'Add'})
}
const btnMinusHandler = () =>{
    setCountStore.dispatch({type:'Mod'})
}

add.addEventListener('click', btnPlusHandler);
minus.addEventListener('click', btnMinusHandler);
```

# TODO List 생성과 삭제 (2023.1.18)
dispatch를 이용해서 TODO를 생성하는것과 삭제를 만든다.
여기서 단순히 html상에서 만들고 삭제되는것은 데이터가 남지 않으므로
배열을 이용해서 데이터 스택을 만든다.

```js
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
            return [{val:action.val, id:Date.now()},...state]
        case MOD:
            //filter 속성은 참인 값으로 구성된 새로운 배열을 생성한다.
            //이걸 이용하여 state에 존재하는 배열에서 해당하는(지우고싶은) 요소를 빼낸다.
            //그리고 그 뺴낸요소로 배열을 만드는데 필요 없는 배열이다.
            return state.filter(dataItem => dataItem.id !== action.id)
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
```