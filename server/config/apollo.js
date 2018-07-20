const { ApolloServer } = require('apollo-server')
const { apolloUploadExpress } = require('apollo-upload-server')
const { makeExecutableSchema } = require('graphql-tools')

const typeDefs = require('../api/schema')
let resolvers = require('../api/resolvers')

module.exports = function({ app, pgResource }) {
  resolvers = resolvers(app)

  const schema = makeExecutableSchema ({
    typeDefs,
    resolvers
  })
  // -------------------------------

  const apolloServer = new ApolloServer({
    context: ({ req }) => {
      // @TODO: Uncomment this later when we add auth (to be added to Apollo's context)
      // const tokenName = app.get("JWT_COOKIE_NAME")
      // const token = req ? req.cookies[tokenName] : undefined
      // -------------------------------

      return {
        pgResource
     
      }
    },
    schema
  })

  apolloServer.applyMiddleware({
    app,
    uploads: true,
    cors: app.get('CORS_CONFIG'),
    uploads: apolloUploadExpress({
      maxFileSize: 10000000 // 10mb
    })
  })
}
