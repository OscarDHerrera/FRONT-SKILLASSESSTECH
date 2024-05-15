import React from 'react'
import { styled } from 'styled-components'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './components/home/Home'
import UserProfile from './components/users/UserProfile'
import Register from './components/login/Register'
import UserTable from './components/users/UserTable'
import Questions from './components/home/Questions'
import Favorites from './components/home/Favorites'
import Footer from './layouts/Footer'
import BarraNav from './layouts/BarraNav'
import Login from './components/login/Login'
import { createTheme, ThemeProvider } from '@mui/material'

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

export default function App () {
  const [showNav, setShowNav] = React.useState(true)

  return (
    <BodyContainer >
      <ThemeProvider theme={theme}>
      {showNav && <BarraNav />}
      <BrowserRouter>
          <Routes style={{ flex: '1 0 auto' }}>
            <Route exact path='/' element={<Home />} />
            <Route exact path='/register' element={<Register setShowNav={setShowNav} />} />
            <Route exact path='/login' element={<Login setShowNav={setShowNav} />} />
            <Route exact path='/user-profile' element={<UserProfile />} />
            <Route exact path='/subcategories/questions/:sub_name' element={<Questions />} />
            <Route exact path='/user-favorites' element={<Favorites />} />
            <Route exact path='/user-results' element={<UserTable />} />
          </Routes>
      </BrowserRouter>
      <FooterContainer style={{ flexShrink: 0 }}>
        <Footer />
      </FooterContainer>
      </ThemeProvider>
    </BodyContainer>
  )
}
