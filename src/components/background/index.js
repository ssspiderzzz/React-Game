import React from 'react'
import './Background.css'

export default function Background (props) {
  let x = props.movement.moveOnXAxis
  let position = {
    backgroundPosition: `left 0px bottom -110px, left ${-x *
      0.4}px bottom 60px, left ${-x * 0.2}px bottom 80px`
  }

  return <div className='Background' style={position} />
}
