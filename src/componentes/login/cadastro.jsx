import React, { useContext, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import UserContext from "../context/UserContext";

export default function Login() {
  const navigate = useNavigate();
  const { apiBaseUrl } = useContext(UserContext);

  const [dadosUsers, setDadosUsers] = useState({
    nome: "",
    email: "",
    senha: "",
    telefone: "",
  });

  const [statusForm, setStatusForm] = useState({
    type: "",
    mensagem: "",
  });

  const valueInputs = (e) =>
    setDadosUsers({ ...dadosUsers, [e.target.name]: e.target.value });

  const validate = () => {
    if (!dadosUsers.nome)
      return setStatusForm({ type: "error", mensagem: "Nome obrigatório!" });

    if (!dadosUsers.email)
      return setStatusForm({ type: "error", mensagem: "Email obrigatório!" });

    if (!dadosUsers.senha)
      return setStatusForm({ type: "error", mensagem: "Senha obrigatória!" });

    if (!dadosUsers.telefone)
      return setStatusForm({
        type: "error",
        mensagem: "Telefone obrigatório!",
      });

    if (dadosUsers.senha.length < 5)
      return setStatusForm({
        type: "error",
        mensagem: "Senha mínima 5 caracteres!",
      });
    else {
      return true;
    }
  };

  const adicionarUser = () => {
    if (!validate()) return;

    const data = {
      nome: dadosUsers.nome,
      email: dadosUsers.email,
      senha: dadosUsers.senha,
      telefone: dadosUsers.telefone,
    };

    axios.post(apiBaseUrl + "/usuarios/novo", data)

      .then(() => {
        setStatusForm({
          type: "success",
          mensagem: "Usuário cadastrado com sucesso!",
        });

        setTimeout(() => {
          return navigate("/");
        }, 1000);
      })
      .catch((err) => {
        if (err.response.data.mensagem || err.response.statusText) {
          alert(err.response.data.mensagem);
        }
      });
  };

  return (
    <section className="pagelogin">
      <div className="squar">
        <h2>Cadastrar-se</h2>

        <label htmlFor="">Nome:</label>
        <input
          type="text"
          name="nome"
          id="nome"
          placeholder="Digite seu nome..."
          onChange={valueInputs}
          value={dadosUsers.nome}
        />

        <label htmlFor="">E-mail:</label>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Digite seu e-mail..."
          onChange={valueInputs}
          value={dadosUsers.email}
        />

        <label htmlFor="">Senha:</label>
        <input
          type="password"
          name="senha"
          id="senha"
          placeholder="Digite sua senha..."
          onChange={valueInputs}
          value={dadosUsers.senha}
        />

        <label htmlFor="">Telefone:</label>
        <input
          type="number"
          name="telefone"
          id="telefone"
          placeholder="(99) 9 9999-9999"
          onChange={valueInputs}
          value={dadosUsers.telefone}
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
          onClick={adicionarUser}
        />
      </div>
    </section>
  );
}
