import * as firestoreAdapter from '../../src/adapters/firestore-adapter';
import * as repositoryHelpers from '../../src/helpers/repository-helpers';
import {
    deleteSaving,
    getSavingBySavingId,
    getSavings,
    getSavingsByVariableCategoryId,
    insertSaving
} from '../../src/repositories/saving-repository';
import {createRandomSaving} from '../model-factory';

const Chance = require('chance');

const chance = new Chance();

jest.mock('../../src/adapters/firestore-adapter');
jest.mock('../../src/helpers/repository-helpers');

describe('saving repository', () => {
    const {getFirestoreData, setFirestoreData, deleteFirestoreData} = firestoreAdapter as jest.Mocked<typeof firestoreAdapter>;
    const {getDataFromQuerySnapshot} = repositoryHelpers as jest.Mocked<typeof repositoryHelpers>;

    let expectedUserId;

    beforeEach(() => {
        expectedUserId = chance.string();
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    describe('insertSaving', () => {
        let expectedResponse,
            expectedSaving;

        beforeEach(() => {
            expectedResponse = {
                [chance.string()]: chance.string()
            };
            expectedSaving = createRandomSaving();

            setFirestoreData.mockReturnValue(expectedResponse);
        });

        it('should call setFirestoreData', () => {
            insertSaving(expectedSaving);

            expect(setFirestoreData).toHaveBeenCalledTimes(1);
            expect(setFirestoreData).toHaveBeenCalledWith(
                expectedSaving.userId,
                'savings',
                expectedSaving.savingId,
                expectedSaving
            );
        });
    });

    describe('deleteSaving', () => {
        let expectedResponse,
            expectedSaving;

        beforeEach(() => {
            expectedResponse = {
                [chance.string()]: chance.string()
            };
            expectedSaving = createRandomSaving();

            setFirestoreData.mockReturnValue(expectedResponse);
        });

        it('should call deleteFirestoreData', () => {
            deleteSaving(expectedSaving.userId, expectedSaving.savingId);

            expect(deleteFirestoreData).toHaveBeenCalledTimes(1);
            expect(deleteFirestoreData).toHaveBeenCalledWith(
                expectedSaving.userId,
                'savings',
                expectedSaving.savingId
            );
        });
    });

    describe('getSavings', () => {
        let expectedQuerySnapshot,
            expectedResponse,
            expectedWhere;

        beforeEach(() => {
            expectedQuerySnapshot = {
                [chance.string()]: chance.string()
            };
            expectedResponse = {
                [chance.string()]: chance.string()
            };
            expectedWhere = {
                [chance.string()]: chance.string()
            };

            getFirestoreData.mockReturnValue(expectedQuerySnapshot);
            getDataFromQuerySnapshot.mockReturnValue(expectedResponse);
        });

        it('should call getFirestoreData', async () => {
            await getSavings(expectedUserId, expectedWhere);

            expect(getFirestoreData).toHaveBeenCalledTimes(1);
            expect(getFirestoreData).toHaveBeenCalledWith(expectedUserId, 'savings', expectedWhere);
        });

        it('should call getDataFromQuerySnapshot', async () => {
            await getSavings(expectedUserId);

            expect(getDataFromQuerySnapshot).toHaveBeenCalledTimes(1);
            expect(getDataFromQuerySnapshot).toHaveBeenCalledWith(expectedQuerySnapshot);
        });

        it('should return the data', async () => {
            const actualResponse = await getSavings(expectedUserId);

            expect(actualResponse).toEqual(expectedResponse);
        });
    });

    describe('getSavingsByVariableCategoryId', () => {
        let expectedVariableCategoryId;

        beforeEach(() => {
            expectedVariableCategoryId = chance.guid();
        });

        it('should call getFirestoreData', async () => {
            await getSavingsByVariableCategoryId(expectedUserId, expectedVariableCategoryId);

            expect(getFirestoreData).toHaveBeenCalledTimes(1);
            expect(getFirestoreData).toHaveBeenCalledWith(expectedUserId, 'savings', {
                field: 'variableCategoryId',
                operator: '==',
                value: expectedVariableCategoryId
            });
        });
    });

    describe('getSavingBySavingId', () => {
        let expectedSavingId,
            expectedSavings;

        beforeEach(() => {
            expectedSavingId = chance.guid();
            expectedSavings = chance.n(createRandomSaving, chance.d6());

            getDataFromQuerySnapshot.mockReturnValue(expectedSavings);
        });

        it('should call getFirestoreData', async () => {
            await getSavingBySavingId(expectedUserId, expectedSavingId);

            expect(getFirestoreData).toHaveBeenCalledTimes(1);
            expect(getFirestoreData).toHaveBeenCalledWith(expectedUserId, 'savings', {
                field: 'savingId',
                operator: '==',
                value: expectedSavingId
            });
        });

        it('should return the saving', async () => {
            const actualSaving = await getSavingBySavingId(expectedUserId, expectedSavingId);

            expect(actualSaving).toEqual(expectedSavings[0]);
        });
    });
});
