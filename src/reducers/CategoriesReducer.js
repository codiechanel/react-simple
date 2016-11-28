import * as constant from '../common/constants'

function CategoriesReducer(state = [], action) {
  switch (action.type) {
    case constant.CATEGORIES_LOADED:
       return action.payload
    case constant.CATEGORY_ADDED:
      return [...state, action.payload]
    case constant.FACEBOOK_CONNECTED:
    // clear previous entries
      return []
    default:
      return state
  }
}

export default CategoriesReducer

