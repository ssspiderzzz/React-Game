import React, { useEffect } from 'react'
import './Avatar.css'

export default function Avatar (props) {
  // let position = {
  //   backgroundPositionX: props.movement.x + 'px',
  //   backgroundPositionY: props.movement.y + 'px',
  //   left: props.movement.moveOnXAxis + 'px',
  //   bottom: props.movement.moveOnYAxis + 80 + 'px'
  // }

  console.log(props.movement.movingForward)

  useEffect(() => {
    props.setMovement(prev => ({
      ...prev,
      xtest: prev.xtest + 50
    }))
  }, [props.movement.movingForward])

  let position = {
    backgroundPositionX: props.movement.x + 'px',
    backgroundPositionY: props.movement.y + 'px',
    left: props.movement.xtest + 'px',
    bottom: props.movement.moveOnYAxis + 80 + 'px'
  }
  return (
    <>
      <div className='Avatar' style={position} />
    </>
  )
}
