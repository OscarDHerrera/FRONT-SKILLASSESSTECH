import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import BarraNav from './components/BarraNav';
import FormPerson from './components/FormPerson';
import UserTable from './components/UserTable';
import Questions from './components/Questions';


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