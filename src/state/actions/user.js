import * as constants from '../constants'

export function fetchUser (username) {
  return (dispatch) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        dispatch({
          type: constants.FETCH_USER,
          user: { name : username }
        })
        resolve()
      }, 2000)
    })
  }
}

export function increment (num) {
  // let promise = new Promise((resolve, reject) => {
  //   setTimeout(() => {
  //     resolve(2)
  //   }, 2000)
  // })
  //
  // return {
  //   promise: promise,
  //   types: [constants.INCREMENT_START, constants.INCREMENT_SUCCESS, constants.INCREMENT_FAILURE]
  // }

  return (dispatch) => {

    return new Promise((resolve, reject) => {
      let result = {
        type: constants.INCREMENT_SUCCESS,
        result: num
      }

      setTimeout(() => {
        dispatch(result)
        resolve(result)
      }, 2000)

    })
  }
}


export function testPromise () {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        type: constants.TEST_PROMISE,
        user: { name : 'bento' }
      })
    }, 3000)
  })
}
