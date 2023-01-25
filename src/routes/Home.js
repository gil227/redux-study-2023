import React, {useState} from 'react';
import {connect} from "react-redux";
import {actionCreators} from "./store";
const Home = ({state,addItem}) => {
    const [txt,setTxt] = useState("");
    function onChange(e){
        setTxt(e.target.value);
    }
    function onSubmit(e){
        e.preventDefault();
        setTxt("");
        addItem(txt)
    }
    return (
        <>
            <h1>To do!</h1>
            <form onSubmit={onSubmit}>
                <input type="text" value={txt} onChange={onChange}/>
                <button>Add</button>
            </form>
            <ul>{JSON.stringify(state)}</ul>
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