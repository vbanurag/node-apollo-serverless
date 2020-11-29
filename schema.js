const { gql } = require("apollo-server-lambda");
//const { gql } = require("apollo-server-express");
const { fetchOgMetaData } = require('./resolvers/metadata.js')

const typeDefs = gql`
  type Metadata @cacheControl(maxAge: 300) {
    ogTitle: String
    ogDescription: String
    ogImages: [String!]
    ogKeywords: [String!]
  }

  type Query {
    getOgMetaData(url: String!): Metadata
  }
`;

const resolvers = {
  Query: {
    getOgMetaData(obj, args, context, info) {
      return fetchOgMetaData(args.url);
    },
  }
};

const mocks = {
  Metadata: () => ({
    ogTitle: "test",
    ogDescription: "M",
    ogImages: [],
    ogKeywords: []
  }),
};

module.exports = {
  typeDefs,
  resolvers,
  mocks,
  mockEntireSchema: false,
  context: ({ event, context }) => ({
    headers: event.headers,
    functionName: context.functionName,
    event,
    context
  }),
  playground: true,
  introspection: true,
};
