import React from 'react'
import Phaser from 'phaser'
import { Router } from 'react-router-dom'
import history from './history'
import './App.css'
import { config } from './game'

export default function App (props) {
  let game = new Phaser.Game(config)

  return (
    <div className='App'>
      {/* <button
        onClick={() => {
          console.log(game)
          game.restart()
          console.log(game)
        }}
      >
        Restart
      </button> */}
      <Router history={history}></Router>
    </div>
  )
}
