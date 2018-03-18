require('dotenv').config();

import express from 'express';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import { ApolloEngine } from 'apollo-engine';
import bodyParser from 'body-parser';
import compression from 'compression';
import schema from './graphql/schema';

const GRAPHQL_PORT = 3000;

const engine = new ApolloEngine({
  apiKey: process.env.ENGINE_API_KEY,
});

const graphQLServer = express();

graphQLServer.use(compression());
graphQLServer.use(
  '/graphql',
  bodyParser.json(),
  graphqlExpress({ schema, cacheControl: true })
);
graphQLServer.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

engine.listen(
  {
    port: GRAPHQL_PORT,
    graphqlPaths: ['/graphql'],
    expressApp: graphQLServer,
    launcherOptions: {
      startupTimeout: 3000,
    },
  },
  () =>
    console.log(
      `GraphiQL is now running on http://localhost:${GRAPHQL_PORT}/graphiql`
    )
);
