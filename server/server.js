// Importing our dependencies
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const { graphqlUploadExpress } = require('graphql-upload-minimal');
const path = require('path');

// Importing our typeDefs and resolvers
// Establishing our db connection
const { typeDefs, resolvers } = require('./schemas');
const { authMiddleware } = require('./utils/auth');
const  connection = require('./config/connection');

// Here we state the local host PORT we will be using
const PORT = process.env.PORT || 3001;
const app = express();
const server = new ApolloServer({
  typeDefs,
  resolvers,
  csrfPrevention: true,
  uploads: false,
  context: {authMiddleware},
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(graphqlUploadExpress());

// When production is ran, app will be sent to the ../client/build folder
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'), function(err) {
    if (err) {
      res.status(500).send(err)
    }
  });
});

// This will initialize our Apollo Server and  apply the middleware
const startApolloServer = async (typeDefs, resolvers) => {
  await server.start();
  server.applyMiddleware({ app });

  connection.once('open', () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`);
      console.log(
        `Use GraphQL at http://localhost:${PORT}${server.graphqlPath}`
      );
    });
  });
};


// Initiate the Apollo Server with the typeDefs and Resolvers as parameters
startApolloServer(typeDefs, resolvers);