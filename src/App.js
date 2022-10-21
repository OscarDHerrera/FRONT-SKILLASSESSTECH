import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/home/Home';
import FormPerson from './components/users/FormPerson';
import UserTable from './components/users/UserTable';
import Questions from './components/home/Questions';
import SubCategories from './components/home/SubCategories';
import Footer from './layouts/Footer'
import BarraNav from './layouts/BarraNav';

export default function App() {

  return (
    <div className="App">
      <BarraNav />
      <BrowserRouter>
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route exact path='/subcategories/:sub_name' element={<SubCategories />} />
          <Route exact path='/subcategories/questions/:sub_name' element={<Questions />} />
          <Route exact path='/create-user' element={<FormPerson />} />
          <Route exact path='/users-table' element={<UserTable />} />
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}