import * as firestoreAdapter from '../../src/adapters/firestore-adapter';
import * as repositoryHelpers from '../../src/helpers/repository-helpers';
import {
    deleteSavingCategory,
    getSavingCategories,
    getSavingCategoryBySavingCategoryId,
    insertSavingCategory
} from '../../src/repositories/saving-category-repository';
import {createRandomSavingCategory} from '../model-factory';

const Chance = require('chance');

const chance = new Chance();

jest.mock('../../src/adapters/firestore-adapter');
jest.mock('../../src/helpers/repository-helpers');

describe('saving category repository', () => {
    const {getFirestoreData, setFirestoreData, deleteFirestoreData} = firestoreAdapter as jest.Mocked<typeof firestoreAdapter>;
    const {getDataFromQuerySnapshot} = repositoryHelpers as jest.Mocked<typeof repositoryHelpers>;

    let expectedUserId;

    beforeEach(() => {
        expectedUserId = chance.string();
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    describe('insertSavingCategory', () => {
        let expectedResponse,
            expectedSavingCategory;

        beforeEach(() => {
            expectedResponse = {
                [chance.string()]: chance.string()
            };
            expectedSavingCategory = createRandomSavingCategory();

            setFirestoreData.mockReturnValue(expectedResponse);
        });

        it('should call setFirestoreData', () => {
            insertSavingCategory(expectedSavingCategory);

            expect(setFirestoreData).toHaveBeenCalledTimes(1);
            expect(setFirestoreData).toHaveBeenCalledWith(
                expectedSavingCategory.userId,
                'savingCategories',
                expectedSavingCategory.savingCategoryId,
                expectedSavingCategory
            );
        });
    });

    describe('deleteSavingCategory', () => {
        let expectedSavingCategory;

        beforeEach(() => {
            expectedSavingCategory = createRandomSavingCategory();
        });

        it('should call deleteFirestoreData', () => {
            deleteSavingCategory(expectedSavingCategory.userId, expectedSavingCategory.savingCategoryId);

            expect(deleteFirestoreData).toHaveBeenCalledTimes(1);
            expect(deleteFirestoreData).toHaveBeenCalledWith(
                expectedSavingCategory.userId,
                'savingCategories',
                expectedSavingCategory.savingCategoryId
            );
        });
    });

    describe('getSavingCategories', () => {
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
            await getSavingCategories(expectedUserId, expectedWhere);

            expect(getFirestoreData).toHaveBeenCalledTimes(1);
            expect(getFirestoreData).toHaveBeenCalledWith(expectedUserId, 'savingCategories', expectedWhere);
        });

        it('should call getDataFromQuerySnapshot', async () => {
            await getSavingCategories(expectedUserId);

            expect(getDataFromQuerySnapshot).toHaveBeenCalledTimes(1);
            expect(getDataFromQuerySnapshot).toHaveBeenCalledWith(expectedQuerySnapshot);
        });

        it('should return the data', async () => {
            const actualResponse = await getSavingCategories(expectedUserId);

            expect(actualResponse).toEqual(expectedResponse);
        });
    });

    describe('getSavingCategoryBySavingCategoryId', () => {
        let expectedSavingCategoryId,
            expectedSavingCategories;

        beforeEach(() => {
            expectedSavingCategoryId = chance.guid();
            expectedSavingCategories = chance.n(createRandomSavingCategory, chance.d6());

            getDataFromQuerySnapshot.mockReturnValue(expectedSavingCategories);
        });

        it('should call getFirestoreData', async () => {
            await getSavingCategoryBySavingCategoryId(expectedUserId, expectedSavingCategoryId);

            expect(getFirestoreData).toHaveBeenCalledTimes(1);
            expect(getFirestoreData).toHaveBeenCalledWith(expectedUserId, 'savingCategories', {
                field: 'savingCategoryId',
                operator: '==',
                value: expectedSavingCategoryId
            });
        });

        it('should return the savingCategory', async () => {
            const actualSavingCategory = await getSavingCategoryBySavingCategoryId(expectedUserId, expectedSavingCategoryId);

            expect(actualSavingCategory).toEqual(expectedSavingCategories[0]);
        });
    });
});
