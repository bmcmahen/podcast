import { Router } from 'react-router'
import routes from './ui-routes'
import React from 'react'
import injectScript from './util/inject'
import {createRedux, createDispatcher, composeStores} from 'redux'
import * as stores from './state/stores'
import { thunkMiddleware, promiseMiddleware } from './state/middleware'
import Root from './components/Containers/Root'
import Location from 'react-router/lib/Location'
import Boom from 'boom'

const host = process.env.NODE_ENV === 'production'
  ? null
  : '//localhost:8080'

/**
 * Render our HTML template with react html & data
 * @param  {String} html
 * @return {Object}
 */

function renderTemplate (html, preloaded = {}) {
  let str = (
    `<!doctype html>
      <html lang="en-us">
        <head>
          <meta charset="utf-8">
          <title>Podcaster</title>
          <link rel="shortcut icon" href="/assets/favicon.ico">
        </head>
        <body>
          <div id="react-root">${html}</div>
        </body>
      </html>`
  )
  return injectScript(str, preloaded, [`${host}/client.js`])
}

/**
 * Render our react routes on the server
 * @param  {String}   path
 * @param  {String}   query
 * @param  {Function} fn
 */

export default function renderServer (request, reply) {
  const {query, path} = request

  const dispatcher = createDispatcher(
    composeStores(stores),
    getState => [ thunkMiddleware(getState), promiseMiddleware() ]
  )

  const sessionData = {}
  const redux = createRedux(dispatcher, sessionData)
  const currentRoutes = routes(redux)
  const location = new Location(path, query)

  Router.run(currentRoutes, location, (err, routerState, transition) => {
    if (err) {
      return reply(Boom.wrap(err))
    }

    if (transition.isCancelled) {
      // todo: include this as a queryparam
      // let redirectPath = transition.state && (transition.state.nextPathname || '/user')
      let nextPath = transition.redirectInfo.pathname
      return reply.redirect(nextPath)
    }

    // call any promise contained within a static fetchData method
    Promise.all(routerState.components
      .filter(component => component.fetchData)
      .map(component => {
        return component.fetchData(redux)
      }))
      .then(() => {
        let stateToTransfer = redux.getState()
        let html = React.renderToString(
          <Root
            routerProps={routerState}
            redux={redux}
          />
        )
        return reply(renderTemplate(html, stateToTransfer))
      })
      .catch(error => {
        return reply(Boom.wrap(error))
      })


  })
}
