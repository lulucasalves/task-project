import React, {useState, useEffect} from 'react'
import site from '../styles/page.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons'

export default function page() {
  //Usado para infiltrar informações locais
  const [tarefas, criartarefas] = useState([
    {
      id: 0,
      adicionado: 'Fazer compras',
      finalizado: true,
    },
    {
      id: 0,
      adicionado: 'Fazer tarefa',
      finalizado: false,
    }
  ])
  
  const [popup, setPopup] = useState(false)

  /*função de booleana onde vai dizer para alterar seu inverso
  Ou seja se tiver true vai pra false, e se tiver false vai pra true*/
  const abrirPopup = ()=>{
    setPopup(!popup)
  }

  useEffect(()=>{
    //usar efeito com API
  })

  return (
    <div className={site.section}>
      {
        //Função de criar Popup
      }
      <div onClick={()=>abrirPopup()} className={site.add}>+</div>

      <div className={site.bloco}>
        <h3>Minhas Tarefas!</h3>
        {
          tarefas.map((item)=>{
            if(item.finalizado === false) {
              return (
                <div className={site.tarefa}>
                  <FontAwesomeIcon icon={faTimes} className={site.times} />
                  <p>{item.adicionado}</p>
                </div>
              )
            }

            else {
              return (
                <div className={site.tarefa}>
                  <FontAwesomeIcon icon={faCheck} className={site.check} />
                  <p style={{textDecoration:'line-through'}}>{item.adicionado}</p>
                </div>
              )
            }
          })
        }
      </div>
    </div>
  )
}