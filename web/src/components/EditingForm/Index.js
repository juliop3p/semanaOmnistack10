import React, { useState, useEffect, useMemo } from 'react'
import './styles.css'
import cam from '../../assets/cam.svg'

export default function EditinForm({ onSubmit, dev, setEditing }) {
    const [avatar, setAvatar] = useState(null)
    const [name, setName] = useState('')
    const [techs, setTechs] = useState('')
    const [bio, setBio] = useState('')
    const [latitude, setLatitude] = useState('')
    const [longitude, setLongitude] = useState('')

    useEffect(() => {
        setAvatar(null)
        setName(dev.name)
        setTechs(dev.techs)
        setBio(dev.bio || '')
        setLatitude(dev.location.coordinates[1])
        setLongitude(dev.location.coordinates[0])
    }, [dev])

    const preview = useMemo(
        () => {
            return avatar ? URL.createObjectURL(avatar) : null
        }, [avatar]
    )

    const handleSubmit = async (event) => {
        event.preventDefault()
        
        const data = new FormData()
        data.append('avatar', avatar)
        data.append('name', name)
        data.append('techs', techs)
        data.append('bio', bio)
        data.append('latitude', latitude)
        data.append('longitude', longitude)

        await onSubmit(data, true)

        setAvatar('')
        setName('')
        setTechs('')
        setBio('')
        setLatitude('')
        setLongitude('')
    }      

    return (
        <form onSubmit={handleSubmit}>
          <i className="fas fa-times" onClick={() => setEditing(false)}></i>
          <div>
              <label id="avatar"
                  className={avatar ? 'has-avatar' : ''}
              >
                  <img 
                      src={avatar && `${preview}`} 
                      alt="preview"
                      className="preview"
                  />
                  <input 
                      type="file"
                      onChange={event => setAvatar(event.target.files[0])}
                  />
                  <img src={dev.photo_url ? dev.photo_url : dev.avatar_url} alt="choose a avatar" className="currently-image" />
                  <div className="img-dark"></div>
                  <img src={cam} alt="choose your avatar" className="cam" />
              </label>
          </div>
            

          <div className="input-block">
            <label htmlFor="">Nome</label>
            <input 
              type="text" 
              name="name"
              id="name"
              required
              value={name}
              onChange={event => setName(event.target.value)}
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

          <div className="input-block">
            <label htmlFor="">Bio</label>
            <input 
              type="text" 
              name="bio"
              id="bio"
              required
              value={bio}
              onChange={event => setBio(event.target.value)}
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

          <button type="submit" className="editing-button">Editar</button>
        </form>
    )
}
