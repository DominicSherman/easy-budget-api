import * as server from '../src/server';

jest.mock('../src/server');
jest.mock('../src/adapters/firestore-adapter');

describe('index', () => {
    it('should export graphql', () => {
        const {graphql} = require('../src/index');

        expect(graphql).toEqual(server.graphqlServer);
    });
});
