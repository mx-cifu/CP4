import React from 'react';

const login = () => (
    <form>
        <label>Email:</label>
        <input type = 'text' required placeholder = 'Enter your email'/>

        <label>Password:</label>
        <input type = 'text' required placeholder = 'Enter your password'/>

        <button type = 'submit'>Submit</button>
    </form>

);

export default login;