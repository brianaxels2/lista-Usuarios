import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import UserContext from "../context/UserContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState();
  const [senha, setSenha] = useState();
  const { apiBaseUrl } = useContext(UserContext);

  const login = () => {
    axios.post(apiBaseUrl + "/login", { email, senha })
      .then((e) => {
        localStorage.setItem("token", e.data.token);
        localStorage.setItem("email", e.data.usuario.email);
        localStorage.setItem("id", e.data.usuario.id);
        localStorage.setItem("nome", e.data.usuario.nome);
        localStorage.setItem("status", e.data.usuario.status);
        localStorage.setItem("telefone", e.data.usuario.telefone);

        setTimeout(() => {
          return navigate("/home");
        }, 500);
      })
      .catch((err) => {
        alert(err);
      });
  };

  return (
    <section className="pagelogin">
      <div className="squar">
        <h2>Faça login para continuar</h2>

        <label htmlFor="">E-mail:</label>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Digite seu email..."
          onChange={(e) => setEmail(e.target.value)}
        />

        <label htmlFor="">Senha:</label>
        <input
          type="password"
          name="senha"
          id="senha"
          placeholder="Digite sua senha..."
          onChange={(e) => setSenha(e.target.value)}
        />

        <input
          className="btn-entrar"
          type="button"
          value="Entrar"
          onClick={login}
        />

        <div className="divisao">
          <div className="linha"></div>
          <p>ou</p>
          <div className="linha"></div>
        </div>

        <Link className="btn-cadastrar" to="/cadastro">
          <input type="button" value="Cadastre-se" />
        </Link>
      </div>
    </section>
  );
}
