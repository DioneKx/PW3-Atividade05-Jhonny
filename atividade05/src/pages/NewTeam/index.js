import * as React from 'react'
import './style.css'

import { Input } from '../../components/Input'
import { Select } from '../../components/Select'
import { useNavigate } from 'react-router-dom'

export function NewTeam() {

  const navigate = useNavigate()

  const [team, setTeam] = React.useState([])
  const [getTeam, setGetTeam] = React.useState([])
  const [selected, setSelected] = React.useState(0)

  React.useEffect(() => {
    fetch('http://localhost:5000/sigla', {
      method: 'Get',
      headers: {
        'Content-Type': 'application/json' // Passando tipo de conteudo
      }
    }).then(
      (res) => res.json()
    ).then(
      (data) => {
        setGetTeam(data)
        console.log(data)
      }
    ).catch(
      (error) => console.log(error)
    )
  }, [])

  function handlerOnSubmit(e) {
    e.preventDefault();

    if (selected == 0) {
      alert("Por favor, escolha uma sigla...")
      return
    }

    fetch('http://localhost:5000/turmas', {
      method: 'Post',
      headers: {
        'Content-Type': 'application/json' // Passando tipo de conteudo
      },
      body: JSON.stringify(team)
    }).then(
      (res) => res.json()
    ).then(
      (data) => {
        console.log(data)
        navigate('/teams', {
          state: {
            message: "Turma cadastrada com SUCESSO!",
            type: "success"
          }
        })
      }
    ).catch(
      (error) => {
        console.log(error)
        navigate('/teams', {
          state: {
            message: "Não foi possível cadastrar a turma",
            type: "error"
          }
        })
      }
    )
  }

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

  return (
    <section className="home_container">
      <h1>Cadastre livro</h1>

      <form onSubmit={handlerOnSubmit}>
        <Input
          type="text"
          name="name"
          id="name"
          placeholder="Turma XXX..."
          text="Digite o nome da turma"
          handlerOnChange={handlerOnInput}
        />

        <Select
          name="sigla"
          id="sigla"
          options={getTeam}
          handlerOnChange={handlerOnSelect}
          // value={selected}
          text="Escolha a sigla da Turma"
        />

        <button type='submit'>Enviar</button>
      </form>
    </section>
  )
}

// const [categories, setCategories] = React.useState([])

//   React.useEffect(() => {
//     fetch( //Metodo para requisições, assim como axios manualmente
//       'http://localhost:5000/categories', // Passando o url/route
//       {
//         method: 'Get',
//         headers: {
//           'Content-Type': 'application/json' // Passando tipo de conteudo
//         }
//       }).then(
//         (res) => res.json()
//       ).then((data) => {
//         setCategories(data)
//         console.log(data)
//       }).catch(
//         (error) => console.log(error)
//       )
//   }, []) // O array vazio é o estado inicial (A ser chamado 1°) do useEffect

//   return (
//     <section className="newbook_container">
//       <h1>Cadastre livro</h1>

//       <form>
//         <Input
//           type="text"
//           name="nome_livro"
//           id="nome_livro"
//           placeholder="Digite o titulo do livro"
//           text="Digite o titulo do livro"
//         />

//         <Input
//           type="text"
//           name="nome_autor"
//           id="nome_autor"
//           placeholder="Digite o nome do autor"
//           text="Digite o nome do autor"
//         />

//         <Input
//           type="text"
//           name="descricao_livro"
//           id="descricao_livro"
//           placeholder="Digite a descricao do livro"
//           text="digite a descricao do livro"
//         />

//         <Select
//           name="categoria_livro"
//           id="categoria_livro"
//           options={categories}
//           // handlerOnChange={}
//           // value={}
//           text="testando"
//         />

//         <button type='submit'>Enviar</button>

//       </form>
//     </section>
//   )