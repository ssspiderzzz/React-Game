import React from 'react'
import Phaser from 'phaser'
import { Router } from 'react-router-dom'
import history from './history'
import './App.css'
import { config } from './game'

export default function App (props) {
  new Phaser.Game(config)

  return (
    <div className='App'>
      <Router history={history}></Router>
    </div>
  )
}
