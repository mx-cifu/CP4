/**
 * Name: Maximiliano Cifuentes
 * Date: 11/29/2024
 * 
 * This isy LoadPosts.jsx file, it is a stateless functional component that 
 * gets props from other components, and renders that information dynamically.
 * I broke it into a separate component since I knew I was going to want 
 * to utilize this type of logic in two different places: one for a 
 * user's own "blog" and one for when they're browsing the blog forum
 * and trying to view another person's blog posts
 */


import React from 'react';
import PropTypes from 'prop-types';

const LoadBlogPosts = ({ posts, displayName }) => {

    const getDateAndTime = (timestamp) => {
        const regex = /(\d{4}-\d{2}-\d{2})T(\d{2}:\d{2}:\d{2})(?:\.\d+)?Z/;
        const matchRegex = timestamp?.match(regex);
        

        if (matchRegex) {
            return {date : matchRegex[1], time: matchRegex[2]};
        } else {
            return {date : 'UNKNOWN', time: 'N/A'};
        }
        
    }
    
    const sortedPosts = [...posts].sort(
        (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
    );

    return (
        <div className="blog-list">
            <h2>{displayName} Blog Posts</h2>
            {sortedPosts.length > 0 ? (
                <ul>
                    {sortedPosts.map((post, index) => {
                        const {date, time} = getDateAndTime(post.timestamp);
                        /* Return each ListItem, in this case each blog post and dynamically render it*/
                        return( 
                            <li key={index} className="blog-item">
                                <h3>{post.title}</h3>
                                <h4>By: {post.author}</h4>
                                <h4>Posted on: {date} at {time}</h4>
                                <pre>{post.text}</pre>
                            </li>
                        );
                    })}
                </ul>
            ) : (
                <p>You have no blog posts! Get started on your first post now!</p>
            )}
        </div>
    );
};


/**
 * since this is a stateless component, this is the structure expected from the props passed in
 */
LoadBlogPosts.propTypes = {
    posts: PropTypes.arrayOf(
        PropTypes.shape({
            title: PropTypes.string.isRequired,
            text: PropTypes.string.isRequired,
            author: PropTypes.string.isRequired,
            timestamp: PropTypes.string.isRequired,
        })
    ).isRequired,
    displayName: PropTypes.string.isRequired
};

export default LoadBlogPosts;
