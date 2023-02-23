import React, { useContext, useEffect, useState } from "react";
import { PageConta } from "../Styles-Paginas/PageConta";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Header from "../header/header";
import Footer from "../footer/footer";
import UserContext from "../context/UserContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Loading from "../loading/Loading";

export default function Conta() {
  const { apiBaseUrl, localToken, localId } = useContext(UserContext);

  useEffect(() => {
    minhaConta();
    AgendamentosUsuario();
  }, []);

  const [meusDados, setMeusDados] = useState([]);
  const [meusAgendamentos, setMeusAgendamentos] = useState([]);
  const [removeLoad, setRemoveLoad] = useState(false)

  const navigate = useNavigate();

  const minhaConta = () => {
    setTimeout(() => {
      axios.get(apiBaseUrl + "/usuarios/" + localId, {
        headers: {
          Authorization: `token ${localToken}`,
        },
      })
      .then((e) => {
        setMeusDados(e.data);
        setRemoveLoad(true)
      })
      .catch((err) => {
        alert(err);
      });
    }, 1000)
  };

  const AgendamentosUsuario = () => {
    axios.get(apiBaseUrl + "/agendamentos/usuario/" + localId, {
        headers: {
          Authorization: `token ${localToken}`,
        },
      })
      .then((e) => {
        setMeusAgendamentos(e.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const exitAgenda = (id) => {
    const dadosUserExit = {
      id: id,
    };
    axios
      .delete(apiBaseUrl + "/agendamentos/delete/", {
        data: dadosUserExit,
        headers: {
          Authorization: `token ${localToken}`,
        },
      })
      .then(() => {
        alert("Agendamento deletado com sucesso!");
        AgendamentosUsuario();
      })
      .catch((error) => {
        alert(error);
      });
  };

  const logout = () => {
    localStorage.clear();
    return navigate("/");
  };

  const exitUser = () => {
    const dadosUserExit = {
        id: localId
    }
    axios.delete(apiBaseUrl + '/usuarios/delete/', {
        data: dadosUserExit,
        headers: {
            'Authorization': `token ${localToken}`
        }
    })
    .then( () => {
        alert('Usuário deletado com sucesso!')
        localStorage.clear()
        return navigate("/")
    })
    .catch( (error) => {
        alert(error)
    })
  };

  return (
    <>
    <Header />

    {!removeLoad ? <Loading/> :
      <PageConta>
          <div>
            <h2>Minha conta</h2>

            <Table striped bordered hover variant="dark">
              <thead>
                <tr className="theade">
                  <th>Nome</th>
                  <th>Email</th>
                  <th>Status</th>
                  <th>Id</th>
                </tr>
              </thead>

              <tbody>
                {meusDados &&
                  meusDados.map((e, i) => (
                    <tr key={i}>
                      <td>{e.nome}</td>
                      <td>{e.email}</td>
                      <td>{e.status}</td>
                      <td>{e.id}</td>
                    </tr>
                  ))}
              </tbody>
            </Table>
            <div className="next">
              <Button variant="primary" onClick={logout}>
                Sair da conta
              </Button>
              <Button variant="danger" onClick={exitUser}>
                Excluir conta
              </Button>
            </div>
          </div>

          <div>
            <h2>Meus horário agendados</h2>

            <Table className="segundaTable" striped bordered hover variant="dark">
              <thead>
                <tr>
                  <th>Profissional</th>
                  <th>Data</th>
                  <th>Horário</th>
                  <th>Apagar</th>
                </tr>
              </thead>

              <tbody>
                {meusAgendamentos &&
                  meusAgendamentos.map((e, i) => (
                    <tr key={i}>
                      <td>{e.barbeiro}</td>
                      <td>
                        {new Date(e.data_agendamento).toLocaleDateString("pt-BR")}
                      </td>
                      <td>{e.horario}</td>
                      <td>
                        <Button variant="danger" onClick={() => exitAgenda(e.id)}>
                          Apagar
                        </Button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </Table>
          </div>
      </PageConta>
    }

    <Footer />
    </>
  );
}