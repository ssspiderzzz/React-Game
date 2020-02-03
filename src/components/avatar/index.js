import React, { useState } from 'react'
import './Avatar.css'
import { actionX, actionY, actionRun } from '../util/variables.js'

export default function Avatar (props) {
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
