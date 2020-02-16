import { actionX, actionRun, faceRight, faceLeft } from '../util/variables.js'

export function control (keys, setMovement) {
  if (keys.ArrowRight) {
    setMovement(prev => {
      if (prev.y === faceLeft.y) {
        return {
          ...prev,
          x: faceRight.x + actionX,
          y: faceRight.y,
          moveOnXAxis: prev.moveOnXAxis + actionRun
        }
      }

      // Edge of the right screen
      if (prev.moveOnXAxis < window.innerWidth + actionX - actionRun) {
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

  if (keys.ArrowLeft) {
    setMovement(prev => {
      if (prev.y === faceRight.y) {
        return {
          ...prev,
          x: faceLeft.x - actionX,
          y: faceLeft.y,
          moveOnXAxis: prev.moveOnXAxis - actionRun
        }
      }

      // Edge of the left screen
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

  if (keys.ArrowUp || keys.Space) {
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

  if (keys.KeyX) {
    setMovement(prev => {
      return {
        ...prev,
        moveOnXAxis: prev.moveOnXAxis + actionRun * 5
      }
    })
  }
}

export function downHandler (key, setKeys) {
  setKeys(prev => ({
    ...prev,
    [key.code]: key.type === 'keydown'
  }))
}

export function upHandler (key, setKeys, setMovement) {
  setMovement(prev => {
    switch (prev.y) {
      case faceRight.y:
        return {
          ...prev,
          x: faceRight.x,
          y: faceRight.y
        }
      case faceLeft.y:
        return {
          ...prev,
          x: faceLeft.x,
          y: faceLeft.y
        }
      default:
        return { ...prev }
    }
  })
  setKeys(prev => ({
    ...prev,
    [key.code]: false
  }))
}
