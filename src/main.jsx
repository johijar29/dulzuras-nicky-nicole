import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Layout from './components/Layout';
import App from './App';
import Catalogo from './pages/Catalogo';
import FormularioPedido from './components/FormularioPedido';

import SobreMi from './pages/SobreMi';
import Contacto from './pages/Contacto';

import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout><App /></Layout>} />
        <Route path="/catalogo" element={<Layout><Catalogo /></Layout>} />
        <Route path="/catalogo/:categoria" element={<Layout><Catalogo /></Layout>} />
        <Route path="/formulario" element={<Layout><FormularioPedido /></Layout>} />
        <Route path="/sobre-mi" element={<Layout><SobreMi /></Layout>} />
        <Route path="/contacto" element={<Layout><Contacto /></Layout>} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
