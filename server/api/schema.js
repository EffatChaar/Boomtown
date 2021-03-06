const { gql } = require('apollo-server')

module.exports = gql`
  scalar Upload
  scalar Date

  enum Role {
    VIEWER
  }

  directive @auth on OBJECT | FIELD_DEFINITION


  type Item @auth {
    id: ID!
    title: String!
    imageurl: String
    description: String!
    itemowner: User!
    tags: [Tag]
    created: Date!
    borrower: User
  }

  type User @auth {
    id: ID!
    email: String!
    password: String!
    fullname: String!
    bio: String
    items: [Item]
    borrowed: [Item]
  }

  type Tag @auth {
   id: ID!
   title: String!
  }

  type File @auth {
    id: ID!
    filename: String!
    mimetype: String!
    encoding: String!
    itemid: ID!
  }

  input AssignedTag {
    id: ID!
    title: String!
  }

  input AssignedBorrower {
    id: ID!
  }

  input NewItemInput {
    title: String!
    description: String
    tags: [AssignedTag]!
  }

  type Query {
    user(id: ID!): User
    viewer: User
    items(filter: ID): [Item]
    tags: [Tag]
  }

  input SignupInput {
    fullname: String!
    email: String!
    password: String!
  }

  input LoginInput {
    email: String!
    password: String!
  }
  type Mutation {
    addItem(
      item: NewItemInput!,
      image: Upload
    ): Item
    signup(
     user: SignupInput!): User!
    login(
      user: LoginInput!): User
    logout: Boolean
  }
`