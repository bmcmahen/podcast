import React, { PropTypes } from 'react'
import { Redirect, Router, Route } from 'react-router'
import { Provider } from 'redux/react'
import * as stores from '../../state/stores'
import debug from 'debug'
import routes from '../../ui-routes'

const log = debug('app:logger')

/**
 * Create Root Component that wraps react-router,
 * rendered on both client & server
 */

export default class Root extends React.Component {

  constructor (props) {
    super(props)
    this.onRouteUpdate = this.onRouteUpdate.bind(this)
    this.createElement = this.createElement.bind(this)
  }

  static propTypes = {
    routerProps: PropTypes.object.isRequired,
    redux: PropTypes.object.isRequired
  }

  render () {
    const { routerProps, redux } = this.props

    return (
      <Provider redux={redux}>
        {() =>
          <Router
            {...routerProps}
            onUpdate={this.onRouteUpdate}
            routes={routes(redux)}
            createElement={this.createElement}
          />
        }
      </Provider>
    )
  }

  createElement (Component, props) {
    return <Component {...props} />
  }

  onRouteUpdate () {

  }
}
