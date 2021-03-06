import React from "react";
import Connector from "../connector/Connector";
import {Redirect} from "react-router-dom";

class AddRecipe extends React.Component {
    state = {
        additional_infos: '',
        baking_duration: '00:00',
        errorMsg: '',
        preparation_duration: '00:00',
        rating_stars: 1,
        returnToList: false,
        title: '',
        username: this.props.location.state.username,
        user_id: 0,
        token: this.props.location.state.token
    };

    handleChange = ( event ) => {
        const name = event.target.name;
        const val = event.target.value;
        this.setState( { [name]: val } );
    };

    handleSubmit = ( event ) => {
        event.preventDefault();

        Connector.post(`/api/id-by-user/${this.state.username}`, '' , { headers: { Authorization: "Bearer " + this.state.token } } )
            .then( res => {
                this.setState({errorMsg: '', user_id: res.data.id });

                const jsonData = {
                    title: this.state.title,
                    preparationDuration: this.state.preparation_duration,
                    bakingDuration: this.state.baking_duration,
                    additionalInfos: this.state.additional_infos,
                    ratingStars: this.state.rating_stars,
                    user: `api/users/${this.state.user_id}`
                };

                Connector.post("/api/recipes", jsonData,  { headers: { Authorization: "Bearer " + this.state.token } } )
                    .then( res => {
                        this.setState({errorMsg: '', returnToList: true}); })
                    .catch( err => { this.setState( {errorMsg: "please check values"} );
                    });

            })
            .catch( err => { this.setState( {errorMsg: "please check values"} );
            });

    };

    onCmdClick = () => {
        this.setState( { returnToList: true } );
    };

    render() {
        if( this.state.returnToList ) {
            return <Redirect to = {
                {
                    pathname: `/user/${ this.state.username }`,
                    state: { token: this.state.token }
                }
            } />;
        }

        return (
            <div>
                <h1>Add a recipe</h1>
                <form onSubmit={ this.handleSubmit } className="form add-form">
                    <label>{this.state.errorMsg}</label>
                    <input
                        onChange = { this.handleChange }
                        required
                        name="title"
                        placeholder= "title"
                        value={ this.state.title }
                        type="text"/>
                    <label>Rate your recipe :</label>
                    <select>
                        <option value="1">1 star</option>
                        <option value="2">2 stars</option>
                        <option value="3">3 stars</option>
                        <option value="4">4 stars</option>
                        <option value="5">5 stars</option>
                    </select>
                    <label>Preparation duration :</label>
                    <input
                        onChange = { this.handleChange }
                        required
                        name="preparation_duration"
                        value={ this.state.preparation_duration }
                        type="time"/>
                    <label>Baking duration :</label>
                    <input
                        onChange = { this.handleChange }
                        required
                        name="baking_duration"
                        value={ this.state.baking_duration }
                        type="time"/>
                    <textarea
                        onChange = { this.handleChange }
                        name="additional_infos"
                        placeholder= "If necessary, you can add some additional information."
                        value={ this.state.additional_infos }/>
                    <div className="add-form-cmd">
                        <button type="submit">Add</button>
                        <button onClick={ this.onCmdClick } className="go-to-list">Back to list</button>
                    </div>
                </form>
            </div>
        );
    };
}

export default AddRecipe;