import React from 'react'
import { Routes, Route } from 'react-router-dom';
import { Container, Navbar, Nav } from 'react-bootstrap';
import HomePage from './pages/HomePage';
// import { Header } from './components/common/Header';

function App() {
  return (
    <>
      {/* <Header /> */}
      <Container fluid className="px-0">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/home" element={<HomePage />} />
        </Routes>
      </Container>
    </>
  )
}

export default App
