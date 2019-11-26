import {https} from 'firebase-functions';
import {ApolloServer} from 'apollo-server-express';
import {Express} from 'express';

import schema from './schema/schema';
import resolvers from './resolver-map';
import {initializeApp} from './adapters/firestore-adapter';

import express = require('express');

const createGraphQLServer = (): Express => {
    initializeApp();

    const app = express();

    const apolloServer = new ApolloServer({
        introspection: true,
        playground: true,
        resolvers,
        typeDefs: schema
    });

    apolloServer.applyMiddleware({
        app,
        cors: true,
        path: '/'
    });

    return app;
};

export const graphqlServer = https.onRequest(createGraphQLServer());
