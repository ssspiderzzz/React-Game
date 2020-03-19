import React from 'react'
import Phaser from 'phaser'
import { Router } from 'react-router-dom'
import history from './history'
import './App.css'
import { config } from './game'
import Amplify from 'aws-amplify'
import awsconfig from './aws-exports'
import UI from './components/UI.tsx'
import { Provider } from 'react-redux'

import store from './store'

export default function App (props) {
  Amplify.configure(awsconfig)

  new Phaser.Game(config)

  return (
    <div className='App'>
      <Provider store={store}>
        <div
          style={{
            display: 'flex',
            alignContent: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
            height: '100vh'
          }}
        >
          <UI />
        </div>
      </Provider>
      <Router history={history}></Router>
    </div>
  )
}
