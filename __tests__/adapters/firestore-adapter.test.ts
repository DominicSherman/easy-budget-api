import * as admin from 'firebase-admin';

import {getFirestoreData, initializeApp, setFirestoreData} from '../../src/adapters/firestore-adapter';
import * as serviceAccount from '../../src/get-service-account';

const config = require('config');
const Chance = require('chance');

jest.mock('firebase-admin', () => ({
    credential: {
        cert: jest.fn()
    },
    firestore: jest.fn(() => ({
        collection: jest.fn(() => ({
            doc: jest.fn(() => ({
                collection: jest.fn(() => ({
                    doc: jest.fn(() => ({
                        set: jest.fn()
                    })),
                    get: jest.fn(),
                    where: jest.fn(() => ({
                        get: jest.fn()
                    }))
                }))
            }))
        }))
    })),
    initializeApp: jest.fn()
}));
jest.mock('config');
jest.mock('../../src/get-service-account');

const chance = new Chance();

describe('firestore adapter', () => {
    const mockConfig = config as jest.Mocked<typeof config>;
    const {getServiceAccount} = serviceAccount as jest.Mocked<typeof serviceAccount>;

    let expectedRootPath;

    beforeEach(() => {
        initializeApp();

        expectedRootPath = chance.string();

        mockConfig.get.mockReturnValue(expectedRootPath);
    });

    afterEach(() => {
        mockConfig.get.mockClear();
    });

    describe('initializeApp', () => {
        it('should work if there is no serviceAccount', () => {
            getServiceAccount.mockReturnValue(null);

            initializeApp();

            expect(admin.initializeApp).toHaveBeenCalledWith();
        });

        it('should work if there is a serviceAccount', () => {
            getServiceAccount.mockReturnValue(chance.string());

            initializeApp();

            expect(admin.initializeApp).toHaveBeenCalledWith(expect.any(Object));
        });
    });

    describe('setFirestoreData', () => {
        let expectedDoc,
            expectedCol2,
            expectedDoc2,
            expectedData;

        beforeEach(() => {
            expectedDoc = chance.string();
            expectedCol2 = chance.string();
            expectedDoc2 = chance.string();
            expectedData = chance.string();
        });

        it('should call collection with the rootPath from config', () => {
            setFirestoreData(expectedDoc, expectedCol2, expectedDoc2, expectedData);

            expect(mockConfig.get).toHaveBeenCalledTimes(1);
            expect(mockConfig.get).toHaveBeenCalledWith('rootPath');
        });
    });

    describe('getFirestoreData', () => {
        let expectedUserId,
            expectedCollectionName;

        beforeEach(() => {
            expectedUserId = chance.string();
            expectedCollectionName = chance.string();
        });

        it('should call collection with the rootPath from config', () => {
            getFirestoreData(expectedUserId, expectedCollectionName);

            expect(mockConfig.get).toHaveBeenCalledTimes(1);
            expect(mockConfig.get).toHaveBeenCalledWith('rootPath');
        });

        it('should call collection with the rootPath from config when a where is passed in', () => {
            getFirestoreData(expectedUserId, expectedCollectionName, {
                field: chance.string(),
                operator: '<',
                value: chance.string()
            });

            expect(mockConfig.get).toHaveBeenCalledTimes(1);
            expect(mockConfig.get).toHaveBeenCalledWith('rootPath');
        });
    });
});
