export const TOGGLE_UI = 'TOGGLE_UI'
export const TOGGLE_UI_ON = 'TOGGLE_UI_ON'
export const SET_PLAYER_NAME = 'SET_PLAYER_NAME'

const initState = {
  showUi: false,
  playerName: ''
}

// export const toggleUi = () => ({
//   type: TOGGLE_UI
// })

export const gameReducer = (state = initState, action) => {
  console.log('Action:', action)
  switch (action.type) {
    case TOGGLE_UI:
      return { ...state, showUi: !state.showUi }
    case TOGGLE_UI_ON:
      return { ...state, showUi: true }
    case SET_PLAYER_NAME:
      return {
        ...state,
        playerName: action.playerName,
        showUi: !state.showUi
      }

    default:
      return state
  }
}