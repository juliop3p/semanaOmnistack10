import React from 'react'
import './styles.css'

export default function Modal({ handleRemove }) {

    return (
        <div className="alert">
            <strong>Você tem certeza que deseja excluir esse Dev?</strong>
            <hr/>
            <div className="btns-group">
            <button onClick={() => handleRemove(0)}>não</button>
            <button onClick={() => handleRemove(1)}>sim</button>
            </div>
        </div>
    )
}
