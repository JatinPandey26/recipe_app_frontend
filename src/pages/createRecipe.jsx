import React, { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { getUserID } from '../getUserID'
import { useCookies } from 'react-cookie'

const userID = getUserID()

export const CreateRecipe = () => {
  const [formdata, setformdata] = useState({
    name: "",
    ingredients: [""],
    instructions: "",
    image: "",
    cookingTime: 0,
    createdBy: 0
  });

  const [cookie, setCookie] = useCookies(['access_token']);

  const navigate = useNavigate();

  const handleChange = (e) => {
    e.preventDefault();

    setformdata({ ...formdata, [e.target.name]: e.target.value });
  }

  const handleChangeIngredients = (e, idx) => {
    e.preventDefault();

    const ingredients = formdata.ingredients;
    ingredients[idx] = e.target.value;
    setformdata({ ...formdata, ingredients })

  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setformdata({ ...formdata, createdBy: userID })
    try {
      await axios.post('https://recipeapp-backend.vercel.app/recipes/create-recipe', {
        name: formdata.name,
        ingredients: formdata.ingredients,
        instructions: formdata.instructions,
        image: formdata.image,
        cookingTime: formdata.cookingTime,
        createdBy: formdata.createdBy
      }, { headers: { authorization: cookie.access_token } });
      alert('Recipe Created')
      navigate("/")
    } catch (error) {
      console.error(error)
    }
  }

  const addIngredientField = (e) => {
    e.preventDefault();
    setformdata({ ...formdata, ingredients: [...formdata.ingredients, ""] })
  }

  return (
    <div className='create-recipe'>
      <h2>Create Recipe</h2>
      <form action="">
        <input type="text" name="name" id="name" placeholder='Name' onChange={handleChange} />
        {
          formdata.ingredients.map((ingredient, index) => {
            return <input key={index} type="text" name="ingredients" id="ingredients" placeholder={ingredient !== "" ? ingredient : `Add Ingredient ` + formdata.ingredients.length} onChange={(e) => handleChangeIngredients(e, index)} />
          })
        }
        <button style={{ background: '#c1ac90' }} onClick={addIngredientField}>Add Ingredient + </button>
        <input type="text" name="instructions" id="instructions" placeholder='Add Instructions' onChange={handleChange} />
        <input type="text" name="image" id="image" placeholder='Image URL' onChange={handleChange} />
        <input type="number" name="cookingTime" id="cookingTime" placeholder={0} onChange={handleChange} />
        <button onClick={handleSubmit} style={{ background: '#7B675B', color: "white" }}>Create Recipe</button>
      </form>
    </div>
  )
}
