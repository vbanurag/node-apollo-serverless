const { ApolloServer } = require("apollo-server-express");
const express = require('express');

const schema = require("./schema");

const server = new ApolloServer({
    typeDefs: schema.typeDefs,
    resolvers: schema.resolvers,
    introspection: true
});

const app = express();


server.applyMiddleware({ app });

app.listen({ port: '3000' }, () => {
    console.log(`Server is up and running on `);
});
