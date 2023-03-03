import React, {useState, useEffect, useContext} from "react";
import { PageUsuarios } from "../Styles-Paginas/PageUsuarios";
import 'bootstrap/dist/css/bootstrap.min.css';
import Table from 'react-bootstrap/Table';
import axios from "axios";
import Header from "../header/header";
import Footer from "../footer/footer";
import UserContext from "../context/UserContext";
import Loading from "../loading/Loading";

export default function Usuarios() {
    const [dados, setDados] = useState()
    const {apiBaseUrl, localToken} = useContext(UserContext)
    const [removeLoad, setRemoveLoad] = useState(false)

    useEffect(() => {
        list()
    }, [])

    const list = () => {
        setTimeout(() => {
            axios.get(apiBaseUrl + '/usuarios', {
                headers: {
                    'Authorization': `token ${localToken}`
                },
                timeout: 10000,
            })
            
            .then(function (response) {
                setDados(response.data);
                setRemoveLoad(true)
            })
            .catch(function () {
                alert('Tempo excedido, recarregue a página!');
            })
        }, 100)
    }

    return (
        <section className="usuarios">
            <Header/>

            {!removeLoad ? <Loading/> :
                <PageUsuarios>
                    <h2>lista de Usuários</h2>

                    <Table striped bordered hover variant="dark">
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Nome</th>
                                <th>Email</th>
                                <th>Telefone</th>
                            </tr>
                        </thead>
                        <tbody>
                        {dados && dados.map( (e, i) => (
                                <tr key={i}>
                                    <td>{e.id}</td>
                                    <td>{e.nome}</td>
                                    <td>{e.email}</td>
                                    <td>{e.telefone}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </PageUsuarios>
            }

            <Footer/>
        </section>
    )
}