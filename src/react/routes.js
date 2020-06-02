import React from 'react'
import { Link } from 'react-router-dom'

// TODO: Create your own components
import HelloWorld from './pages/HelloWorld.jsx'
import AsyncExample from './pages/AsyncExample.jsx'
const NavBar = () => (
  <ul>
    <li>
      <Link to="/">Home</Link>
    </li>
    <li>
      <Link to="/about">About</Link>
    </li>
    <li>
      <Link to="/hello">Hello</Link>
    </li>
    <li>
      <Link to="/async">Async</Link>
    </li>
  </ul>
)
const Home = () => (
  <div>
    <h1>Home</h1>
    <NavBar />
  </div>
)
const About = () => (
  <div>
    <h1>About</h1>
    <NavBar />
  </div>
)
const NotFound = ({ staticContext }) => {
  // Source: https://reacttraining.com/react-router/web/guides/server-rendering
  if (staticContext) {
    staticContext.status = 404
  }

  return (
    <div>
      <h1>404 Not found!</h1>
      <NavBar />
    </div>
  )
}

export const routes = [
  {
    path: '/',
    exact: true,
    component: Home
  },
  {
    path: '/about',
    exact: true,
    component: About
  },
  {
    path: '/hello',
    exact: true,
    component: HelloWorld
  },
  {
    path: '/async',
    exact: true,
    component: AsyncExample
  },
  {
    path: '/async/:id',
    exact: true,
    component: AsyncExample
  },
  {
    component: NotFound
  }
]
