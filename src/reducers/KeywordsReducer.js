import * as constant from '../common/constants'

function KeywordsReducer(state = [], action) {
  switch (action.type) {
    case constant.KEYWORDS_LOADED:
       return action.payload
    case constant.KEYWORD_ADDED:
      return [...state, action.payload]
     //  return Object.assign({}, state, {  action: action.type })
    case constant.KEYWORD_DELETED:
    console.log('keyword bein dlt')
      return state.filter(item => item.objectId !== action.objectId);

    default:
      return state
  }
}

export default KeywordsReducer

