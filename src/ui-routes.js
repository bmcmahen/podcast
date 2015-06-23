import Application from './components/ui-Application'
import Home from './components/ui-Home'
import User from './components/ui-User'
import {Route} from 'react-router'
import React from 'react'
import requireAuth from './components/transitions/require-auth'

/**
 * Generate App UI Routes
 * @param  {Redux} redux
 * @return {Object}
 */

export default function generateRoutes (redux) {

  return {
    path: '/',
    component: Application,
    indexRoute: {
      component: Home
    },
    childRoutes: [
      {
        path: '/user',
        component: User,
        onEnter: requireAuth(redux)
      }
    ]
  }

}
