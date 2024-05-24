import './style.css'
import { Link } from 'react-router-dom';

export function CardTurma ({id, name, sigla, handlerDelete}) {

    const teamDelete = (event) => {
        event.preventDefault();
        handlerDelete(id);
    }

    return (
        <div className='team_card'>
            <h4>{name}</h4>
            <p> Código da Turma: {id}</p>
            <p className='sigla_text'> <span/> Sigla: {sigla.name}</p>

            <div className="team_card_actions">

                <Link to={`/editTeam/${id}`}>
                    Editar
                </Link>

                <button onClick={teamDelete}>
                    Excluir
                </button>
                
            </div>
        </div>
    )
}