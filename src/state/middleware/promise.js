/**
 * Handle Promises
 */

export default function promiseMiddleware () {
  return (next) => {
    const recurse = (action) => {
      if (action && action.promise) {
        let {promise, types, ...args} = action
        let [REQUEST, SUCCESS, FAILURE] = types
        next({ ...args, type: REQUEST })
        return action.promise.then(
          (result) => {
            let doc = { result, ...args, type: SUCCESS }
            next(doc)
            return doc
          },
          (error) => {
            let doc = { error, ...args, type: FAILURE }
            next(doc)
            return doc
          }
        )
      } else {
        console.log('next actiohn', action)
        return next(action)
      }
    }
    return recurse
  }
}
