import { Query } from 'react-apollo'
import React, { Fragment, Component } from 'react'

import { VIEWER_QUERY } from '../apollo/queries'

export const ViewerContext = React.createContext()

export const ViewerProvider = ({ children }) => (
   <Query query={VIEWER_QUERY}>
    {({ data, loading, error }) => {
      return (
        <ViewerContext.Provider value={{ data, loading, error }}>
          {children}
        </ViewerContext.Provider>
      )
    }}
    </Query>
  )
