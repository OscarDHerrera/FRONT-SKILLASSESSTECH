import React from 'react';
import {styled} from 'styled-components';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/home/Home';
import FormPerson from './components/users/FormPerson';
import UserTable from './components/users/UserTable';
import Questions from './components/home/Questions';
import SubCategories from './components/home/SubCategories';
import Footer from './layouts/Footer'
import BarraNav from './layouts/BarraNav';
import Login from './components/login/Login';


const BodyContainer = styled.div`
  display: grid;
  grid-template-rows: auto 1fr auto;
  min-height: 100vh;
`;

const FooterContainer = styled.div`
  width: 100%;
  height: 80px;
  background-color: #333333;
  color: #ffffff;
  flex-shrink: 0;
`;

export default function App() {
  return (
    <BodyContainer >
      <BarraNav />
      <BrowserRouter>
          <Routes style={{ flex: '1 0 auto' }}>
            <Route exact path='/' element={<Home />} />
            <Route exact path='/login' element={<Login />} />
            <Route exact path='/subcategories/:sub_name' element={<SubCategories />} />
            <Route exact path='/subcategories/questions/:sub_name' element={<Questions />} />
            <Route exact path='/user-favorites' element={<SubCategories />} />
            <Route exact path='/user-results' element={<UserTable />} />
          </Routes>
      </BrowserRouter>
      <FooterContainer style={{ flexShrink: 0 }}>
        <Footer />
      </FooterContainer>
    </BodyContainer>
  );
}