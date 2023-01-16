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