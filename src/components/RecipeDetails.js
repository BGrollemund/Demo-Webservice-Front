import React from "react";
import Connector from "../connector/Connector";
import {Redirect} from "react-router-dom";
import {CSSTransition, TransitionGroup} from "react-transition-group";
import RNUtils from "./RNUtils";

class RecipeDetails extends React.Component {
    state = {
        goToList: false,
        goToModify: false,
        ingredients: [],
        ingredientsLabel: [],
        medium: {},
        recipe: {},
        recipe_id: this.props.location.state.recipe_id,
        steps: [],
        stepsLabel: [],
        token: this.props.location.state.token,
        username: this.props.location.state.username
    };

    componentDidMount() {
        Connector.get( `/api/recipe-full-infos/${ this.state.recipe_id }`, { headers: { Authorization: "Bearer " + this.state.token } } )
            .then( res => {
                this.setState( {
                    goToList: false,
                    ingredients: res.data.ingredients,
                    ingredientsLabel: res.data.ingredientsLabel,
                    medium: res.data.medium,
                    recipe: res.data.recipe,
                    steps: res.data.steps,
                    stepsLabel: res.data.stepsLabel
                } );
            } );
    };

    onRecipeCmdClick = ( event ) => {
        if( event.target.classList.contains('back-to-list') ) this.setState( { goToList: true } );
        if( event.target.classList.contains('recipe-modify') ) this.setState( { goToModify: true } );

        if( event.target.classList.contains('recipe-delete') ) {
            Connector.delete( `/api/recipes/${ this.state.recipe_id }`, { headers: { Authorization: "Bearer " + this.state.token } } )
                .then( res => {
                    this.setState( { goToList: true } );
                } );
        }
    };

    render() {
        let
            bakingDuration = '',
            ingredients = '',
            preparationDuration = '',
            steps = '';

        if( this.state.goToList ) {
            return <Redirect to = {
                {
                    pathname: `/user/${ this.state.username }`,
                    state: { token: this.state.token }
                }
            } />;
        }

        if( this.state.goToModify ) {
            return <Redirect to = {
                {
                    pathname: '/modify-recipe/',
                    state: {
                        recipe: this.state.recipe,
                        username: this.state.username,
                        token: this.state.token
                    }
                }
            } />;
        }

        if( this.state.recipe.preparationDuration ) {
            bakingDuration = 'Baking Duration : ' + RNUtils.properTime( this.state.recipe.bakingDuration );
            preparationDuration = 'Preparation Duration : ' + RNUtils.properTime( this.state.recipe.preparationDuration );
        }

        if( this.state.ingredients ) {
            for( let i=0; i<this.state.ingredients.length; i++ ) {
                ingredients = Object.keys(this.state.ingredients).map( key => (
                    <CSSTransition key={key} timeout={200}>
                        <div>
                            { this.state.ingredients[key].quantity } { this.state.ingredientsLabel[key].label }
                        </div>
                    </CSSTransition>
                ));
            }
        }

        if( this.state.steps ) {
            for( let i=0; i<this.state.steps.length; i++ ) {
                steps = Object.keys(this.state.steps).map( key => (
                    <CSSTransition key={key} timeout={200}>
                        <div>
                            <div>
                                { this.state.steps[key].stepOrder } { this.state.stepsLabel[key].label }
                            </div>
                            <div>
                                { this.state.stepsLabel[key].description }
                            </div>
                        </div>
                    </CSSTransition>
                ));
            }
        }

        return (
            <div>
                <h1>{this.state.recipe.title}</h1>
                <div className="recipe-details">
                    <div className="recipe-infos-box">
                        <div className="recipe-infos">
                            <div>{ preparationDuration }</div>
                            <div>{ bakingDuration }</div>
                            <div className="additional-infos">{ this.state.recipe.additionalInfos }</div>
                            <div className={"stars_"+this.state.recipe.ratingStars}></div>
                            <div>
                                <img
                                    src={process.env.PUBLIC_URL + '/images/recipes/'+this.state.medium.filename}
                                    alt={"recipe : "+this.state.recipe.title} />
                            </div>
                        </div>
                    </div>
                    <div className="recipe-ingredients-box">
                        <div className="recipe-ingredients">
                            <h2>Ingredients</h2>
                            <TransitionGroup>
                                { ingredients }
                            </TransitionGroup>
                        </div>
                    </div>
                    <div className="recipe-steps-box">
                        <div className="recipe-steps">
                            <h2>Steps</h2>
                            <TransitionGroup>
                                { steps }
                            </TransitionGroup>
                        </div>
                    </div>
                    <div className="recipe-cmd-box">
                        <div className="recipe-cmd" onClick={ this.onRecipeCmdClick }>
                            <button className="back-to-list">Back to list</button>
                            <button className="recipe-modify">Modify</button>
                            <button className="recipe-delete">Delete</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default RecipeDetails;