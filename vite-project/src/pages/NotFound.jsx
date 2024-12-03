/**
 * Name: Maximiliano Cifuentes
 * Date: 12/02/2024
 * 
 * This is not a navigable page for the Header, but includes a header so a user can easily exit this page
 * to an exisiting page. This page should not appear unless somehow the routing is messed up to a page
 * that does not currently exist in my project
 */

import React from 'react';
import Header from '../components/Header';

const NotFound = () => (
    <>
        < Header />
        <h1> Uh oh! Sorry, that webpage was not found!</h1>
    </>
);

export default NotFound;