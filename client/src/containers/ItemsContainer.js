import { adopt } from 'react-adopt'
import { Query, Mutation } from 'react-apollo'
import React from 'react'

// import { ViewerContext } from '../context/ViewerProvider'


import {
  ALL_TAGS_QUERY,
  ALL_ITEMS_QUERY,
  ALL_USER_ITEMS_QUERY,
  // ADD_ITEM_MUTATION
} from '../apollo/queries'


const itemsData = ({ render }) => {
  return (
    <Query query={ALL_ITEMS_QUERY} >
      {({ loading, error, data: { items } }) =>
        render({ loading, error, items })
      }
    </Query>
  );
}
  
const userItemsData = ({ userId, render }) => {
  return (
    <Query query={ALL_USER_ITEMS_QUERY} variables={{ id: 2 }}>
    {({ loading, error, data: { users } }) =>
      render({ loading, error, users })
    }
  </Query>
);

}

const tagData = ({ render }) => {
  return (
    <Query query={ALL_TAGS_QUERY}>
        {({ loading, error, data: { tags } }) => render({ loading, error, tags })}
    </Query>
  );
}

// const addItem = ({ render }) => {
//   return undefined
// }

const ItemsContainer = adopt({
  tagData,
  itemsData,
  userItemsData,
  // addItem
})

export default ItemsContainer
