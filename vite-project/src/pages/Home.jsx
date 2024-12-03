/**
 * Name: Maximiliano Cifuentes
 * Date: 12/02/2024 
 * 
 * Page that serves as a navigable link for the Header. This serves as the landing page for the project
 * and holds the components with the logic to authenticate a user
 */

import React from 'react';
import Header from '../components/Header';
import Login from '../components/Login';

const Home = () => (
    <>
        <Header />
        <Login />
    
    </>
)

export default Home;