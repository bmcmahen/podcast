import React from 'react'
import BrowserHistory from 'react-router/lib/BrowserHistory'
import Root from './components/Containers/Root'
import { createRedux, createDispatcher, composeStores } from 'redux'
import * as stores from './state/stores'
import { loggerMiddleware, thunkMiddleware, promiseMiddleware } from './state/middleware'

// Instantiate our clientside specifics
const history = new BrowserHistory()
const preloaded = window.__reactTransmitPacket || {}
const dispatcher = createDispatcher(
  composeStores(stores),
  getState => [ thunkMiddleware(getState), promiseMiddleware() ]
)
const redux = createRedux(dispatcher, preloaded)
const routerProps = { history }

// Render our App
React.render(
  <Root redux={redux} routerProps={routerProps} />,
  document.getElementById('react-root')
)
