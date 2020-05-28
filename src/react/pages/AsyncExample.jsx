import React, { useState, useEffect, useContext } from 'react'

import { getRandomFact, getFact } from '../proxy/cat-proxy'
import { useInitialData } from '../hooks'
import { useParams } from 'react-router-dom'

import { Link } from 'react-router-dom'
const NavBar = () => <ul><li><Link to="/">Home</Link></li><li><Link to="/about">About</Link></li><li><Link to="/hello">Hello</Link></li><li><Link to="/async">Async</Link></li></ul>

const AsyncExample = () => {
  const [counter, setCounter] = useState(0)

  const { id } = useParams()

  const fact = useInitialData(async () => {
    const text = id ? await getFact(id) //'591f98803b90f7150a19c229'
      : await getRandomFact()

    return 'client says: ' + text
  })
  return (
    <div>
      <h1>It's a fact:</h1>
      <div>{fact || 'loading...'}</div>
      <NavBar />
      <button type="button" onClick={() => setCounter(counter + 1)}>Click: {counter}</button>
    </div>
  )
}

export default AsyncExample
