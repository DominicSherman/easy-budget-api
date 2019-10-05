import {https} from 'firebase-functions';
import express from 'express';
import {ApolloServer} from 'apollo-server-express';
import schema from './schema';
import resolvers from './resolver-map';

const createGraphQLServer = () => {
    const app = express();

    const apolloServer = new ApolloServer({
        typeDefs: schema,
        resolvers,
        introspection: true,
        playground: true
    });

    apolloServer.applyMiddleware({app, path: '/', cors: true});

    return app;
};

const server = createGraphQLServer();

const api = https.onRequest(server);

export {api};