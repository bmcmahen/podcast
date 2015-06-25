import React from 'react'
import { connect } from 'redux/react'

@connect(state => {
  return { user: state.user }
})

export default class User extends React.Component {

  static propTypes = {

  }

  render () {
    const { user } = this.props
    return (
      <div className='User'>
        Hello {user.name}, this is private
      </div>
    )
  }

}
