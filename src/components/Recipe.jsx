import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useCookies } from 'react-cookie';

const Recipe = ({ recipe: { name, ingredients, instructions, image, cookingTime, createdBy, _id }, recipesIDs }) => {


    const [cookie, setCookie] = useCookies(['access_token']);
    const [isSaved, setIsSaved] = useState(false)

    useEffect(() => {
        setIsSaved(recipesIDs?.includes(_id))
    }, [])


    const handleSaveRecipe = async (e) => {
        e.preventDefault();

        try {
            const userID = localStorage.getItem('userID');

            await axios.put("http://localhost:3001/recipes/save-recipe", { userID: userID, recipeID: _id }, { headers: { authorization: cookie.access_token } })

            setIsSaved(true)
            alert('Recipe saved!');
        } catch (error) {
            console.error(error)
        }
    }


    return (
        <div className='recipe'>
            <h2>{name}</h2>
            <img src={image} alt="" />
            <h4>Ingredients</h4>
            <div>{
                ingredients.map((ingredient, index) => { return <p key={index}>{ingredient}</p> })
            }</div>
            <h4>Instructions</h4>
            <p>{instructions}</p>
            <h4>Cooking Time</h4>
            <p>{cookingTime}</p>
            <h4>Created By</h4>
            <p>{createdBy}</p>
            {!isSaved ? <button onClick={handleSaveRecipe}>Save Recipe</button> : <button>saved</button>}
        </div>
    )
}

export default Recipe