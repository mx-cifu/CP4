import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Routes, Route } from 'react-router-dom';
import  Blog  from './pages/Blog'
import  BlogCatalog  from './pages/BlogCatalog'
import Home from './pages/Home'
import NotFound from './pages/NotFound'
import UserBlog from './components/UserBlog';


function App() {
  

  return (
    <>
      <Routes>
        <Route path = '/' element = {<Home />} />
        <Route path = '/Home' element = {<Home />}/>
        <Route path = '/Blog' element = {<Blog />}/>
        <Route path = '/BlogCatalog' element = {<BlogCatalog />}/>
        <Route path="/user/:userId" element={<UserBlog />} />
        <Route path = '*' element = {<NotFound />} />
      </Routes>
    </>
  )
}

export default App
