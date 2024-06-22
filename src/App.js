import React from 'react'
import { styled } from 'styled-components'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Register from './pages/register/Register'
import Login from './pages/login/Login'
import Home from './pages/home/Home'
import UserProfile from './pages/users/UserProfile'
import UserTable from './pages/users/UserTable'
import Questions from './pages/evaluations/Questions'
import Favorites from './pages/favorites/Favorites'
import Footer from './layouts/Footer'
import BarraNav from './layouts/BarraNav'
import { createTheme, ThemeProvider } from '@mui/material'
import ProtectedRoute from './components/ProtectedRoute'
import PropTypes from 'prop-types'

const theme = createTheme({
  typography: {
    fontFamily: 'Fira Code'
  }
})

const BodyContainer = styled.div`
  display: grid;
  grid-template-rows: auto 1fr auto;
  min-height: 100vh;
`

const FooterContainer = styled.div`
  width: 100%;
  height: 80px;
  flex-shrink: 0;
`

function Logout () {
  localStorage.clear()
  return <Navigate to="/login" />
}

function RegisterAndLogout ({ setShowNav }) {
  RegisterAndLogout.propTypes = {
    setShowNav: PropTypes.func.isRequired
  }

  localStorage.clear()
  return <Register setShowNav={setShowNav} />
}

export default function App () {
  const [showNav, setShowNav] = React.useState(true)

  return (
    <BodyContainer >
      <ThemeProvider theme={theme}>
      {showNav && <BarraNav />}
      <BrowserRouter>
          <Routes style={{ flex: '1 0 auto' }}>
            <Route exact path='*'element={<Logout/>} />
            <Route exact path='/register' element={<RegisterAndLogout setShowNav={setShowNav} />} />
            <Route exact path='/login' element={<Login setShowNav={setShowNav} />} />
            <Route exact path='/logout' element={<Logout/>} />
            <Route
              exact path='/home'
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route
              exact path='/profile'
              element={
                <ProtectedRoute>
                  <UserProfile />
                </ProtectedRoute>
              }
            />
            <Route
              exact path='/subcategories/questions/:sub_name'
              element={
                <ProtectedRoute>
                  <Questions />
                </ProtectedRoute>
              }
            />
            <Route
              exact path='/favorites'
              element={
                <ProtectedRoute>
                  <Favorites />
                </ProtectedRoute>
              }
            />
            <Route
              exact path='/results'
              element={
                <ProtectedRoute>
                  <UserTable />
                </ProtectedRoute>
              }
            />
          </Routes>
      </BrowserRouter>
      <FooterContainer style={{ flexShrink: 0 }}>
        <Footer />
      </FooterContainer>
      </ThemeProvider>
    </BodyContainer>
  )
}
