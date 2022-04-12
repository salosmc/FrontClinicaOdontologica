import './App.css';
import {BrowserRouter,Routes, Route} from "react-router-dom";
import React, {Component} from 'react';
import Nav from './components/Nav';
import Odontologos from './components/Odontologos'
import Pacientes from './components/Pacientes';
import Home from './components/Home';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Nav/>
        <Routes>
          <Route path="/" element={<Home/>}></Route>
          <Route path="/odontologos" element={<Odontologos/>}></Route>
          <Route path="/pacientes" element={<Pacientes/>}></Route>
        </Routes>

      </BrowserRouter>
    </div>
  );
}

export default App;
