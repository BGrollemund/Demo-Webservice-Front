import React from "react";
import {CSSTransition, TransitionGroup} from "react-transition-group";
import {Redirect} from "react-router-dom";

import '../assets/css/App.css';

import Connector from "../connector/Connector";
import Recipe from "./Recipe";
import AddRecipeButton from "./AddRecipeButton";
import LogoutButton from "./LogoutButton";

class App extends React.Component {

    state = {
        goToAddRecipe: false,
        goToLogin: false,
        goToRecipeDetails: false,
        recipes: {},
        recipeTarget: 0,
        username: this.props.match.params.username,
        token: this.props.location.state.token,
        configHeader: { headers:
                { 'authorization': 'Bearer ' + this.props.location.state.token } }
    };

    componentDidMount() {
        Connector.get( `/api/my-recipes/${ this.state.username }`, this.state.configHeader )
            .then( res => {
                this.setState( { recipes: res.data.recipes } );
            } );
    };

    onRecipesClick = ( event ) => {
        if( event.target.parentElement.classList.contains('recipe_add') ) this.setState( { goToAddRecipe: true } );
        if( event.target.parentElement.classList.contains('logout') ) this.setState( { goToLogin: true } );
        if( event.target.parentElement.classList.contains('recipe') ) this.setState( {
            goToRecipeDetails: true,
            recipeTarget: event.target.parentElement.classList[1]
        } );
    };

    render() {
        if( this.state.goToAddRecipe ) {
            return <Redirect to = {
                {
                    pathname: '/add-recipe/',
                    state: {
                        username: this.state.username,
                        token: this.state.token
                    }
                }
            } />;
        }

        if( this.state.goToLogin ) {
            return <Redirect to = {
                {
                    pathname: '/'
                }
            } />;
        }

        if( this.state.goToRecipeDetails ) {
            return <Redirect to = {
                {
                    pathname: '/recipe-details/',
                    state: {
                        recipe_id: this.state.recipeTarget,
                        username: this.state.username,
                        token: this.state.token
                    }
                }
            } />;
        }


        const recipes = Object.keys(this.state.recipes).map( key => (
            <CSSTransition
                key={key}
                timeout={200}
                >
                <div className="recipe-box">
                    <Recipe
                        recipe= {this.state.recipes[key]}
                    />
                </div>
            </CSSTransition>
        ));

        return (
            <div>
                <div>
                    <TransitionGroup  className="recipe-list"  onClick={ this.onRecipesClick }>
                        <LogoutButton/>
                        <AddRecipeButton/>
                        { recipes }
                    </TransitionGroup>
                </div>
            </div>
        )
    }
}

export default App;