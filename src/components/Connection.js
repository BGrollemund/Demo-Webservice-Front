import React from "react";
import {Redirect} from "react-router-dom";
import Connector from "../connector/Connector";

class Connection extends React.Component {

    state = {
        errorMsg: '',
        goToDashboard: false,
        password: '',
        token: '',
        username: ''
    };

    handleChange = ( event ) => {
        const name = event.target.name;
        const val = event.target.value;
        this.setState( { [name]: val } );
    };

    handleSubmit = ( event ) => {
        event.preventDefault();
        const login = {
            username: this.state.username,
            password: this.state.password
        };

        Connector.post("/api/login_check", login)
            .then( res => {
                this.setState({errorMsg: '', token: res.data.token, goToDashboard: true}); })
                .catch( err => { this.setState( {errorMsg: "wrong login or password"} );
        });
    };

    render() {
        if( this.state.goToDashboard ) {
            return <Redirect to = {
                {
                    pathname: `/user/${ this.state.username }`,
                    state: { token: this.state.token }
                }
            } />;
        }

        return (
            <div>
                <h1>Recipes Notepad</h1>
                <form onSubmit={ this.handleSubmit } className="form">
                    <label>{this.state.errorMsg}</label>
                    <input
                        onChange = { this.handleChange }
                        required
                        name="username"
                        placeholder= "username"
                        value={ this.state.username }
                        type="text"/>
                    <input
                        onChange = { this.handleChange }
                        required
                        name="password"
                        placeholder= "password"
                        value={ this.state.password }
                        type="password"/>
                    <button type="submit">Login</button>
                </form>
            </div>
        );
    }
}

export default Connection;