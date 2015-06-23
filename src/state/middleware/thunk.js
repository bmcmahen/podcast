/**
 * Handle Thunks -- basic included redux middleware
 * @param  {Function} getState
 * @return {recurse}
 */

 export default function thunkMiddleware (getState) {
   return (next) => {
     const recurse = (action) =>
       typeof action === 'function' ?
         action(recurse, getState) :
         next(action);

     return recurse;
   };
 }
