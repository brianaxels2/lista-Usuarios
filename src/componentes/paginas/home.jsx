import React, { useEffect, useState, useContext } from "react";
import { PageHome } from "../Styles-Paginas/PageHome";
import "bootstrap/dist/css/bootstrap.min.css";
import Table from "react-bootstrap/Table";
import Header from "../header/header";
import Footer from "../footer/footer";
import axios from "axios";
import UserContext from "../context/UserContext";
import Loading from "../loading/Loading";

export default function Home() {
  const { apiBaseUrl, localToken } = useContext(UserContext);
  const [agendamentos, setAgendamentos] = useState([]);
  const [removeLoad, setRemoveLoad] = useState(false)

  useEffect(() => {
    hendleHome();
  }, []);

  const hendleHome = () => {
    setTimeout(() => {
        axios.get(apiBaseUrl + "/agendamentos", {
            headers: {
              Authorization: `token ${localToken}`,
            },
            timeout: 10000, 
          })
          
          .then((e) => {
            setAgendamentos(e.data);
            setRemoveLoad(true)
          })
          .catch(() => {
            alert('Tempo excedido, recarregue a página!');
          });
    }, 100)
  };

  return (
    <>
    <Header/>

    {!removeLoad ? <Loading/> :
      <PageHome>
          <div>
              <h2>Horários agendados</h2>

              {agendamentos == '' ? 'Sem horários agendados...' :
                <Table striped bordered hover variant="dark">
                  <thead>
                      <tr>
                      <th>Nome</th>
                      <th>Profissional</th>
                      <th>Horário</th>
                      <th>Data</th>
                      </tr>
                  </thead>
                  <tbody>
                      {agendamentos && agendamentos.map((e, i) => (
                          <tr key={i}>
                            <td>{e.usuario.nome}</td>
                            <td>{e.barbeiro}</td>
                            <td>{e.horario.substring(0, 5)}</td>
                            <td>
                              {e.data_agendamento.split('-').reverse().join('/')}
                            </td>
                          </tr>
                      ))}
                  </tbody>
                </Table>
              }
          </div>
      </PageHome>
    }

    <Footer />
    </>
  );
}