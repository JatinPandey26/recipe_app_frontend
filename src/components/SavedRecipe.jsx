import axios from "axios";
import { useCookies } from "react-cookie";
import { getUserID } from "../getUserID";

const userID = getUserID();

const SavedRecipe = ({ recipe: { name, ingredients, instructions, image, cookingTime, createdBy, _id }, }) => {
    const [cookie, setCookie] = useCookies(['access_token']);
    async function removeRecipeFromSaved(e) {
        e.preventDefault();

        try {
            await axios.post(`http://localhost:3001/recipes/remove-saved-recipe`, { userID, recipeID: _id }, { headers: { authorization: cookie.access_token } });
            alert("Recipe removed from saved recipes");
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
            <button onClick={removeRecipeFromSaved}>Remove</button>
        </div>
    )
}

export default SavedRecipe