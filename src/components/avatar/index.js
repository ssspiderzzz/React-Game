import React, { useEffect } from 'react'
import './Avatar.css'

export default function Avatar (props) {
  let position = {
    backgroundPositionX: props.movement.x + 'px',
    backgroundPositionY: props.movement.y + 'px',
    left: props.movement.moveOnXAxis + 'px',
    bottom: props.movement.moveOnYAxis + 80 + 'px'
  }

  // console.log(props.movement.movingForward)

  // var myVar = setInterval(setColor, 300)

  // function setColor () {
  //   console.log(`setcolor`)
  //   props.setMovement(prev => ({
  //     ...prev,
  //     xtest: prev.xtest + 50
  //   }))
  // }

  // function stopColor () {
  //   clearInterval(myVar)
  // }

  // useEffect(() => {
  //   props.movement.movingForward ? setColor() : stopColor()
  // }, [props.movement.movingForward])

  // let position = {
  //   backgroundPositionX: props.movement.x + 'px',
  //   backgroundPositionY: props.movement.y + 'px',
  //   left: props.movement.xtest + 'px',
  //   bottom: props.movement.moveOnYAxis + 80 + 'px'
  // }
  return (
    <>
      <div className='Avatar' style={position} />
    </>
  )
}
