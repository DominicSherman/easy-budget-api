import * as firestoreAdapter from '../../src/adapters/firestore-adapter';
import * as repositoryHelpers from '../../src/helpers/repository-helpers';
import {
    deleteDebtCategory,
    getDebtCategories,
    getDebtCategoryByDebtCategoryId,
    insertDebtCategory
} from '../../src/repositories/debt-category-repository';
import {createRandomDebtCategory} from '../model-factory';

const Chance = require('chance');

const chance = new Chance();

jest.mock('../../src/adapters/firestore-adapter');
jest.mock('../../src/helpers/repository-helpers');

describe('debt category repository', () => {
    const {getFirestoreData, setFirestoreData, deleteFirestoreData} = firestoreAdapter as jest.Mocked<typeof firestoreAdapter>;
    const {getDataFromQuerySnapshot} = repositoryHelpers as jest.Mocked<typeof repositoryHelpers>;

    let expectedUserId;

    beforeEach(() => {
        expectedUserId = chance.string();
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    describe('insertDebtCategory', () => {
        let expectedResponse,
            expectedDebtCategory;

        beforeEach(() => {
            expectedResponse = {
                [chance.string()]: chance.string()
            };
            expectedDebtCategory = createRandomDebtCategory();

            setFirestoreData.mockReturnValue(expectedResponse);
        });

        it('should call setFirestoreData', () => {
            insertDebtCategory(expectedDebtCategory);

            expect(setFirestoreData).toHaveBeenCalledTimes(1);
            expect(setFirestoreData).toHaveBeenCalledWith(
                expectedDebtCategory.userId,
                'debtCategories',
                expectedDebtCategory.debtCategoryId,
                expectedDebtCategory
            );
        });
    });

    describe('deleteDebtCategory', () => {
        let expectedDebtCategory;

        beforeEach(() => {
            expectedDebtCategory = createRandomDebtCategory();
        });

        it('should call deleteFirestoreData', () => {
            deleteDebtCategory(expectedDebtCategory.userId, expectedDebtCategory.debtCategoryId);

            expect(deleteFirestoreData).toHaveBeenCalledTimes(1);
            expect(deleteFirestoreData).toHaveBeenCalledWith(
                expectedDebtCategory.userId,
                'debtCategories',
                expectedDebtCategory.debtCategoryId
            );
        });
    });

    describe('getDebtCategories', () => {
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
            await getDebtCategories(expectedUserId, expectedWhere);

            expect(getFirestoreData).toHaveBeenCalledTimes(1);
            expect(getFirestoreData).toHaveBeenCalledWith(expectedUserId, 'debtCategories', expectedWhere);
        });

        it('should call getDataFromQuerySnapshot', async () => {
            await getDebtCategories(expectedUserId);

            expect(getDataFromQuerySnapshot).toHaveBeenCalledTimes(1);
            expect(getDataFromQuerySnapshot).toHaveBeenCalledWith(expectedQuerySnapshot);
        });

        it('should return the data', async () => {
            const actualResponse = await getDebtCategories(expectedUserId);

            expect(actualResponse).toEqual(expectedResponse);
        });
    });

    describe('getDebtCategoryByDebtCategoryId', () => {
        let expectedDebtCategoryId,
            expectedDebtCategories;

        beforeEach(() => {
            expectedDebtCategoryId = chance.guid();
            expectedDebtCategories = chance.n(createRandomDebtCategory, chance.d6());

            getDataFromQuerySnapshot.mockReturnValue(expectedDebtCategories);
        });

        it('should call getFirestoreData', async () => {
            await getDebtCategoryByDebtCategoryId(expectedUserId, expectedDebtCategoryId);

            expect(getFirestoreData).toHaveBeenCalledTimes(1);
            expect(getFirestoreData).toHaveBeenCalledWith(expectedUserId, 'debtCategories', {
                field: 'debtCategoryId',
                operator: '==',
                value: expectedDebtCategoryId
            });
        });

        it('should return the debtCategory', async () => {
            const actualDebtCategory = await getDebtCategoryByDebtCategoryId(expectedUserId, expectedDebtCategoryId);

            expect(actualDebtCategory).toEqual(expectedDebtCategories[0]);
        });
    });
});
