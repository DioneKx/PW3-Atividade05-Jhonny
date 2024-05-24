import * as React from 'react'
import './style.css'

import { useLocation } from 'react-router-dom'
import { CardTurma } from '../../components/CardTurma'
import { Message } from '../../components/Message'

export function Teams() {

    const location = useLocation()

    const [teams, setTeams] = React.useState([])
    const [message, setMessage] = React.useState({
        msg: "",
        type: ""
    });

    React.useEffect(() => {
        if (location.state) {
            setMessage({
                msg: location.state.message,
                type: location.state.type
            })
        }
    }, [location.state])

    React.useEffect(() => {
        fetch('http://localhost:5000/turmas', {
            method: 'Get',
            headers: {
                'Content-Type': 'application/json' // Passando tipo de conteudo
            }
        }).then(
            (res) => res.json()
        ).then(
            (data) => {
                setTeams(data)
            }
        ).catch(
            (error) => console.log(error)
        )
    }, [])

    // Função de exlusão de livro
    function teamDelete(id) {

        fetch(`http://localhost:5000/turmas/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
        })
            .then(resp => resp.json())
            .then((data) => {
                    setTeams(teams.filter((team_data) => team_data.id !== id))
                    setMessage({
                        msg: 'Turma exluída com sucesso!',
                        type: 'success'
                    })
                }
            )
            .catch(error => console.log(error));
    }

    return (
        <div className='teams_container'>
            <h1>TURMAS</h1>
            {
                message && <Message
                    type={message.type}
                    msg={message.msg}
                />
            }
            <div className='team_content'>
                {teams.length > 0 && message.type !== "error" ? teams.map((e, index) => <CardTurma key={index} id={e.id} name={e.name} sigla={e.sigla} handlerDelete={teamDelete} />) : <h4>OCORREU UM ERRO...</h4>}
            </div>
        </div>
    )
}