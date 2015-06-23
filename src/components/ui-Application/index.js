import React, { PropTypes, Component } from 'react'
import * as userActions from '../../state/actions/user'

/**
 * Application Layout
 */

export default class Application extends Component {

  constructor (props, context) {
    super(props, context)
    this.state = {}
  }

  static propTypes = {
    children: PropTypes.any
  }

  static fetchData (redux, params) {
    let fn = userActions.fetchUser('bento-fetched')
    return redux.dispatch(fn)
  }

  render () {
    return (
      <section className='Application'>
        {this.props.children}
      </section>
    )
  }
}
