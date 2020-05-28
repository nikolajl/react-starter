import React, { useState, useContext } from 'react'
import { InitialDataContext } from '../context'

import './HelloWorld.css'

const HelloWorld = () => {
  const InitialData = useContext(InitialDataContext)
  const [name, setName] = useState(InitialData?.name || 'World')

  return (
    <div>
      <h1 className="greeting">Hello, {name}</h1>
      <div>Say hello to: </div>
      <div><input type="text" value={name} placeholder="Type name here" onChange={e => setName(e.target.value)}/></div>
    </div>
  )
}

export default HelloWorld