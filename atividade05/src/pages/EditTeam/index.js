import './style.css'

import * as React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import { Input } from '../../components/Input';
import { Select } from '../../components/Select';

export function EditTeam() {

    // Recuperando o id da url
    const { id } = useParams();
    const navigate = useNavigate()

    /* State de dados das categorias vindas do aqruivo db,json */
    const [team, setTeam] = React.useState({})
    const [getTeam, setGetTeam] = React.useState([])
    const [selected, setSelected] = React.useState(0)

    /* Recupera os dados de categoria do arquivo db,json */
    React.useEffect(() => {
        fetch(
            'http://localhost:5000/sigla',
            {
                method: 'get',
                headers: {
                    'content-type': 'application/json'
                }
            }).then(
                (resp) => resp.json()
            ).then((data) => {
                setGetTeam(data);
                console.log(data);
            }).catch((error) => {
                console.log(error);
            })
    }, [])

    // Recuperando os dados de livro para edição
    React.useEffect(() => {
        fetch(`http://localhost:5000/turmas/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        }).then(
            (resp) => resp.json()
        ).then((data) => {
            setTeam(data);
            console.log(data)
        }).catch((error) => {
            console.log(error)
        });

    }, [id]);

    function handlerOnInput(event) {
        setTeam({ ...team, [event.target.name]: event.target.value })
    }

    function handlerOnSelect(event) {
        setSelected(event.target.value)
        console.log(selected)
        setTeam({
            ...team, [event.target.name]: {
                id: event.target.value,
                name: event.target.options[event.target.selectedIndex].text
            }
        })
    }

    function handlerOnSubmitEdit(e) {
        e.preventDefault()

        if (selected === 0) {
            alert("Por favor, escolha uma sigla...")
            return
        }

        fetch(`http://localhost:5000/turmas/${team.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(team)
        }).then(
            (resp) => resp.json()
        ).then((data) => {
            setTeam(data)
            navigate('/teams', {
                state: {
                    message: "Livro alterado com SUCESSO!",
                    type: "success"
                }
            })
        }).catch((error) => {
            console.log(error)
        })
    }

    return (

        <div className="team_container">
            <h1>Edição de Livro</h1>

            <form onSubmit={handlerOnSubmitEdit}>

                <Input
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Turma XXX..."
                    text="Digite o nome da turma"
                    value={team.name}
                    handlerOnChange={handlerOnInput}
                />

                <Select
                    name="sigla"
                    id="sigla"
                    options={getTeam}
                    handlerOnChange={handlerOnSelect}
                    text="Escolha a sigla da Turma"
                />

                <p><input type='submit' value="Editar" /></p>

            </form>

        </div>

    );
}