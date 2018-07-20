import { adopt } from 'react-adopt'
import { Query, Mutation } from 'react-apollo'
import React from 'react'

// import { ViewerContext } from '../context/ViewerProvider'


import {
  ALL_TAGS_QUERY,
  ALL_ITEMS_QUERY,
  ALL_USER_ITEMS_QUERY,
  ADD_ITEM_MUTATION
} from '../apollo/queries'

const itemsData = ({ render }) => {
  return null
}
  
const userItemsData = ({ userId, render }) => {
  return null
}

const tagData = ({ render }) => {
  return null
}

const addItem = ({ render }) => {
  return null
}

const ItemsContainer = adopt({
  // tagData,
  // itemsData,
  // userItemsData,
  // addItem
})

export default ItemsContainer
