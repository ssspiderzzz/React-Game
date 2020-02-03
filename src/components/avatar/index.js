import React, { useState, useEffect } from 'react'
import './Avatar.css'
import { actionX, actionY, actionRun } from '../util/variables.js'

export default function Avatar (props) {
  useEffect(() => {
    window.addEventListener('keydown', downHandler)
    window.addEventListener('keyup', upHandler)
  }, [])

  function downHandler (key) {
    if (key.code === 'ArrowRight') {
      setMovement({
        ...movement,
        left: movement.left + actionRun
      })
    }
  }

  function upHandler (key) {
    console.log('key up', key)
  }

  const [movement, setMovement] = useState({
    x: -480,
    y: -910,
    left: 0
  })
  let position = {
    backgroundPositionX: movement.x + 'px',
    backgroundPositionY: movement.y + 'px',
    left: movement.left + 'px'
  }
  return <div className='Avatar' style={position} />
}
