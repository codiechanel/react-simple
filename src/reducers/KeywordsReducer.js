import * as constant from '../common/constants'

function KeywordsReducer(state = [], action) {
  switch (action.type) {
    case constant.KEYWORDS_LOADED:
       return action.payload
    case constant.KEYWORD_ADDED:
      return [...state, action.payload]
     //  return Object.assign({}, state, {  action: action.type })
    default:
      return state
  }
}

export default KeywordsReducer

