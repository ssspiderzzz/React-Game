import React from 'react'
import { Router } from 'react-router-dom'
import history from './history'
import mario from './Mario-748x468.jpeg'

import './App.css'

export default function App (props) {
  return (
    <div className='App'>
      <Router history={history}>
        <img src={mario} alt='bg' />
      </Router>
    </div>
  )
}
