import React, { useState, useEffect } from 'react'
import './Avatar.css'
import { actionX, actionRun, faceRight, faceLeft } from '../util/variables.js'

export default function Avatar (props) {
  const [movement, setMovement] = useState({
    x: faceRight.x,
    y: faceRight.y,
    moveOnXAxis: 0
  })

  let position = {
    backgroundPositionX: movement.x + 'px',
    backgroundPositionY: movement.y + 'px',
    left: movement.moveOnXAxis + 'px'
  }

  useEffect(() => {
    window.addEventListener('keydown', downHandler)
    window.addEventListener('keyup', upHandler)
  }, [])

  function downHandler (key) {
    if (key.code === 'ArrowRight') {
      setMovement(prev => {
        if (prev.y === faceLeft.y) {
          return {
            ...prev,
            x: faceRight.x + actionX,
            y: faceRight.y,
            moveOnXAxis: prev.moveOnXAxis + actionRun
          }
        }
        if (prev.moveOnXAxis < window.innerWidth + actionX) {
          if (prev.x > actionX * 9) {
            return {
              ...prev,
              x: prev.x + actionX,
              moveOnXAxis: prev.moveOnXAxis + actionRun
            }
          } else {
            return {
              ...prev,
              x: 0,
              moveOnXAxis: prev.moveOnXAxis + actionRun
            }
          }
        } else {
          return { ...prev }
        }
      })
    }

    if (key.code === 'ArrowLeft') {
      setMovement(prev => {
        if (prev.y === faceRight.y) {
          return {
            ...prev,
            x: faceLeft.x - actionX,
            y: faceLeft.y,
            moveOnXAxis: prev.moveOnXAxis - actionRun
          }
        }
        if (prev.moveOnXAxis > 0) {
          if (prev.x < 0) {
            return {
              ...prev,
              x: prev.x - actionX,
              moveOnXAxis: prev.moveOnXAxis - actionRun
            }
          } else {
            return {
              ...prev,
              x: actionX * 9,
              moveOnXAxis: prev.moveOnXAxis - actionRun
            }
          }
        } else {
          return { ...prev }
        }
      })
    }
  }

  function upHandler (key) {
    if (key.code === 'ArrowRight') {
      clearTimeout()
      setTimeout(() => {
        setMovement(prev => {
          return {
            ...prev,
            x: faceRight.x,
            y: faceRight.y
          }
        })
      }, 100)
    }
    if (key.code === 'ArrowLeft') {
      clearTimeout()
      setTimeout(() => {
        setMovement(prev => {
          return {
            ...prev,
            x: faceLeft.x,
            y: faceLeft.y
          }
        })
      }, 100)
    }
  }

  return (
    <>
      {console.log(movement.moveOnXAxis)}
      <div className='Avatar' style={position} />
    </>
  )
}
