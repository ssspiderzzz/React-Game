import React from 'react'
import './Avatar.css'

export default function Avatar (props) {
  let position = {
    backgroundPositionX: props.movement.x + 'px',
    backgroundPositionY: props.movement.y + 'px',
    left: props.movement.moveOnXAxis + 'px',
    bottom: props.movement.moveOnYAxis + 80 + 'px'
  }

  return (
    <>
      <div className='Avatar' style={position} />
    </>
  )
}
