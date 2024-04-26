import './style.css'

export function CardTurma ({id, name, sigla}) {

    return (
        <div className='team_card'>
            <h4>{name}</h4>
            <p> Código da Turma: {id}</p>
            <p className='sigla_text'> <span/> Sigla: {sigla.name}</p>
        </div>
    )
}