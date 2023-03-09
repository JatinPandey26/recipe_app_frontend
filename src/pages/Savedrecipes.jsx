import React, { useEffect, useState } from 'react'
import axios from 'axios'
import SavedRecipe from '../components/SavedRecipe'
import { useCookies } from 'react-cookie'
import { getUserID } from '../getUserID'

const userID = getUserID();

export const Savedrecipes = () => {
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [cookie, setCookie] = useCookies(['access_token']);

  useEffect(() => {
    async function fetchRecipes() {
      const recipes = await axios.post('https://recipeapp-backend.vercel.app/recipes/savedRecipes', { userID: userID }, {
        headers: { authorization: cookie.access_token }
      });
      setSavedRecipes(recipes.data);
    }
    fetchRecipes();
  }, [])
  return (
    <div className='home'>
      {
        savedRecipes.map((recipe, index) => {
          return <SavedRecipe recipe={recipe} key={index} />
        })
      }
    </div>
  )
}
