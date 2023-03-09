import React, { useEffect, useState } from 'react'
import axios from 'axios'
import Recipe from '../components/Recipe';
import { getUserID } from '../getUserID';
import { useCookies } from 'react-cookie';

const userID = getUserID();

const Home = () => {
  const [recipes, setrecipes] = useState([]);
  const [recipesIDs, setrecipesIds] = useState([]);
  const [cookie, setCookie] = useCookies(['access_token']);

  useEffect(() => {
    async function fetchRecipes() {
      const recipes = await axios.get('https://recipeapp-backend.vercel.app/recipes');
      setrecipes(recipes.data);
    }
    fetchRecipes();

    async function fetchRecipesIds() {

      const { data: { savedRecipes } } = await axios.post('https://recipeapp-backend.vercel.app/recipes/savedRecipes/ids', { userID: userID }, { headers: { authorization: cookie.access_token } });
      setrecipesIds(savedRecipes);
    }
    fetchRecipesIds();

  }, [])



  return (
    <div className='home'>

      {
        recipes.map((recipe, index) => {
          return <Recipe key={index} recipe={recipe} recipesIDs={recipesIDs} />
        })
      }
    </div>
  )
}

export default Home