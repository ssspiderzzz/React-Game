import { actionX, actionRun, faceRight, faceLeft } from '../util/variables.js'

export function downHandler (key, setMovement) {
  console.log(key)
  setMovement(prev => ({
    ...prev,
    keys: { ...prev.keys, [key.code]: key.type == 'keydown' }
  }))
  // keys[key.code] = key.type == 'keydown'
  setMovement(prev => {
    console.log(prev.keys)
    return { ...prev }
  })

  if (key.code === 'ArrowRight') {
    setMovement(prev => {
      if (prev.facing === 'left') {
        return {
          ...prev,
          x: faceRight.x + actionX,
          y: faceRight.y,
          moveOnXAxis: prev.moveOnXAxis + actionRun,
          facing: 'right',
          movingForward: true
        }
      }

      // Edge of the right screen
      if (prev.moveOnXAxis < window.innerWidth + actionX - actionRun) {
        if (prev.x > actionX * 9) {
          return {
            ...prev,
            x: prev.x + actionX,
            moveOnXAxis: prev.moveOnXAxis + actionRun,
            movingForward: true
          }
        } else {
          return {
            ...prev,
            x: 0,
            moveOnXAxis: prev.moveOnXAxis + actionRun,
            movingForward: true
          }
        }
      } else {
        return { ...prev }
      }
    })
  }

  if (key.code === 'ArrowLeft') {
    setMovement(prev => {
      console.log(prev.facing)
      if (prev.facing === 'right') {
        return {
          ...prev,
          x: faceLeft.x - actionX,
          y: faceLeft.y,
          moveOnXAxis: prev.moveOnXAxis - actionRun,
          facing: 'left',
          movingForward: true
        }
      }

      // Edge of the left screen
      if (prev.moveOnXAxis > 0) {
        if (prev.x < 0) {
          return {
            ...prev,
            x: prev.x - actionX,
            moveOnXAxis: prev.moveOnXAxis - actionRun,
            movingForward: true
          }
        } else {
          return {
            ...prev,
            x: actionX * 9,
            moveOnXAxis: prev.moveOnXAxis - actionRun,
            movingForward: true
          }
        }
      } else {
        return { ...prev }
      }
    })
  }

  if (key.code === 'ArrowUp' || key.code === 'Space') {
    setMovement(prev => {
      // Single jump only
      if (prev.moveOnYAxis === 0) {
        if (prev.movingForward && prev.facing === 'right') {
          return {
            ...prev,
            moveOnYAxis: prev.moveOnYAxis + 100,
            moveOnXAxis: prev.moveOnXAxis + actionRun
          }
        } else if (prev.movingForward && prev.facing === 'left') {
          return {
            ...prev,
            moveOnYAxis: prev.moveOnYAxis + 100,
            moveOnXAxis: prev.moveOnXAxis - actionRun
          }
        } else {
          return {
            ...prev,
            moveOnYAxis: prev.moveOnYAxis + 100
          }
        }
      } else {
        return { ...prev }
      }
    })
    setTimeout(() => {
      setMovement(prev => {
        if (prev.moveOnYAxis !== 0) {
          return {
            ...prev,
            moveOnYAxis: 0
          }
        } else {
          return { ...prev }
        }
      })
    }, 550)
  }

  if (key.code === 'KeyX') {
    setMovement(prev => {
      return {
        ...prev,
        moveOnXAxis: prev.moveOnXAxis + actionRun * 5
      }
    })
  }
}

export function upHandler (key, setMovement) {
  if (key.code === 'ArrowRight') {
    setMovement(prev => ({
      ...prev,
      x: faceRight.x,
      y: faceRight.y,
      movingForward: false,
      keys: { ...prev.keys, [key.code]: false }
    }))
  }

  if (key.code === 'ArrowLeft') {
    setMovement(prev => ({
      ...prev,
      x: faceLeft.x,
      y: faceLeft.y,
      movingForward: false,
      keys: { ...prev.keys, [key.code]: false }
    }))
  }
}
