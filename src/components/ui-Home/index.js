import React, { PropTypes, Component } from 'react'
import { connect } from 'redux/react'
import { bindActionCreators } from 'redux'
import { Link } from 'react-router'
import * as userActions from '../../state/actions/user'

if (__CLIENT__) {
  require('./index.css')
}


@connect(state => {
  return { user: state.user }
})

export default class Home extends Component {

  static propTypes = {
    dispatch: PropTypes.func.isRequired
  }

  render () {
    return (
      <div className='Application'>
        <h1>This is the home for {this.props.user.name}</h1>
        <p>total: {this.props.user.counter} </p>
        <button onClick={this.onClick.bind(this)}>
          INCREMENT
        </button>
        <Link to='/user'>Private Parts</Link>
      </div>
    )
  }

  onClick () {
    this.props.dispatch(userActions.increment(1))
  }
}
