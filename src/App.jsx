import React from 'react';
import { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Docentes from './components/Docentes';
import Espacios from './components/Espacios';
import Relacionar from './components/Relacionar';
import './index.css';

function App() {
  return (
    <Router>
      
      <div className="App">
        <div className='logo'>
            <img  src="https://scontent.fush1-1.fna.fbcdn.net/v/t39.30808-6/299469459_559914229270429_6305437340442472892_n.jpg?_nc_cat=106&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=XFrMPxLuyqQQ7kNvgHQR827&_nc_zt=23&_nc_ht=scontent.fush1-1.fna&_nc_gid=AL_H6mwcN0Tji6z3-11bQAN&oh=00_AYDRrPbbeYKAjlHfwhWAUsLPgtJWbxA-0YGD0JIP46Le0g&oe=6737CA48" alt="" />
      </div>
        <h1>Gestión de Docentes y Espacios Curriculares</h1>
        <nav>
          <ul>
            <li><a href="/docentes">Docentes</a></li>
            <li><a href="/espacios">Espacios Curriculares</a></li>
            <li><a href="/relacionar">Relacionar Docentes con Espacios</a></li>
          </ul>
        </nav>
        <Routes>
          <Route path="/docentes" element={<Docentes />} />
          <Route path="/espacios" element={<Espacios />} />
          <Route path="/relacionar" element={<Relacionar />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

