import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'

import { Client } from './react/app'

ReactDOM.hydrate(
  <BrowserRouter>
    <Client />
  </BrowserRouter>,
  document.getElementById('root')
)
