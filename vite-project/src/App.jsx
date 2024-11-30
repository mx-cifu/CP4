import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Routes, Route } from 'react-router-dom';
import  Blog  from './pages/Blog'
import  ReviewCatalog  from './pages/ReviewCatalog'
import Home from './pages/Home'
import NotFound from './pages/NotFound'


function App() {
  

  return (
    <>
      <Routes>
        <Route path = '/' element = {<Home />} />
        <Route path = '/Home' element = {<Home />}/>
        <Route path = '/Blog' element = {<Blog />}/>
        <Route path = '/ReviewCatalog' element = {<ReviewCatalog />}/>
        <Route path = '*' element = {<NotFound />} />
      </Routes>
    </>
  )
}

export default App
