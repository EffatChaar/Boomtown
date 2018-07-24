import { adopt } from 'react-adopt'
import { Query, Mutation } from 'react-apollo'
import React from 'react'

// import { ViewerContext } from '../context/ViewerProvider'


import {
  // ALL_TAGS_QUERY,
  ALL_ITEMS_QUERY,
  // ALL_USER_ITEMS_QUERY,
  // ADD_ITEM_MUTATION
} from '../apollo/queries'


const itemsData = ({ render }) => {
  return (
    <Query query={ALL_ITEMS_QUERY} variables={{ id: 1 }}>
      {({ data: items, loading, error }) => render({items, loading, error})}
    </Query>
  );
}
  
const userItemsData = ({ userId, render }) => {
  return undefined
  // return (
  //   <Query query={ALL_USER_ITEMS_QUERY} variables={{ filter: null }}>
  //     {({ data: { items }, loading, error }) => render({items, loading, error})}
  //   </Query>
// );

}

const tagData = ({ render }) => {
  return undefined
  // return (
  // <Query query={ALL_TAGS_QUERY} variables={{ id: null }}>
  //     {({ data: { items }, loading, error }) => render({items, loading, error})}
  //   </Query>
// );
}

const addItem = ({ render }) => {
  return undefined
}

const ItemsContainer = adopt({
  // tagData,
  itemsData,
  // userItemsData,
  // addItem
})

export default ItemsContainer
