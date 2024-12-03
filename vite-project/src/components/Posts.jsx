/**
 * Name: Maximiliano Cifuentes
 * Date: 11/28/2024
 * 
 * This is my Posts.jsx component. It acts as the parent component for both NewPost.jsx and LoadPosts.jsx by doing
 * all of the db logic required to load in posts from the db, and to post a new one. Additionally, it acts as a 'container'
 * for rendering the add a new post above, and the loaded in posts below while also allowing for both logic
 * to be handled elsewhere. 
 */

import React, { useState, useEffect } from 'react';
import { getDatabase, ref, push, set, get } from 'firebase/database';
import NewPost from './NewPost';
import LoadBlogPosts from './LoadPosts';
import { useNavigate } from 'react-router-dom'

const Posts = () => {

    // initialized states, posts is an array of posts from db, isCollapsed is for the dropdown header and 
    // loading is another boolean used to simualte a delay
    const [posts, setPosts] = useState([]);
    const [isCollapsed, setIsCollapsed] = useState(true);
    const [loading, setLoading] = useState(true);

    const user = localStorage.getItem('uid');
    const db = getDatabase();
    const navigate = useNavigate();

    // updates the loadedPosts with the previous posts from the db, assuming it is successfully
    // snapshot wont exist for the purposes of testings.
    const loadBlogPosts = async () => {
        try {
            const postsRef = ref(db, `users/${user}/posts`);
            const snapshot = await get(postsRef);
            //istanbul ignore next
            if (snapshot.exists()) {
                const data = snapshot.val();
                const loadedPosts = Object.values(data);
                setPosts(loadedPosts);
            }
        } catch (error) {
            console.error("Error loading posts: ", error);
        }
    };

    // Adds a new post to the db by using firebase methods, it also updates the state of the posts with the
    // newly submitted post allowing it to render properly
    const addNewPost = async (post) => {
        try {
            const postsRef = ref(db, `users/${user}/posts`);
            const newPostRef = push(postsRef);
            await set(newPostRef, post);
            setPosts([...posts, post]);
        } catch (error) {
            console.error("Error adding post: ", error);
        }
    };

    // if there is a user, load the blog posts
    useEffect(() => {
        if (user) {
            loadBlogPosts();
        }
    }, [user]);


    // if user clicks home button, navigate them to the home login
    const handleHomeClick = (e) =>
    {
        e.preventDefault();
        navigate('/home');
    }

    // toggle method for the collapse
    const handleCollapse = () => {
        setIsCollapsed(!isCollapsed);
    }

    // mock loading screen to allow time for blog posts to render properly
    useEffect(() => {
        
        const loadingTime = setTimeout(() => {
            setLoading(false);
        }, 1000);
        return () => clearTimeout(loadingTime); 
    }, []);

    // user is not logged in so conditionally display this instead
    if (!user) {
        return (
            <div className = 'not-logged-post'>
                <h2>Please visit Home to login to be able to create a new post, and view your previous posts!</h2>
                <button onClick={(handleHomeClick)}>Go to Home</button> 
            </div>
        );
    }

    return (
        <div className="blog-container">
            <div className="drop-down">
                <button onClick={handleCollapse} className="dropdown-button">
                    {isCollapsed ? "Write a New Blog Post ▼" : "Write a New Blog Post ▲"}
                </button>
            </div>
            {!isCollapsed && (
                /* If the banner is not collapsed display this form*/
                <section className="form-container">
                    <NewPost onAddPost={addNewPost} />
                </section>
            )}
            {loading ? (
                /*  Load the mock loading image initially */
                <div className = 'spinner-container'>
                    <img src="/images/spinner.gif" alt="loading..." />
                </div>
            ) : (
                /* display the loaded in blog posts after simualted delay*/
                <section className="posts-section">
                    <LoadBlogPosts posts={posts} displayName = {'Your'} />
                </section>
            )}     
        </div>
    );
};

export default Posts;
