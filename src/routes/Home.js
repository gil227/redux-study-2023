import React, {useState} from 'react';
import {connect} from "react-redux";
import {actionCreators} from "./store";
const Home = ({state,dispatch}) => {
    const [txt,setTxt] = useState("");
    function onChange(e){
        setTxt(e.target.value);
    }
    function onSubmit(e){
        e.preventDefault();
        setTxt("");
        dispatch(addItem(text))
    }
    return (
        <>
            <h1>To do!</h1>
            <form onSubmit={onSubmit}>
                <input type="text" value={txt} onChange={onChange}/>
                <button>Add</button>
            </form>
            <ul></ul>
        </>
    )
}

function mapStateToProps (state) {
    return {state:state}
}

function mapDispatchToProps(dispatch){
    return {
        addItem:(text) => dispatch(actionCreators.addItem(text))
    }
}

export default connect(mapStateToProps,mapDispatchToProps) (Home);