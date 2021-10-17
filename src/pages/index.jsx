import React, {useState, useEffect} from 'react'
import site from '../styles/page.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faTimes, faTrash } from '@fortawesome/free-solid-svg-icons'

export default function page() {
  //Usado para infiltrar informações locais
  const [tarefas, criarTarefas] = useState([])
  
  const [popup, setPopup] = useState(false)

  const salvar = ()=>{
    var form = document.querySelector('#form')
    criarTarefas([
      //O ... significa adicionar todos os items anteriores de tarefas
      ...tarefas,
      {
        id: new Date().getTime(),
        adicionado: form.value,
        finalizado: false
      }
    ])
    //inidicar para salvar no banco local informações de tarefas
    window.localStorage.setItem('tarefas', JSON.stringify(tarefas))

    setPopup(false)
  }

  /*função de booleana onde vai dizer para alterar seu inverso
  Ou seja se tiver true vai pra false, e se tiver false vai pra true*/
  const abrirPopup = ()=>{
    setPopup(!popup)
  }

  const excluir = (id)=>{
    let excluirTarefas = tarefas.filter((item)=>{
      if(item.id != id) {
        return item
      }
    })

    criarTarefas(excluirTarefas)
  }

  //Função de trocar caracteristica do item
  //Foi criado o id para identificar o que vai mudar e o trocar para inverter booleanas
  const trocar = (id, trocar)=>{
    let novasTarefas = tarefas.filter((item)=>{
      if(item.id == id) {
        item.finalizado = trocar
      }
      return item
    })

    criarTarefas(novasTarefas)
    //inidicar para salvar no banco local informações de tarefas
    window.localStorage.setItem('tarefas', JSON.stringify(novasTarefas))
  }
  // Efeito de salvar item no banco de dados
  useEffect(()=>{
    if(window.localStorage.getItem('tarefas') != undefined) {
      criarTarefas(JSON.parse(window.localStorage.getItem('tarefas')))
      console.log(window.localStorage.getItem('tarefas'))
    }
  },[])

  return (
    <div className={site.section}>
      {
        //O '?' se a popup for true ele adiciona a condição a baixo
        popup?
          <div className={site.popup}>
            <div className={site.blocoForm}>
            <h3>Adicionar tarefa</h3>
            <input id='form' type="text" placeholder="Insira um item"/>
            <button onClick={(()=>salvar())} >Adicionar</button>
            </div>
          </div>
          :
          <div/>
      }

      <div onClick={()=>abrirPopup()} className={site.add}>+</div>

      <div className={site.bloco}>
        <h3>Minhas Tarefas!</h3>
        {
          tarefas.map((item)=>{
            if(item.finalizado === false) {
              return (
                <div className={site.tarefa}>
                  <div onClick={()=>trocar(item.id, true)} className={site.iconGroup}>
                    <FontAwesomeIcon icon={faTimes} className={site.times} />
                    <p>{item.adicionado}</p>
                  </div>
                  <FontAwesomeIcon onClick={()=>excluir(item.id)} icon={faTrash} className={site.trash} />
                </div>
              )
            }

            else {
              return (
                <div className={site.tarefa}>
                  <div onClick={()=>trocar(item.id, false)} className={site.iconGroup}>
                    <FontAwesomeIcon icon={faCheck} className={site.check} />
                    <p style={{textDecoration:'line-through'}}>{item.adicionado}</p>
                  </div>
                  <FontAwesomeIcon onClick={()=>excluir(item.id)} icon={faTrash} className={site.trash} />
                </div>
              )
            }
          })
        }
      </div>
    </div>
  )
}