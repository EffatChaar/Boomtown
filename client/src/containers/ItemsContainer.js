import { adopt } from 'react-adopt'
import { Query } from 'react-apollo'
import React from 'react'
import Mutation from 'react'

import { ViewerContext } from '../context/ViewerProvider'

import {
  ALL_TAGS_QUERY,
  ALL_ITEMS_QUERY,
  ALL_USER_ITEMS_QUERY,
  ADD_ITEM_MUTATION
} from '../apollo/queries'


const itemsData = ({ render }) => {
  return (
    <Query query={ALL_ITEMS_QUERY} >
      {({ loading, error, data: { items } }) =>
        render({ loading, error, items })
      }
    </Query>
  )
}
  
const userItemsData = ({ userId, render }) => {
  return (
    <Query query={ALL_USER_ITEMS_QUERY} variables={{ id: 2 }} >
    {({ loading, error, data: { user } }) =>
      render({ loading, error, user })
    }
  </Query>
  )
}

const tagData = ({ render }) => {
  return (
    <Query query={ALL_TAGS_QUERY} >
        {({ loading, error, data: { tags } }) =>
        render({ loading, error, tags })}
    </Query>
  )
}

const addItem = ({ render }) => {
  return (
  <Mutation 
    mutation={ADD_ITEM_MUTATION}
    >
    {(mutation, { data, loading, error }) => 
      render({ mutation, data, loading, error })
    }
    </Mutation>
  )
}

const ItemsContainer = adopt({
  itemsData,
  userItemsData,
  tagData,
  addItem
})

export default ItemsContainer
