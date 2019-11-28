import * as firestoreAdapter from '../../src/adapters/firestore-adapter';
import * as repositoryHelpers from '../../src/helpers/repository-helpers';
import {
    deleteVariableCategory,
    getVariableCategories,
    getVariableCategoriesByTimePeriodId, getVariableCategoryByVariableCategoryId,
    insertVariableCategory
} from '../../src/repositories/variable-category-repository';
import {createRandomVariableCategory} from '../model-factory';

const Chance = require('chance');

const chance = new Chance();

jest.mock('../../src/adapters/firestore-adapter');
jest.mock('../../src/helpers/repository-helpers');

describe('variable category repository', () => {
    const {getFirestoreData, setFirestoreData, deleteFirestoreData} = firestoreAdapter as jest.Mocked<typeof firestoreAdapter>;
    const {getDataFromQuerySnapshot} = repositoryHelpers as jest.Mocked<typeof repositoryHelpers>;

    let expectedUserId;

    beforeEach(() => {
        expectedUserId = chance.string();
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    describe('insertVariableCategory', () => {
        let expectedResponse,
            expectedVariableCategory;

        beforeEach(() => {
            expectedResponse = {
                [chance.string()]: chance.string()
            };
            expectedVariableCategory = createRandomVariableCategory();

            setFirestoreData.mockReturnValue(expectedResponse);
        });

        it('should call setFirestoreData', () => {
            insertVariableCategory(expectedVariableCategory);

            expect(setFirestoreData).toHaveBeenCalledTimes(1);
            expect(setFirestoreData).toHaveBeenCalledWith(
                expectedVariableCategory.userId,
                'variableCategories',
                expectedVariableCategory.variableCategoryId,
                expectedVariableCategory
            );
        });
    });

    describe('deleteVariableCategory', () => {
        let expectedVariableCategory;

        beforeEach(() => {
            expectedVariableCategory = createRandomVariableCategory();
        });

        it('should call deleteFirestoreData', () => {
            deleteVariableCategory(expectedVariableCategory.userId, expectedVariableCategory.variableCategoryId);

            expect(deleteFirestoreData).toHaveBeenCalledTimes(1);
            expect(deleteFirestoreData).toHaveBeenCalledWith(
                expectedVariableCategory.userId,
                'variableCategories',
                expectedVariableCategory.variableCategoryId
            );
        });
    });

    describe('getVariableCategories', () => {
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
            await getVariableCategories(expectedUserId, expectedWhere);

            expect(getFirestoreData).toHaveBeenCalledTimes(1);
            expect(getFirestoreData).toHaveBeenCalledWith(expectedUserId, 'variableCategories', expectedWhere);
        });

        it('should call getDataFromQuerySnapshot', async () => {
            await getVariableCategories(expectedUserId);

            expect(getDataFromQuerySnapshot).toHaveBeenCalledTimes(1);
            expect(getDataFromQuerySnapshot).toHaveBeenCalledWith(expectedQuerySnapshot);
        });

        it('should return the data', async () => {
            const actualResponse = await getVariableCategories(expectedUserId);

            expect(actualResponse).toEqual(expectedResponse);
        });
    });

    describe('getVariableCategoriesByTimePeriodId', () => {
        let expectedTimePeriodId;

        beforeEach(() => {
            expectedTimePeriodId = chance.guid();
        });

        it('should call getFirestoreData', async () => {
            await getVariableCategoriesByTimePeriodId(expectedUserId, expectedTimePeriodId);

            expect(getFirestoreData).toHaveBeenCalledTimes(1);
            expect(getFirestoreData).toHaveBeenCalledWith(expectedUserId, 'variableCategories', {
                field: 'timePeriodId',
                operator: '==',
                value: expectedTimePeriodId
            });
        });
    });

    describe('getVariableCategoryByVariableCategoryId', () => {
        let expectedVariableCategoryId,
            expectedVariableCategories;

        beforeEach(() => {
            expectedVariableCategoryId = chance.guid();
            expectedVariableCategories = chance.n(createRandomVariableCategory, chance.d6());

            getDataFromQuerySnapshot.mockReturnValue(expectedVariableCategories);
        });

        it('should call getFirestoreData', async () => {
            await getVariableCategoryByVariableCategoryId(expectedUserId, expectedVariableCategoryId);

            expect(getFirestoreData).toHaveBeenCalledTimes(1);
            expect(getFirestoreData).toHaveBeenCalledWith(expectedUserId, 'variableCategories', {
                field: 'variableCategoryId',
                operator: '==',
                value: expectedVariableCategoryId
            });
        });

        it('should return the variableCategory', async () => {
            const actualVariableCategory = await getVariableCategoryByVariableCategoryId(expectedUserId, expectedVariableCategoryId);

            expect(actualVariableCategory).toEqual(expectedVariableCategories[0]);
        });
    });
});
