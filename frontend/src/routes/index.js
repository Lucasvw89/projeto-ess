import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from '../pages/login'
import Dashboard from '../pages/dashboard'
import Filme from '../pages/filme'
import AdminDashboard from '../pages/adminDashboard'
import Header from '../components/ContentComponents/Header'

export default function Rotas() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/admindashboard' element={<AdminDashboard />} />
        <Route path='/filme/:id' element={<Filme />} />
        <Route path='/header' element={<Header />} />
      </Routes>
    </Router>
  )
}
