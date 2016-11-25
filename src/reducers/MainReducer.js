import * as constant from '../common/constants'

function MainReducer(state = { winloaded: false, connected: false }, action) {
  switch (action.type) {
    case constant.WINDOW_LOADED:
      return Object.assign({}, state, { winloaded: true })
    case constant.AWS_CONNECTED:
    console.log('connected')
      return Object.assign({}, state, { connected: true })

    default:
      return state
  }
}

export default MainReducer

