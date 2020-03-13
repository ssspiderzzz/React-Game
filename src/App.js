import React from 'react'
import Phaser from 'phaser'
import { Router } from 'react-router-dom'
import history from './history'
import './App.css'
import { config } from './game'
import Amplify from 'aws-amplify'
import awsconfig from './aws-exports'

export default function App (props) {
  Amplify.configure(awsconfig)

  new Phaser.Game(config)

  return (
    <div className='App'>
      <Router history={history}></Router>
    </div>
  )
}
