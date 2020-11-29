# node-apollo-serverless

Powered by [Apollo Server Lambda](https://github.com/apollographql/apollo-server/tree/master/packages/apollo-server-lambda) -
Check [the docs here](https://www.apollographql.com/docs/apollo-server/deployment/lambda/)

## Installation

run `npm install` or `yarn`

## npm scripts

`npm run dev`: start graphiql dev server
`npm run local`: start graphql express server locally

## deployment

### via aws-cli

(make sure you have your [aws-cli](https://aws.amazon.com/de/cli/) setup and configured)

run `./deploy.sh`


[sample-app](https://79mnn29yd3.execute-api.us-east-2.amazonaws.com/Prod/graphql)
### Note: Make sure url must be same in the graphql playground as well. and after deployment give dynamo access to lambda policy.

### AWS Setup

The resolver currently fetches Data from a DynamoDB, you'll need to setup your AWS credentials for local testing in a `.env` file or add IAM permissions accordingly on the deployed lambda on the AWS console.
