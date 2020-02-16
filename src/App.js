import React, { useState, useEffect } from 'react'
import { Router } from 'react-router-dom'
import history from './history'
import Background from './components/background'
import Avatar from './components/avatar'
import './App.css'
import { faceRight } from './components/util/variables.js'
import { downHandler, upHandler, control } from './components/control'

export default function App (props) {
  const [keys, setKeys] = useState({})
  const [movement, setMovement] = useState({
    x: faceRight.x,
    y: faceRight.y,
    moveOnXAxis: 0,
    moveOnYAxis: 0
  })

  useEffect(() => {
    window.addEventListener('keydown', key => downHandler(key, setKeys))
    window.addEventListener('keyup', key =>
      upHandler(key, setKeys, setMovement)
    )
  }, [])

  useEffect(() => {
    control(keys, setMovement)
  }, [keys])

  return (
    <div className='App'>
      <Router history={history}>
        <Background movement={movement} />
        <Avatar movement={movement} setMovement={setMovement} />
      </Router>
    </div>
  )
}
