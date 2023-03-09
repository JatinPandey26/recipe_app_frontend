import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { getUserID } from '../getUserID.js'

const userID = getUserID();

const Navbar = () => {
    const [cookies, setCookie] = useCookies(['access_token']);
    const navigate = useNavigate();
    const [isAdmin, setAdmin] = useState(false);

    useEffect(() => {
        async function fetchUser() {

            const { data: user } = await axios.post('http://localhost:3001/auth/me', { userID }, {
                headers: {
                    Authorization:
                        cookies.access_token
                }
            });
            if (user.role === 'admin') {
                setAdmin(true)
            }
        }

        fetchUser()
    }, [])

    const logout = () => {
        setCookie('access_token', '');
        window.localStorage.removeItem('userID');
        navigate('/auth')
        // window.location.reload()
    }


    return (
        <nav className='navbar'>
            <Link to={'/'} >Home</Link>
            <Link to={'/create-recipes'} >Create Recipe</Link>
            <Link to={'/saved-recipes'} >Saved Recipes</Link>
            {!cookies.access_token ? <Link to={'/auth'} ><button style={{ border: 'none', backgroundColor: "#7B675B", color: "white", cursor: "pointer" }}>Login / Register</button></Link> : <button style={{ border: 'none', backgroundColor: "#7B675B", color: "white", cursor: "pointer" }} onClick={logout}>Logout</button>}
            {isAdmin && <Link to={'/admin'} ><button style={{ border: 'none', backgroundColor: "#7B675B", color: "white", cursor: "pointer" }} >Dashboard</button></Link>}
        </nav>
    )
}

export default Navbar