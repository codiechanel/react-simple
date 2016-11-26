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
       console.log('keyword updated')
      return state

    default:
      return state
  }
}

export default KeywordsReducer

