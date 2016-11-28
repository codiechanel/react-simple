import * as constant from '../common/constants'

function KeywordsReducer(state = [], action) {
  switch (action.type) {
    case constant.KEYWORDS_LOADED:
      return action.payload
    case constant.KEYWORD_ADDED:
      return [...state, action.payload]
    //  return Object.assign({}, state, {  action: action.type })
    case constant.KEYWORD_DELETED:

      return state.filter(item => item.objectId !== action.objectId)
    case constant.KEYWORD_UPDATED:
      let filtered = state.filter(item => item.objectId !== action.payload.objectId)
      return [...filtered, action.payload]
    case constant.FAVORITE_ADDED:
      let filterFave = state.filter(item => item.objectId !== action.payload.objectId)
      return [...filterFave, action.payload]
    case constant.FACEBOOK_CONNECTED:
    // clear previous entries
      return []



    default:
      return state
  }
}

export default KeywordsReducer

