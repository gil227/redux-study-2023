import {createStore} from "redux";

const ADD = "ADD";
const DEL = "DELETE";

const addItem = (txt) =>{
    return {
        type: ADD,
        txt
    }
}
const delItem = (id) =>{
    return {
        type: ADD,
        id
    }
}

const reducer = (state =[], action) =>{
    switch (action.type){
        case ADD :
            return [{txt:action.txt, id:Date.now()},...state];
        case DEL :
            return state.filter(item => item !== action.id);
        default : return state;
    }
}
const store = createStore(reducer);
export const actionCreators = {
    addItem,
    delItem
}

export default store;