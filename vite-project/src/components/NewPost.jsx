import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';

const NewPost = () => {
    const [isCollapsed, setIsCollapsed] = useState(true);
    const [title, setTitle] = useState('');
    const [text, setText] = useState('');
    const [author, setAuthor] = useState('');

    const user = localStorage.getItem('uid');
    const navigate = useNavigate();


    const handleHomeClick = (e) =>
    {
        e.preventDefault();
        navigate('/home');
    }

    const handleCollapse = (e) => {
        e.preventDefault();
        
        if (isCollapsed) {
            setIsCollapsed(false);
        } else {
            setIsCollapsed(true);
        }
    }


    const handleSubmit = (e) => {
        e.preventDefault();
    }

    if (!user) {
        return (
            <div className = 'not-logged-post'>
                <h2>Please visit Home to login to be able to create a new post, and view your previous posts!</h2>
                <button onClick={(handleHomeClick)}>Go to Home</button> 
            </div>
        );
    }

    return (
        <div className = 'blog-div'>
            {isCollapsed ? (
                <div className = 'blog-container'>
                    <section className = 'collapsed-header'>
                        <button onClick={handleCollapse} className="header-button">
                           Write a New Blog Post</button>
                    </section>
                </div>
            ) : (
                <div className="blog-container">
                    <section className="new-post">
                        <form className="blog-form" onSubmit={handleSubmit}>
                            <div className="title-row">
                                <label>
                                    Title:
                                    <input
                                        type="text"
                                        value={title}
                                        onChange={(e) => setTitle(e.target.value)}
                                        required
                                    />
                                </label>

                                <label>
                                    Author:
                                    <input 
                                        type = 'text'
                                        value = {author}
                                        onChange = {(e) => setAuthor(e.target.value)}
                                        required 
                                    />
                                </label>
                                <button type="submit">Submit</button>
                                <button type="button" onClick={handleCollapse}>
                                    Cancel
                                </button>
                            </div>
                            <label>
                                <textarea
                                    value={text}
                                    onChange={(e) => setText(e.target.value)}
                                    required
                                    placeholder = "Write your review here"
                                />
                            </label>
                        </form>
                    </section>

                </div>
            )}
        
        
        </div>
    )
        
}   

export default NewPost;