import React, { useEffect, useState } from 'react';

import api from './services/api'

import DevItem from './components/DevItem/Index'
import DevForm from './components/DevForm/Index'
import EditingForm from './components/EditingForm/Index'
import Modal from './components/Modal/Index'

import './global.css'
import './App.css'
import './Sidebar.css'
import './Main.css'

function App() {
  const [devs, setDevs] = useState([])
  const [editing, setEditing] = useState(false)
  const [editingDev, setEditingDev] = useState([])
  const [removeOne, setRemoveOne] = useState([false, ''])

  const loadDevs = async () => {
    const response = await api.get('/devs')

    setDevs(response.data)
  }

  useEffect(() => {
    loadDevs()
  }, [])

  const getDev = id => devs.find(dev => dev._id === id)

  const handleAddDev = async (data, editing = false) => {
    let response

    if(!editing) {
      response = await api.post('/devs', data)
      setDevs([...devs, response.data])
    } else {
      response = await api.put(`/devs/${editingDev._id}`, data)
      loadDevs()
      setEditing(false)
      setEditingDev([])
    }

  }

  const handleEditing = async id => {
    setEditingDev(getDev(id))
    setEditing(true)
  }

  const handleRemove = async option => {

    if(option === 1) {
      await api.delete(`/devs/${removeOne[1]}`)
      setRemoveOne([false, ''])
    } else {
      setRemoveOne([false, ''])
    }

    loadDevs()
  }

  return (
    <div className="App">
      { removeOne[0] && <Modal handleRemove={handleRemove} removeOne={removeOne} setRemoveOne={setRemoveOne} />}
      <aside>
        <strong>{editing ? 'Editar' : 'Cadastrar'}</strong>
        {
          editing 
          ?
            <EditingForm dev={editingDev} onSubmit={handleAddDev} setEditing={setEditing} />
          :
            <DevForm onSubmit={handleAddDev} />
        }
      </aside>

      <main>
        <ul>
          {
            devs.map(dev => 
              <DevItem 
                key={dev._id} 
                dev={dev} 
                handleEditing={handleEditing} 
                handleRemove={setRemoveOne} 
              />
            )
          }
        </ul>
      </main>
    </div>
  );
}

export default App;
