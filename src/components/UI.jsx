import React, { useState } from 'react'
import { connect } from 'react-redux'
import { useTransition, animated } from 'react-spring'

function UI (props) {
  const [name, setName] = useState('')

  const transitions = useTransition(props.showUi, null, {
    from: { marginTop: -100 },
    enter: { marginTop: window.innerHeight / 2 },
    leave: { marginTop: -500 }
  })

  function onNameChange (e) {
    setName(e.target.value)
  }

  return (
    <div>
      {/* Top */}
      <div>
        {transitions.map(
          ({ item, key, props }) =>
            item && (
              <animated.div
                key={key}
                style={{
                  ...props,
                  position: 'absolute',
                  width: '50vw',
                  height: '30vw',
                  top: 0,
                  backgroundColor: '#fcfcfc',
                  opacity: 1,
                  left: '50%',
                  marginLeft: '-25vw',
                  borderRadius: '5vw'
                }}
              >
                <input
                  placeholder='Please Enter Your Name'
                  onChange={e => onNameChange(e)}
                  style={{
                    width: '42vw',
                    height: '10vw',
                    opacity: 1,
                    left: '50%',
                    top: '50%',
                    marginLeft: '-21vw',
                    marginTop: '-10vw',
                    position: 'relative',
                    border: 'none',
                    outline: 'none',
                    textAlign: 'center',
                    fontSize: '4vw'
                  }}
                ></input>
              </animated.div>
            )
        )}
      </div>
    </div>
  )
}

const mapStateToProps = showUi => showUi

export default connect(mapStateToProps)(UI)
