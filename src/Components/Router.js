import PropTypes from "prop-types";
import React from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Main from "../Routes/Main"

const MainRoute = () => (
    <>
        <Route exact path="/" component={Main} />
    </>
);

// isLoggedIn: Dummy variable that is not currently in use. Just a placeholder for future uses
const AppRouter = ({ isLoggedIn }) => <Router><Switch> <MainRoute /> </Switch></Router>;

Router.PropTypes = {
    isLoggedIn: PropTypes.bool
}

export default AppRouter;