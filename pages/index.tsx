import React from 'react'
import { connect } from 'react-redux'
import { startClock, serverRenderClock } from '../domain/store'
import Clock from '../components/clock'
import { Dispatchable, mapDispatchToProps } from '../lib/with-redux-store';

interface Props {}

class Index extends React.Component<Dispatchable<Props>> {
  private timer: NodeJS.Timer

  static getInitialProps ({ reduxStore, req }) {
    const isServer = !!req
    reduxStore.dispatch(serverRenderClock(isServer))

    return {}
  }

  componentDidMount () {
    const { dispatch } = this.props
    this.timer = startClock(dispatch)
  }

  componentWillUnmount () {
    clearInterval(this.timer)
  }

  render () {
    return (
      <Clock />
    )
  }
}

export default connect(null, mapDispatchToProps)(Index)
