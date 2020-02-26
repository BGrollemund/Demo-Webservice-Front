import React from "react";
import ReactDom from "react-dom";
import {BrowserRouter, Route, Switch} from "react-router-dom";

import "./App.css";

import App from "./components/App";
import Connection from "./components/Connection";
import NotFound from "./components/NotFound";

const Root = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Connection} />
                <Route path="/user/:user" component={App} />
                <Route component={NotFound} />
            </Switch>
        </BrowserRouter>
    );
};

ReactDom.render(
    <Root/>,
    document.querySelector('#root')
);
