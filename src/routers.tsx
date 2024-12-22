import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Editar from "./pages/Editar";
import Cadastrar from "./pages/Cadastrar";
import Detalhes from "./pages/Detalhes";
import Carros from "./pages/Carros";
import Login from "./pages/Login";
import Layout from "./components/Layout";
import { Provider } from "react-redux";
import { store } from "./store";
import Logout from "./components/Logout";
import useAuth from "./hooks/useAuth";
import { exportDataApi } from "./services/api";

const Exportar: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const exportData = async () => {
      try {
        await exportDataApi();
      } catch (error) {
      } finally {
        navigate("/");
      }
    };

    exportData();
  }, [navigate]);

  return <div>Processando exportação...</div>;
};

const Routers: React.FC = () => {
  const [isAuthenticated, handleLogin, handleLogout] = useAuth();

  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  }

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
                <Route path="/exportar" element={<Exportar />} />
              </>
            ) : (
              <Route path="*" element={<Navigate to="/login" replace />} />
            )}

            <Route path="*" element={<h1>Not Found</h1>} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </Provider>
  );
};

export default Routers;