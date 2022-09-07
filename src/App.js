import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import PracTable from './components/PracTable';
import BarraNav from './components/BarraNav'
import FormPerson from './components/FormPerson';

export default function App() {
  return (
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route exact path='/' element={<BarraNav />}>
              <Route exact path='/' element = {<Home />} />
              <Route exact path='/create-user' element={<FormPerson/>} />
              <Route exact path='/users-table' element={<PracTable/>} />
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
  );
}