import React, { useState, useContext } from "react";
import { PageAgendar } from "../Styles-Paginas/PageAgendar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Header from "../header/header";
import Footer from "../footer/footer";
import UserContext from "../context/UserContext";

export default function Agendamentos() {
    
    const {
        apiBaseUrl, 
        localToken,
        localId, 
        localNome, 
    } = useContext(UserContext)
    
    const navigate = useNavigate()

    const [dadosAgendamento, setDadosAgendamento] = useState({
        horario: '',
        data: '',
        profissional: ''
    })

    const [statusForm, setStatusForm] = useState({
        type: '',
        mensagem: ''
    })

    const valueInputs = e => setDadosAgendamento({...dadosAgendamento, [e.target.name]: e.target.value});

    const validate = () => {
    //     let day = new Date()
    //     let dia = day.getDate();
    //     let mes = (day.getMonth() + 1).toString();
    //     let mesf = mes.length === 1 ? '0'+mes : mes;
    //     let ano = day.getFullYear()
    //     //const dataFormatada = `${dia}/${mesf}/${ano}`
    //     let dataNova = (new Intl.DateTimeFormat('pt-BR').format(day));

        if(!dadosAgendamento.horario) return setStatusForm({type:'error', mensagem:'Horário obrigatório!'})

        if(!dadosAgendamento.data) return setStatusForm({type:'error', mensagem:'Data obrigatória!'})

        if(!dadosAgendamento.profissional) return setStatusForm({type:'error', mensagem:'Profissional obrigatório!'})

        else {
            setStatusForm({type:'success', mensagem:'Horário agendado com sucesso!'})

            return true
        }
    }

    const agendar = () => {
        if(!validate()) return;

        const data = {
            id_usuario: localId,
            horario: dadosAgendamento.horario,
            data_agendamento: dadosAgendamento.data,
            barbeiro: dadosAgendamento.profissional
        }
        axios.post(apiBaseUrl + '/agendamentos/novo', data, {
            headers: {
                'Authorization': `token ${localToken}`
            }
        })
        .then( () => {
            setTimeout(() => {
                return navigate("/home")
            }, 800)
        })
        .catch( (err) => {
            if(err === 409){
                alert('Email já cadastrado na base de dados')
            }
        })
    }

    return (
        <>
        <Header/>

        <PageAgendar>
            <div className="myform">
                    <h2>Novo agendamento</h2>

                    <label htmlFor="">Nome:</label>
                    <input disabled defaultValue={localNome}/>

                    <label htmlFor="">Horário:</label>
                    <select className="mb-3" name="horario" aria-label="Default select example" onChange={valueInputs} value={dadosAgendamento.horario}>
                        <option draggable></option>
                        <option value="08:00">08:00</option>
                        <option value="09:00">09:00</option>
                        <option value="10:00">10:00</option>
                        <option value="11:00">11:00</option>
                    </select>

                    <label htmlFor="">Data:</label>
                    <input type="date" name="data" id="data" value={dadosAgendamento.data} onChange={valueInputs}/>

                    <label htmlFor="">Profissional:</label>
                    <select className="mb-3" name="profissional" aria-label="Default select example" onChange={valueInputs} value={dadosAgendamento.profissional}>
                        <option draggable></option>
                        <option value="Profissional 1">Profissional 1</option>
                        <option value="Profissional 2">Profissional 2</option>
                    </select>

                    {statusForm.type === 'success' ? <p className="success">{statusForm.mensagem}</p> : ''}

                    {statusForm.type === 'error' ? <p className="error">{statusForm.mensagem}</p> : ''}
                    
                    <input className="btn-entrar" type="button" value="agendar" onClick={agendar}/>
            </div>
        </PageAgendar>
        
        <Footer/>
        </>
    )
} 