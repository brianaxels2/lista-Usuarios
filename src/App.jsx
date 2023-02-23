import React from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./componentes/login/Login";
import Cadastro from "./componentes/login/cadastro";
import Agendar from "./componentes/paginas/agendar";
import Home from "./componentes/paginas/home";
import Usuarios from "./componentes/paginas/usuarios";
import Conta from "./componentes/paginas/conta";

import UserContext from "./componentes/context/UserContext";
import PrivateRoutes from "./componentes/PrivateRoutes/PrivateRoutes";

function App() {
  const apiBaseUrl = "https://barber-api-9gq6.onrender.com/api";
  const localToken = localStorage.getItem("token");
  const localEmail = localStorage.getItem("email");
  const localId = localStorage.getItem("id");
  const localNome = localStorage.getItem("nome");
  const localStatus = localStorage.getItem("status");
  const localTelefone = localStorage.getItem("telefone");

  return (
    <UserContext.Provider
      value={{
        apiBaseUrl,
        localToken,
        localEmail,
        localId,
        localNome,
        localStatus,
        localTelefone,
      }}
    >
    <Router>
      <Routes>
        <Route path="/" element={<Login/>}/>

        <Route path="/cadastro" element={<Cadastro/>}/>

        <Route path="/home" element={
          <PrivateRoutes>
            <Home />
          </PrivateRoutes>
        }/>

        <Route path="/agendar" element={
          <PrivateRoutes>
            <Agendar />
          </PrivateRoutes>
        }/>

        <Route path="/usuarios" element={
          <PrivateRoutes>
            <Usuarios />
          </PrivateRoutes>
        }/>

        <Route path="/minhaconta" element={
          <PrivateRoutes>
            <Conta />
          </PrivateRoutes>
        }/>

      </Routes>
    </Router>
    </UserContext.Provider>
  );
}

export default App;
