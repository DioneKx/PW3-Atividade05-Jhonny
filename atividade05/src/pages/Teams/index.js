import * as React from 'react'
import './style.css'

import { useLocation } from 'react-router-dom'
import { CardTurma } from '../../components/CardTurma'
import { Message } from '../../components/Message'

export function Teams() {

    const location = useLocation()

    const [teams, setTeams] = React.useState([])

    let message = ""; let type = ""

    if (location.state) {
        message = location.state.message
        type = location.state.type
    }

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

    return (
        <div className='teams_container'>
            <h1>TURMAS</h1>
            {
                message && <Message
                    type={type}
                    msg={message}
                />
            }
            <div className='team_content'>
                {teams.length > 0 && type != "error" ? teams.map((e, index) => <CardTurma key={index} id={e.id} name={e.name} sigla={e.sigla} />) : <h4>OCORREU UM ERRO...</h4>}
            </div>
        </div>
    )
}