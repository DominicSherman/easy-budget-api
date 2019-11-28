import * as firestoreAdapter from '../../src/adapters/firestore-adapter';
import * as repositoryHelpers from '../../src/helpers/repository-helpers';
import {
    getFixedCategories,
    getFixedCategoriesByTimePeriodId,
    insertFixedCategory,
    deleteFixedCategory, getFixedCategoryByFixedCategoryId
} from '../../src/repositories/fixed-category-repository';
import {createRandomFixedCategory} from '../model-factory';

const Chance = require('chance');

const chance = new Chance();

jest.mock('../../src/adapters/firestore-adapter');
jest.mock('../../src/helpers/repository-helpers');

describe('fixed category repository', () => {
    const {getFirestoreData, setFirestoreData, deleteFirestoreData} = firestoreAdapter as jest.Mocked<typeof firestoreAdapter>;
    const {getDataFromQuerySnapshot} = repositoryHelpers as jest.Mocked<typeof repositoryHelpers>;

    let expectedUserId;

    beforeEach(() => {
        expectedUserId = chance.string();
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    describe('insertFixedCategory', () => {
        let expectedResponse,
            expectedFixedCategory;

        beforeEach(() => {
            expectedResponse = {
                [chance.string()]: chance.string()
            };
            expectedFixedCategory = createRandomFixedCategory();

            setFirestoreData.mockReturnValue(expectedResponse);
        });

        it('should call setFirestoreData', () => {
            insertFixedCategory(expectedFixedCategory);

            expect(setFirestoreData).toHaveBeenCalledTimes(1);
            expect(setFirestoreData).toHaveBeenCalledWith(
                expectedFixedCategory.userId,
                'fixedCategories',
                expectedFixedCategory.fixedCategoryId,
                expectedFixedCategory
            );
        });
    });

    describe('deleteFixedCategory', () => {
        let expectedResponse,
            expectedFixedCategory;

        beforeEach(() => {
            expectedResponse = {
                [chance.string()]: chance.string()
            };
            expectedFixedCategory = createRandomFixedCategory();

            setFirestoreData.mockReturnValue(expectedResponse);
        });

        it('should call setFirestoreData', () => {
            deleteFixedCategory(expectedFixedCategory.userId, expectedFixedCategory.fixedCategoryId);

            expect(deleteFirestoreData).toHaveBeenCalledTimes(1);
            expect(deleteFirestoreData).toHaveBeenCalledWith(
                expectedFixedCategory.userId,
                'fixedCategories',
                expectedFixedCategory.fixedCategoryId
            );
        });
    });

    describe('getFixedCategories', () => {
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
            await getFixedCategories(expectedUserId, expectedWhere);

            expect(getFirestoreData).toHaveBeenCalledTimes(1);
            expect(getFirestoreData).toHaveBeenCalledWith(expectedUserId, 'fixedCategories', expectedWhere);
        });

        it('should call getDataFromQuerySnapshot', async () => {
            await getFixedCategories(expectedUserId);

            expect(getDataFromQuerySnapshot).toHaveBeenCalledTimes(1);
            expect(getDataFromQuerySnapshot).toHaveBeenCalledWith(expectedQuerySnapshot);
        });

        it('should return the data', async () => {
            const actualResponse = await getFixedCategories(expectedUserId);

            expect(actualResponse).toEqual(expectedResponse);
        });
    });

    describe('getFixedCategoriesByTimePeriodId', () => {
        let expectedTimePeriodId;

        beforeEach(() => {
            expectedTimePeriodId = chance.guid();
        });

        it('should call getFirestoreData', async () => {
            await getFixedCategoriesByTimePeriodId(expectedUserId, expectedTimePeriodId);

            expect(getFirestoreData).toHaveBeenCalledTimes(1);
            expect(getFirestoreData).toHaveBeenCalledWith(expectedUserId, 'fixedCategories', {
                field: 'timePeriodId',
                operator: '==',
                value: expectedTimePeriodId
            });
        });
    });

    describe('getFixedCategoryByFixedCategoryId', () => {
        let expectedFixedCategoryId,
            expectedFixedCategories;

        beforeEach(() => {
            expectedFixedCategoryId = chance.guid();
            expectedFixedCategories = chance.n(createRandomFixedCategory, chance.d6());

            getDataFromQuerySnapshot.mockReturnValue(expectedFixedCategories);
        });

        it('should call getFirestoreData', async () => {
            await getFixedCategoryByFixedCategoryId(expectedUserId, expectedFixedCategoryId);

            expect(getFirestoreData).toHaveBeenCalledTimes(1);
            expect(getFirestoreData).toHaveBeenCalledWith(expectedUserId, 'fixedCategories', {
                field: 'fixedCategoryId',
                operator: '==',
                value: expectedFixedCategoryId
            });
        });

        it('should return the fixedCategory', async () => {
            const actualFixedCategory = await getFixedCategoryByFixedCategoryId(expectedUserId, expectedFixedCategoryId);

            expect(actualFixedCategory).toEqual(expectedFixedCategories[0]);
        });
    });
});
