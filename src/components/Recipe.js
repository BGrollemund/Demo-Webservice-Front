import React from "react";

import RNUtils from "./RNUtils";

const Recipe = ( { recipe } ) => {
        const
            bakingDuration = 'Baking Duration : ' + RNUtils.properTime( recipe.bakingDuration ),
            prepDuration = 'Preparation Duration : ' + RNUtils.properTime( recipe.preparationDuration );

        return (
            <div className={"recipe "+recipe.id}>
                <h2>{ recipe.title }</h2>
                <div>{ prepDuration }</div>
                <div>{ bakingDuration }</div>
                <div className="additional-infos">{ recipe.additionalInfos }</div>
                <div className={"stars_"+recipe.ratingStars}></div>
            </div>
        );
};

export default Recipe;