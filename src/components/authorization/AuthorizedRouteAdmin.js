import React from "react";
import { connect } from "react-redux";
import { Redirect, Route } from "react-router";

const AuthorizedRouteAdmin = props => {
  if (props.roleId === 0 || props.roleId === 1) return <Redirect to="/app" />;
  return <Route {...props} />;
};

const mapStateToProps = (state) => ({
  roleId: state.loginSignUpReducer.roleId
});

export default connect(mapStateToProps)(AuthorizedRouteAdmin);