import React, { useState, useEffect } from 'react'
import './styles.css'

export default function DevForm({ onSubmit }) {
    const [github_username, setGithub_username] = useState('')
    const [techs, setTechs] = useState('')
    const [latitude, setLatitude] = useState('')
    const [longitude, setLongitude] = useState('')

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
          position => {
            const { latitude, longitude } = position.coords
            setLatitude(latitude)
            setLongitude(longitude)
          },
          err => {
            console.log(err)
          },
          {
            timeout: 30000,
          }
        
        )
        
      }, [])

    const handleSubmit = async (event) => {
      event.preventDefault()

      await onSubmit({ github_username, techs, latitude, longitude })

      setGithub_username('')
      setTechs('')
    }      

    return (
        <form onSubmit={handleSubmit}>
          <div className="input-block">
            <label htmlFor="">Usuário do Github</label>
            <input 
              type="text" 
              name="github_username"
              id="github_username"
              required
              value={github_username}
              onChange={event => setGithub_username(event.target.value)}
            />
          </div>

          <div className="input-block">
            <label htmlFor="">Tecnologias</label>
            <input 
              type="text" 
              name="techs"
              id="techs"
              required
              value={techs}
              onChange={event => setTechs(event.target.value)}
            />
          </div>

          <div className="input-group">

            <div className="input-block">
              <label htmlFor="">Latitude</label>
              <input 
                type="number" 
                name="latitude"
                id="latitude"
                required
                value={latitude}
                onChange={event => setLatitude(event.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="">Longitude</label>
              <input 
                type="number" 
                name="longitude"
                id="longitude"
                required
                value={longitude}
                onChange={event => setLongitude(event.target.value)}
              />
            </div>

          </div>

          <button type="submit">Salvar</button>

        </form>
    )
}
