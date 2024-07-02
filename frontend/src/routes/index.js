import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from '../pages/login'
import Dashboard from '../pages/dashboard'
import Filme from '../pages/filme'

export default function Rotas() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/filme/:id' element={<Filme />} />
      </Routes>
    </Router>
  )
}
