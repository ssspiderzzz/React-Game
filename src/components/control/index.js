import { actionX, actionRun, faceRight, faceLeft } from '../util/variables.js'

export function downHandler (key, setMovement) {
  console.log(key.code)
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

  if (key.code === 'ArrowUp') {
    setMovement(prev => {
      return {
        ...prev,
        moveOnYAxis: prev.moveOnYAxis + 100
      }
    })
    setTimeout(() => {
      setMovement(prev => {
        return {
          ...prev,
          moveOnYAxis: prev.moveOnYAxis - 100
        }
      })
    }, 550)
  }
}

export function upHandler (key, setMovement) {
  if (key.code === 'ArrowRight') {
    setMovement(prev => {
      return {
        ...prev,
        x: faceRight.x,
        y: faceRight.y
      }
    })
  }
  if (key.code === 'ArrowLeft') {
    setMovement(prev => {
      return {
        ...prev,
        x: faceLeft.x,
        y: faceLeft.y
      }
    })
  }
}
