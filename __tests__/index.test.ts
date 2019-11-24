import * as server from '../src/server';

jest.mock('../src/server');

describe('index', () => {
    it('should export graphql', () => {
        const {graphql} = require('../src/index');

        expect(graphql).toEqual(server.graphqlServer);
    });
});
