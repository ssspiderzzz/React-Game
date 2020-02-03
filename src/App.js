import React from 'react'
import { Router } from 'react-router-dom'
import history from './history'
import Background from './components/background'
import Avatar from './components/avatar'

import './App.css'

export default function App (props) {
  return (
    <div className='App'>
      <Router history={history}>
        <Background />
        <Avatar />
      </Router>
    </div>
  )
}
