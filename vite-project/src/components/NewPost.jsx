/**
 * Name: Maximiliano Cifuentes
 * Date: 11/28/2024
 * 
 * This is my NewPost.jsx file which is a component that handles a user wanting to create a new post
 * for their own personal blog. I made it into its own separate component since the Posts.jsx serves as the 
 * parent for this component, and for LoadPosts.jsx. Keeping it in another component that is able to accept
 * props allows for greater separation of concerns as well. 
 */

import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';

const NewPost = ({ onAddPost }) => {
    // Initializes several states to keep track of the essential parts of the blog posts
    const [title, setTitle] = useState('');
    const [text, setText] = useState('');
    const [author, setAuthor] = useState('');
    const postInputRef = useRef(null);

    const handleSubmit = (e) => {
        e.preventDefault();

        // new timestamp for a post
        const timestamp = new Date().toISOString();
        const post = { title, text, author, timestamp };

        onAddPost(post);

        // resets the fields
        setTitle('');
        setText('');
        setAuthor('');
    };

    // the form that is rendered for a new blog submission
    return (
        <form className="blog-form" onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                ref={postInputRef}
                required
            />
            <input
                type="text"
                placeholder="Author"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                required
            />
            <textarea
                placeholder="Write your post here..."
                value={text}
                onChange={(e) => setText(e.target.value)}
                required
            />
            <button type="submit">Submit</button>
        </form>
    );
};

// prop function passed in from Posts
NewPost.propTypes = {
    onAddPost: PropTypes.func.isRequired,
};

export default NewPost;
