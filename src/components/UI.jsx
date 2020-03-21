import React, { useState } from 'react'
import { connect } from 'react-redux'
import { useTransition, animated } from 'react-spring'
import store from '../store'
import { SET_PLAYER_NAME, TOGGLE_UI } from '../store/gameReducer.js'
import yes_icon from '../assets/yes.png'
import no_icon from '../assets/no.png'
import './UI.css'

function UI (props) {
  const [name, setName] = useState('')

  const transitions = useTransition(props.showUi, null, {
    from: { top: '-50%' },
    enter: { top: '50%' },
    leave: { top: '-50%' }
  })

  function onNameChange (e) {
    setName(e.target.value)
  }

  function handleSubmmit (playerName) {
    store.dispatch({ type: SET_PLAYER_NAME, playerName: playerName })
  }

  function handleCancel () {
    setName(store.getState().playerName)
    store.dispatch({ type: TOGGLE_UI })
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
                className='nameForm'
                style={{
                  ...props
                }}
              >
                <div
                  style={{
                    marginTop: '3vw',
                    color: 'black',
                    fontSize: '3vw',
                    textAlign: 'center'
                  }}
                >
                  You're an avenger now
                </div>
                <br />
                <div
                  style={{
                    marginTop: '-1vw',
                    color: 'black',
                    fontSize: '3vw',
                    textAlign: 'center'
                  }}
                >
                  Please enter your name below
                </div>
                <input
                  placeholder='Enter Your Name'
                  value={name}
                  onChange={e => onNameChange(e)}
                  style={{
                    backgroundColor: 'transparent',
                    width: '42vw',
                    height: '10vw',
                    opacity: 1,
                    left: '50%',
                    top: '50%',
                    marginLeft: '-21vw',
                    // marginTop: '-5vw',
                    position: 'relative',
                    border: 'none',
                    outline: 'none',
                    textAlign: 'center',
                    fontSize: '4vw'
                  }}
                />
                <div
                  style={{
                    left: '50%',
                    textAlign: 'center'
                  }}
                >
                  <img
                    alt='no_icon'
                    src={no_icon}
                    style={{
                      height: '5vw'
                    }}
                    onClick={() => handleCancel()}
                  />
                  <img
                    alt='yes_icon'
                    src={yes_icon}
                    style={{
                      height: '5vw',
                      marginLeft: '10vw'
                    }}
                    onClick={() => handleSubmmit(name)}
                  />
                </div>
              </animated.div>
            )
        )}
      </div>
    </div>
  )
}

const mapStateToProps = showUi => showUi

export default connect(mapStateToProps)(UI)
