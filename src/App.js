import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import BarraNav from './layouts/BarraNav';
import Home from './components/home/Home';
import FormPerson from './components/users/FormPerson';
import UserTable from './components/users/UserTable';
import Questions from './components/home/Questions';


export default function App() {
  return (
      <div className="App">
        <BrowserRouter>
          <Routes>
            <Route exact path='/' element={<BarraNav/>}>
              <Route exact path='/' element = {<Home/>}/>
              <Route exact path='/select-items' element = {<Questions/>}/>
              <Route exact path='/create-user' element={<FormPerson/>} />
              <Route exact path='/users-table' element={<UserTable/>} />
            </Route>
          </Routes>
        </BrowserRouter>
      </div>
  );
}