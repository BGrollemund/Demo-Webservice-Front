import React from "react";
import ReactDom from "react-dom";
import {BrowserRouter, Route, Switch} from "react-router-dom";

import "./assets/css/App.css";

import AddRecipe from "./components/AddRecipe";
import App from "./components/App";
import Connection from "./components/Connection";
import NotFound from "./components/NotFound";
import RecipeDetails from "./components/RecipeDetails";
import ModifyRecipe from "./components/ModifyRecipe";

const Root = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Connection} />
                <Route path="/user/:username" component={App} />
                <Route path="/add-recipe/" exact component={AddRecipe} />
                <Route path="/modify-recipe/" exact component={ModifyRecipe} />
                <Route path="/recipe-details/" exact component={RecipeDetails} />
                <Route component={NotFound} />
            </Switch>
        </BrowserRouter>
    );
};

ReactDom.render(
    <Root/>,
    document.querySelector('#root')
);
