import { Provider } from "react-redux";
import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { store } from "./store";
import Login from "./pages/Login";
import Editar from "./pages/Editar";
import Carros from "./pages/Carros";
import Detalhes from "./pages/Detalhes";
import Cadastrar from "./pages/Cadastrar";
import Layout from "./components/Layout";
import Logout from "./components/Logout";

const Routers: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    setIsAuthenticated(!!token);
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setIsAuthenticated(false);
  };

  return (
    <Provider store={store}>
      <BrowserRouter basename="/">
        <Layout>
          <Routes>
            <Route path="/login" element={<Login onLogin={handleLogin} />} />
            <Route path="/logout" element={<Logout onLogout={handleLogout} />} />
            {isAuthenticated ? (
              <>
                <Route path="/" element={<Carros />} />
                <Route path="/detalhes/:id" element={<Detalhes />} />
                <Route path="/cadastrar" element={<Cadastrar />} />
                <Route path="/editar" element={<Editar />} />
              </>
            ) : (
              <Route path="*" element={<Navigate to="/login" replace />} />
            )}
            {/* Rotas públicas */}
            <Route path="/" element={<Carros />} />
            <Route path="/detalhes/:id" element={<Detalhes />} />
            <Route path="/cadastrar" element={<Cadastrar />} />
            <Route path="/editar" element={<Editar />} />
            <Route path="*" element={<h1>Not Found</h1>} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </Provider>
  );
};

export default Routers;
