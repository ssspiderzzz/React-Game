import React, { useState } from 'react'
import { connect } from 'react-redux'
import { useTransition, animated } from 'react-spring'
import store from '../store'
import { SET_PLAYER_NAME, TOGGLE_UI } from '../store/gameReducer.js'
import yes_icon from '../assets/yes.png'
import no_icon from '../assets/no.png'
import './UI.css'

function UI(props) {
  const [name, setName] = useState('')

  const transitions = useTransition(props.showUi, null, {
    from: { top: '-50%' },
    enter: { top: '50%' },
    leave: { top: '-50%' }
  })

  function onNameChange(e) {
    if (e.target.value.length <= 20) {
      setName(e.target.value)
    }
  }

  function handleSubmit(playerName) {
    store.dispatch({ type: SET_PLAYER_NAME, playerName: playerName })
    let enterName = props.game.scene.getScene('SceneA').enterName
    if (store.getState().playerName) {
      enterName.setText(store.getState().playerName).setColor('gold')
    } else {
      enterName.setText('Please Enter Your Name Here').setColor('white')
    }
  }

  function handleCancel() {
    setName(store.getState().playerName)
    store.dispatch({ type: TOGGLE_UI })
  }

  return (
    <div>
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
                <div className='nameForm_lineOne'>You're an avenger now!</div>
                <br />
                <div className='nameForm_lineTwo'>Enter your name below</div>
                <input
                  className='nameForm_input'
                  placeholder='Enter Your Name'
                  value={name}
                  onChange={e => onNameChange(e)}
                />
                <div className='nameForm_icons'>
                  <img
                    className='no_icon'
                    alt='no_icon'
                    src={no_icon}
                    onClick={() => handleCancel()}
                  />
                  <img
                    className='yes_icon'
                    alt='yes_icon'
                    src={yes_icon}
                    onClick={() => handleSubmit(name)}
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
