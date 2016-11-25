import * as constant from '../common/constants'

function CategoriesReducer(state = [], action) {
  switch (action.type) {
    case constant.CATEGORIES_LOADED:
       return action.payload
    case constant.CATEGORY_ADDED:
      return [...state, action.payload]
     //  return Object.assign({}, state, {  action: action.type })
    default:
      return state
  }
}

export default CategoriesReducer

