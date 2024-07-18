import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
// import Login from '../pages/login'
import Dashboard from '../pages/dashboard'
import Filme from '../pages/filme'
import ModalContent from '../components/ModalContent'
import MovieFrame from '../components/MovieFrame'
import AdminDashboard from '../pages/admin_dashboard'

export default function Rotas() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<ModalContent />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/admindashboard' element={<AdminDashboard />} />
        <Route path='/filme/:id' element={<Filme />} />
        <Route path='/movieframe' element={<MovieFrame />} />
        {/* <Route path='/modal' element={<ModalReview />} /> */}
      </Routes>
    </Router>
  )
}
