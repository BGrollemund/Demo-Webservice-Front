import React from "react";
import {CSSTransition, TransitionGroup} from "react-transition-group"

import '../App.css';

import Connector from "../connector/Connector";
import Recipe from "./Recipe";


class App extends React.Component {

    state = {
        recipes: {},
        username: this.props.match.params.username,
        configHeader: { headers:
                { 'authorization': 'Bearer ' + this.props.location.state.token } }
    };

    messageRef = React.createRef();

    componentDidMount() {
        Connector.get(`/api/recipes`, this.state.configHeader )
            .then( res => {
                this.setState( {recipes: res.data['hydra:member']} );
            } );
    };

    componentDidUpdate(prevProps, prevState, snapshot) {
        const ref = this.messageRef.current;
        ref.scrollTop = ref.scrollHeight;
    };

    render() {
        console.log(this.state.recipes);
        const recipes = Object.keys(this.state.recipes).map( key => (
            <CSSTransition
                key={key}
                timeout={200}
            >
                <Recipe
                    recipe={this.state.recipes[key].title}
                />
            </CSSTransition>
        ));

        return (
            <div>
                <div ref={this.messageRef}>
                    <TransitionGroup>
                        { recipes }
                    </TransitionGroup>
                </div>
            </div>
        )
    }
}

export default App;