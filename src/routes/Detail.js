import React from "react";
import { connect } from "react-redux";
function Detail({ id }) {
  return <h1>{id}</h1>;
}

function mapStateToProps(state, ownProps) {
  const {
    match: {
      params: { id },
    },
  } = ownProps;
  return {
    id: id,
  };
}

export default connect(mapStateToProps)(Detail);
