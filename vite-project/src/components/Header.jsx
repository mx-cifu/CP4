/**
 * Name: Maximiliano Cifuentes
 * Date: 11/27/2024
 * 
 * This is my Header.jsx file which provides routing that will be used 
 * in all of the different pages to ensure regardless of where the user 
 * currently is browsing, they have easy and seameless access to the other
 * pages located within my project
 */


import React from 'react';

const Header = () => (
    <div className = 'header'>
        <nav>
            <ul>
                <li><a href = '/Home'>Home</a></li>
                <li><a href = '/Blog'>Blog</a></li>
                <li><a href = '/BlogCatalog'>Blog Forum</a></li>
            </ul>
        </nav>
    </div>
)

export default Header;