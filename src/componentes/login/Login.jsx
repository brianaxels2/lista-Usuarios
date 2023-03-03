import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import UserContext from "../context/UserContext";
import { useNavigate } from "react-router-dom";

export default function Login() {

  const navigate = useNavigate();

  const [dadosLogin, setDadosLogin] = useState({
    email: '',
    senha: ''
  });

  const { apiBaseUrl } = useContext(UserContext);

  const [statusForm, setStatusForm] = useState({
    type: "",
    mensagem: "",
  });

  const valueInputs = (e) =>
    setDadosLogin({ ...dadosLogin, [e.target.name]: e.target.value });

  const validate = () => {

    if (!dadosLogin.email) return setStatusForm({ type: "error", mensagem: "Email obrigatório!" });

    if (!dadosLogin.senha) return setStatusForm({ type: "error", mensagem: "Senha obrigatória!" });

    else return true;
  };

  const login = () => {

    if (!validate()) return;

    const payload = {
      email: dadosLogin.email,
      senha: dadosLogin.senha
    }

    axios.post(apiBaseUrl + "/login", payload, {
      timeout: 10000
    })
      .then((e) => {

        setStatusForm({
          type: "success",
          mensagem: "Bem vindo!",
        });

        localStorage.setItem("token", e.data.token);
        localStorage.setItem("email", e.data.usuario.email);
        localStorage.setItem("id", e.data.usuario.id);
        localStorage.setItem("nome", e.data.usuario.nome);
        localStorage.setItem("status", e.data.usuario.status);
        localStorage.setItem("telefone", e.data.usuario.telefone);

        setTimeout(() => {
          return navigate("/home");
        }, 600);
      })
      .catch((err) => {
        //console.log(err);
        setStatusForm({
          type: "error",
          mensagem: err.response.data.mensagem,
        });
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
          onChange={valueInputs}
          value={dadosLogin.email}
        />

        <label htmlFor="">Senha:</label>
        <input
          type="password"
          name="senha"
          id="senha"
          placeholder="Digite sua senha..."
          onChange={valueInputs}
          value={dadosLogin.senha}
        />

        {statusForm.type === "success" ? (
          <p className="success">{statusForm.mensagem}</p>
        ) : (
          ""
        )}

        {statusForm.type === "error" ? (
          <p className="error">{statusForm.mensagem}</p>
        ) : (
          ""
        )}

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
