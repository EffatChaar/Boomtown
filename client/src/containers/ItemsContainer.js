import { adopt } from 'react-adopt'
import { Query, Mutation } from 'react-apollo'
import React from 'react'

import { ViewerContext } from '../context/ViewerProvider'

import {
  ALL_TAGS_QUERY,
  ALL_ITEMS_QUERY,
  ALL_USER_ITEMS_QUERY,
  ADD_ITEM_MUTATION
} from '../apollo/queries'


const itemsData = ({ render }) => (
  <ViewerContext.Consumer>
    {({ viewer }) => (
      <Query query={ALL_ITEMS_QUERY} variables={{ filter: viewer.id }}>
      {({ loading, error, data:{items} }) => render({ loading, error,items })}
    </Query>
    )}
    </ViewerContext.Consumer>
)

  
const userItemsData = ({ userId, render }) => (
  <ViewerContext.Consumer>
    {({ viewer }) => (
       <Query
       query={ALL_USER_ITEMS_QUERY}
       variables={{ id: userId || viewer.id }}
     >
       {({ loading, error, data }) => render({ loading, error, data })}
     </Query>
    )}
    </ViewerContext.Consumer>
)

const tagData = ({ render }) => (
  <Query query={ALL_TAGS_QUERY}>
    {({ loading, error, data:{tags} }) => render({ loading, error, tags })}
  </Query>
)

const addItem = ({ render }) => (
  <ViewerContext.Consumer>
    {({ viewer }) => (
      <Mutation 
      mutation={ADD_ITEM_MUTATION}
      refetchQueries={() => [
        { query: ALL_USER_ITEMS_QUERY,
          variables: { id: viewer.id } }
      ]}
      >
      {(mutation, { data, loading, error }) => 
      render({ mutation, data, loading, error })
      }
      </Mutation>
    )}
  </ViewerContext.Consumer>
)

const ItemsContainer = adopt({
  itemsData,
  userItemsData,
  tagData,
  addItem
})

export default ItemsContainer
