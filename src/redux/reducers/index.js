import { combineReducers } from 'redux'

import app from './app'

const defaultReducer = (state = {}, action) => {
  return state;
}

export default combineReducers({
  app
})