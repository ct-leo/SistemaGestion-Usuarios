import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ROUTES } from '../utils/constants';
import Layout from '../components/Layout';

// Páginas (las crearemos a continuación)
import Home from '../pages/Home';
import Operaciones from '../pages/Operaciones';
import FormularioUsuario from '../pages/FormularioUsuario';

const AppRoutes = () => {
  return (
    <Layout>
      <Routes>
        <Route path={ROUTES.HOME} element={<Home />} />
        <Route path={ROUTES.OPERACIONES} element={<Operaciones />} />
        <Route path={ROUTES.NUEVO_USUARIO} element={<FormularioUsuario />} />
        <Route path={ROUTES.EDITAR_USUARIO} element={<FormularioUsuario />} />
        <Route path="*" element={<div className="fade-in">404 - Página no encontrada</div>} />
      </Routes>
    </Layout>
  );
};

export default AppRoutes;
