import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import { getUserID } from '../getUserID';

const userID = getUserID();
const Dashboard = () => {
    const [cookies, setCookie] = useCookies(['access_token']);
    const [users, setUsers] = useState([]);
    const navigate = useNavigate()
    useEffect(() => {
        async function fetchUser() {

            try {
                const { data: users } = await axios.post('https://recipeapp-backend.vercel.app/admin/get-all-users', { userID }, { headers: { 'Authorization': cookies.access_token } })

                setUsers(users)

            } catch (error) {
                navigate('/')
            }


        }

        fetchUser()
    }, [])

    return (
        <div className='dashboard'>

            <table>
                <tr> <th>_id</th>
                    <th>username</th>
                    <th>role</th>
                </tr>
                {
                    users.map((user, index) => <tr key={index}>
                        <td>{user._id}</td>
                        <td>{user.username}</td>
                        <td>{user.role}</td>
                    </tr>)
                }
            </table>

        </div>
    )
}

export default Dashboard