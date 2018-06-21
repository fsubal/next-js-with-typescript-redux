import React from 'react'

import { initializeStore, exampleInitialState } from '../domain/store'

const isServer = typeof window === 'undefined'
const __NEXT_REDUX_STORE__ = '__NEXT_REDUX_STORE__'

function getOrCreateStore(initialState) {
  // Always make a new store if server, otherwise state is shared between requests
  if (isServer) {
    return initializeStore(initialState)
  }

  // Store in global variable if client
  if (!window[__NEXT_REDUX_STORE__]) {
    window[__NEXT_REDUX_STORE__] = initializeStore(initialState)
  }
  return window[__NEXT_REDUX_STORE__]
}

export type Store = ReturnType<typeof getOrCreateStore>

type Props = { reduxStore: Store }

const withReduxStore = (Component: React.ComponentClass<Props>) => {
  return class Redux extends React.Component<Props> {
    private reduxStore

    static async getInitialProps (appContext) {
      const reduxStore = getOrCreateStore(exampleInitialState)

      // Provide the store to getInitialProps of pages
      appContext.ctx.reduxStore = reduxStore

      let appProps = {}
      if ((Component as any).getInitialProps) {
        appProps = await (Component as any).getInitialProps(appContext)
      }

      return {
        ...appProps,
        initialReduxState: reduxStore.getState()
      }
    }

    constructor(props) {
      super(props)
      this.reduxStore = getOrCreateStore(props.initialReduxState)
    }

    render() {
      return (
        <Component {...this.props} reduxStore={this.reduxStore} />
      )
    }
  }
}

export default withReduxStore

export const mapDispatchToProps = dispatch => ({ dispatch })

export type Dispatchable<P> = P & ReturnType<typeof mapDispatchToProps>
