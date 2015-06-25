import * as constants from '../constants'

const initialState = {
  name: 'ben',
  counter: 0
}

const actionsMap = {
  [constants.FETCH_USER]: (state, action) => {
    return action.user
  },
  [constants.INCREMENT_SUCCESS]: (state, action) => {
    return {
      counter: action.result + state.counter
    }
  },
  [constants.TEST_PROMISE]: (state, action) => {
    return action.user
  }
}

export default function user (state = initialState, action) {
  const reduceFn = actionsMap[action.type]
  if (!reduceFn) {
    return state
  }
  let newState = Object.assign({}, state, reduceFn(state, action))
  return newState
}
