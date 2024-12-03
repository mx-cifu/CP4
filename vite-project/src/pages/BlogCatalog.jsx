/**
 * Name: Maximiliano Cifuentes
 * Date: 11/29/2024
 * 
 * This is my BlogCatalog.jsx file. It serves as the entrance to other users'
 * blog that aren't a part of the user. Unlike the other pages in the folder it
 * holds more logic as it's holding props that it needs to pass
 * depending on which user is clicked by the user and to be able to pass that information
 * effectively to the components that need it. For that reason, I decided to incorporate some 
 * additional logic but tried to keep it as minimal as possible to not break with React best 
 * practices.
 */


import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getDatabase, ref, get } from 'firebase/database';
import Header from '../components/Header';

const BlogCatalog = () => {
    // state for an array of users retrieved from the firebase db
    const [users, setUsers] = useState([]);

    // function that executes when the component mounts to retrieve users from the db
    useEffect(() => {
        const db = getDatabase();
        const usersRef = ref(db, 'users');

       // fetching data from 'users' in db
        get(usersRef)
            .then((snapshot) => {
                // uses the snapshot if it exist to iterate over the retrieved
                // array of the db and populates id and displayName
                if (snapshot.exists()) {
                    const usersData = snapshot.val();
                    const usersList = Object.entries(usersData).map(([userId, userInfo]) => ({
                        id: userId, 
                        displayName: userInfo.displayName 
                    }));
                    setUsers(usersList);
                }
            })
            .catch((error) => console.error('Error fetching users:', error));
    }, []);

    // JSXcode that will display on respective user's display name, and a clickable link based 
    // on the displayname's uid, while also allowing for dynamic display using the users array from db
    return (
        <div className="blog-catalog-container">
            <Header/>
            <section className = 'user-section'>
                <ul className = 'user-list'>
                    {users.map((user) => (
                        <li key={user.id}>
                            <Link to={`/user/${user.id}`}>{user.displayName}</Link>
                        </li>
                    ))}
                </ul>
            </section>
        </div>
    );
};

export default BlogCatalog;
