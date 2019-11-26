import * as apolloServer from 'apollo-server-express';
import * as express from 'express';

import schema from '../src/schema/schema';
import resolverMap from '../src/resolver-map';
import {initializeApp} from '../src/adapters/firestore-adapter';

jest.mock('firebase-functions');
jest.mock('express');
jest.mock('apollo-server-express');
jest.mock('../src/adapters/firestore-adapter');

describe('server', () => {
    beforeAll(() => {
        // eslint-disable-next-line no-unused-expressions
        require('../src/server').graphqlServer;
    });

    describe('graphqlServer', () => {
        it('should initializeApp', () => {
            expect(initializeApp).toHaveBeenCalledTimes(1);
        });

        it('should call express', () => {
            expect(express).toHaveBeenCalledTimes(1);
        });

        it('should call ApolloServer', () => {
            expect(apolloServer.ApolloServer).toHaveBeenCalledTimes(1);
            expect(apolloServer.ApolloServer).toHaveBeenCalledWith({
                introspection: true,
                playground: true,
                resolvers: resolverMap,
                typeDefs: schema
            });
        });
    });
});
