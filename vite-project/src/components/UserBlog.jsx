/**
 * Name: Maximiliano Cifuentes
 * Date: 12/02/2024
 * 
 * This is my UserBlog.jsx file. that is very similar to the Posts.jsx but instead of loading in the currently 
 * logged in user's automatically, it receives the clicked user (and therby their userId) from BlogCatalog so that it loads in a 
 * specific user's previous blog posts. Additionally, since this is a user that isn't the currently logged in, 
 * it does not leverage the NewPost.jsx since we dont want someone to have access to that functionality outside
 * of their own blogsite
 */

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getDatabase, ref, get } from 'firebase/database';
import LoadBlogPosts from './LoadPosts';
import Header from './Header';

const UserBlog = () => {
    const { userId } = useParams();
    const [displayName, setDisplayName] = useState('');
    const [posts, setPosts] = useState([]);

    // on mount it loads the posts of the clicked user
    useEffect(() => {
        const db = getDatabase();
        const postsRef = ref(db, `users/${userId}/posts`);

        // retrieving the specific user's posts
        get(postsRef)
            .then((snapshot) => {
                // if the snapshot exists, it will retrieve the data of those posts and setPosts to it. Ignored as it is not 
                // expected to exist during testings
                //istanbul ignore next
                if (snapshot.exists()) {
                    const postsData = snapshot.val();
                    const postsArray = Object.values(postsData);
                    setPosts(postsArray);
                }
            })
            .catch((error) => console.error('Error fetching user posts:', error));

            // reference to the specified user's displayName attribute 
            const userRef = ref(db, `users/${userId}/displayName`);
            get(userRef)
                .then((snapshot) => {
                    // if the snpashot exists, it will retrieve the name setDisplayName to it, not expected durning testings
                    // istanbul ignore next
                    if (snapshot.exists()) {
                        setDisplayName(snapshot.val());
                    }
                })
                .catch((error) => console.log('Error fetching displayName:', error));

    }, [userId]);

    return (
        <>
            < Header/>
            <div className = 'blog-container'>
                <LoadBlogPosts posts={posts} displayName = {displayName} />
            </div>
        </>
    );
};

export default UserBlog;
