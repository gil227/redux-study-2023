import React from "react";
import { connect } from "react-redux";
import { actionCreators } from "../routes/store";
import { Link } from "react-router-dom";

function LiItem({ txt, delItem, id }) {
  return (
    <li>
      <Link to={`/${id}`}>{txt}</Link>
      <button onClick={delItem}>DEL</button>
    </li>
  );
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    delItem: () => dispatch(actionCreators.delItem(ownProps.id)),
  };
}

export default connect(null, mapDispatchToProps)(LiItem);
