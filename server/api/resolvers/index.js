const { ApolloError } = require('apollo-server')
const jwt = require('jsonwebtoken')
const authMutations = require('./auth')
const { UploadScalar, DateScalar } = require('../custom-types')

module.exports = function(app) {
  return {
    Upload: UploadScalar,
    // Date: DateScalar,

    Query: {
      viewer(parent, args, context, info) {
        if (context.token) {
          return jwt.decode(context.token, app.get('JWT_SECRET'));
          }
        return null
      },
      async user(parent, { id }, { pgResource }, info) {
        try {
          const user = await pgResource.getUserById(id)
          return user
        } catch (e) {
          throw new ApolloError(e)
        }
      },
      async items(parent,{ filter }, { pgResource }, info) {
        try {
          const items = await pgResource.getItems(filter)
          return items
        }   catch (e) {
          throw new ApolloError(e)
        }
      },
      async tags(parent, args, { pgResource }, info) {
        try {
          const tags = await pgResource.getTags()
          return tags
        }   catch (e) {
          throw new ApolloError(e)
        }
      }
    },

    User: {

      async items(parent, { id }, { pgResource }, info) {
        try {
          const itemsForUser = await pgResource.getItemsForUser(id)
          return itemsForUser
          } catch (e) {
          throw new ApolloError(e)
          }
      },
      async borrowed(parent, { id }, { pgResource }, info) {
          try {
            const borrowedItemsForUser = await pgResource.getBorrowedItemsForUser(id)
            return borrowedItemsForUser
            } catch (e) {
            throw new ApolloError(e)
            }
        }
      },

    Item: {

      async itemowner(parent, id, { pgResource }, info) {
        try {
          const itemOwner = await pgResource.getUserById(parent.ownerid)
          return itemOwner
          } catch (e) {
          throw new ApolloError(e)
          }
        },
    
      async tags(parent, args, { pgResource }, info) {
      try {
        const tagsForItem = await pgResource.getTagsForItem(parent.id)
        return tagsForItem
        } catch (e) {
          throw new ApolloError(e)
        }
     
      },
      async borrower(parent, args, { pgResource }, info) {
      try {
        const itemBorrower = await pgResource.getUserById(parent.borrowerid)
        return itemBorrower
        } catch (e) {
          throw new ApolloError(e)
        }
      }
    },

    Mutation: {
      ...authMutations(app),
      async addItem(parent, args, context, info) {
        
        const image = await args.image
        const user = await jwt.decode(context.token, app.get('JWT_SECRET'))
        const newItem = await context.pgResource.saveNewItem({
          item: args.item,
          image: image,
          user
        })
        return newItem;
      }
    }
  }
}
