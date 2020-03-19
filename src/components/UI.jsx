import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { useTransition, animated } from 'react-spring'

function UI (props) {
  const transitions = useTransition(props.showUi, null, {
    from: { marginTop: -100 },
    enter: { marginTop: 0 },
    leave: { marginTop: -100 }
  })
  console.log(transitions)

  return (
    <div>
      {/* Top */}
      <div>
        {props.showUi && (
          <div
            style={{
              position: 'absolute',
              width: 200,
              height: 100,
              top: 0,
              backgroundColor: '#fcfcfc'
            }}
          />
        )}
      </div>
    </div>
  )
}

const mapStateToProps = showUi => showUi

export default connect(mapStateToProps)(UI)
