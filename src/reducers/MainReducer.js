import * as constant from '../common/constants'

function MainReducer(state = { winloaded: false, fb_connected: false, connected: false }, action) {
  switch (action.type) {
    case constant.WINDOW_LOADED:
      return Object.assign({}, state, { winloaded: true })
    case constant.AWS_CONNECTED:
      return Object.assign({}, state, { connected: true })
    case constant.FACEBOOK_CONNECTED:
      return Object.assign({}, state, { fb_connected: true })

    default:
      return state
  }
}

export default MainReducer

