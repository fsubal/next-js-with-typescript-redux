import { Container, AppComponentProps } from 'next/app'
import React from 'react'
import withReduxStore, { Store } from '../lib/with-redux-store'
import { Provider } from 'react-redux'

interface Props {
  reduxStore: Store
}

export default withReduxStore(
  class MyApp extends React.Component<Props & AppComponentProps> {
    render () {
      const { Component, pageProps, reduxStore } = this.props
      return (
        <Container>
          <Provider store={reduxStore}>
            <Component {...pageProps} />
          </Provider>
        </Container>
      )
    }
  }
)
