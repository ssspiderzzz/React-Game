import { createStore } from 'redux'
import { gameReducer } from './gameReducer.ts'

export default createStore(gameReducer)
