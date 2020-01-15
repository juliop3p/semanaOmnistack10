import React from 'react'
import './styles.css'

export default function DevItem(props) {
    return (
        <li className="dev-item">
            <header>
              <img src={props.dev.photo_url ? props.dev.photo_url : props.dev.avatar_url } alt={props.dev.name} />
              <div className="user-info">
                <strong>{props.dev.name}</strong>
                <span>{props.dev.techs.join(', ')}</span>
              </div>
            </header>
            <p>{props.dev.bio ? props.dev.bio : 'Programador cadastrado no github.'}</p>
            <span>
                <a href={`"https://github.com/${props.dev.github_username}"`}>Acessar perfil no Github</a>
                <i className="fas fa-trash" onClick={() => props.handleRemove([true, props.dev._id])}></i>
                <i className="fas fa-user-edit" onClick={() => props.handleEditing(props.dev._id)}></i>
            </span>

          </li>
    )
}
