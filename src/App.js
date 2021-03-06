import React from 'react'
import Phaser from 'phaser'
import { Router } from 'react-router-dom'
import history from './history'
import './App.css'
import { config } from './game'
import Amplify from 'aws-amplify'
import awsconfig from './aws-exports'
import UI from './components/UI.jsx'
import { Provider } from 'react-redux'
import store from './store'
import { MOBILE_DEVICE } from './store/gameReducer'

export default function App(props) {
  if (
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(
      navigator.userAgent
    )
  ) {
    store.dispatch({ type: MOBILE_DEVICE })
  }

  Amplify.configure(awsconfig)

  let game = new Phaser.Game(config)

  return (
    <div className='App'>
      <Provider store={store}>
        <UI game={game} />
      </Provider>
      <Router history={history}></Router>
    </div>
  )
}
