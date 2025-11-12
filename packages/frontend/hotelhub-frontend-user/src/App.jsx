import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

function HomePage(){ return <h1>Home</h1> }
function LoginPage(){ return <h1>Login</h1> }

export default function App(){
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<HomePage/>} />
        <Route path='/login' element={<LoginPage/>} />
      </Routes>
    </BrowserRouter>
  )
}
