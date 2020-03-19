import { createStore } from 'redux'
import { gameReducer } from './gameReducer.js'

export default createStore(gameReducer)
