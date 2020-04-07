import {chance} from '../chance';
import {createRandomDebtCategory} from '../model-factory';
import * as debtCategoryRepository from '../../src/repositories/debt-category-repository';
import {
    createDebtCategoryResolver,
    deleteDebtCategoryResolver,
    getDebtCategoriesResolver,
    getDebtCategoryResolver,
    updateDebtCategoryResolver
} from '../../src/resolvers/debt-category-resolvers';
import * as resolverHelpers from '../../src/helpers/resolver-helpers';

jest.mock('../../src/repositories/debt-category-repository');
jest.mock('../../src/helpers/resolver-helpers');

describe('debt category resolvers', () => {
    const {
        getDebtCategories,
        insertDebtCategory,
        getDebtCategoryByDebtCategoryId,
        deleteDebtCategory
    } = debtCategoryRepository as jest.Mocked<typeof debtCategoryRepository>;
    const {getPropertyFromArgsOrRoot} = resolverHelpers as jest.Mocked<typeof resolverHelpers>;

    let root,
        args;

    beforeEach(() => {
        root = {
            [chance.string()]: chance.string()
        };
        args = {
            [chance.string()]: chance.string()
        };
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    describe('createDebtCategoryResolver', () => {
        let expectedCreateDebtCategory;

        beforeEach(() => {
            expectedCreateDebtCategory = createRandomDebtCategory();

            args = {
                debtCategory: expectedCreateDebtCategory
            };
        });

        it('should call insertDebtCategory', async () => {
            await createDebtCategoryResolver(root, args);

            expect(insertDebtCategory).toHaveBeenCalledTimes(1);
            expect(insertDebtCategory).toHaveBeenCalledWith({
                ...expectedCreateDebtCategory,
                amount: 0
            });
        });

        it('should return the input', async () => {
            const actualResponse = await createDebtCategoryResolver(root, args);

            expect(actualResponse).toEqual(expectedCreateDebtCategory);
        });
    });

    describe('updateDebtCategoryResolver', () => {
        let expectedUpdateDebtCategory;

        beforeEach(() => {
            expectedUpdateDebtCategory = createRandomDebtCategory();

            args = {
                debtCategory: expectedUpdateDebtCategory
            };

            getDebtCategoryByDebtCategoryId.mockReturnValue(expectedUpdateDebtCategory);
        });

        it('should call insertDebtCategory', async () => {
            await updateDebtCategoryResolver(root, args);

            expect(insertDebtCategory).toHaveBeenCalledTimes(1);
            expect(insertDebtCategory).toHaveBeenCalledWith(expectedUpdateDebtCategory);
        });

        it('should return the input', async () => {
            const actualResponse = await updateDebtCategoryResolver(root, args);

            expect(actualResponse).toEqual(expectedUpdateDebtCategory);
        });
    });

    describe('deleteDebtCategoryResolver', () => {
        let expectedDebtCategory;

        beforeEach(() => {
            expectedDebtCategory = createRandomDebtCategory();

            args = {
                debtCategoryId: expectedDebtCategory.debtCategoryId,
                userId: expectedDebtCategory.userId
            };
        });

        it('should call deleteDebtCategory', async () => {
            await deleteDebtCategoryResolver(root, args);

            expect(deleteDebtCategory).toHaveBeenCalledTimes(1);
            expect(deleteDebtCategory).toHaveBeenCalledWith(expectedDebtCategory.userId, expectedDebtCategory.debtCategoryId);
        });

        it('should return the fixedCategoryId', async () => {
            const actualResponse = await deleteDebtCategoryResolver(root, args);

            expect(actualResponse).toEqual(expectedDebtCategory.debtCategoryId);
        });
    });

    describe('getDebtCategoriesResolver', () => {
        let expectedDebtCategories,
            expectedUserId;

        beforeEach(() => {
            expectedDebtCategories = chance.n(createRandomDebtCategory, chance.d6());
            expectedUserId = chance.guid();

            getDebtCategories.mockReturnValue(expectedDebtCategories);
            getPropertyFromArgsOrRoot.mockReturnValue(expectedUserId);
        });

        it('should call getDebtCategories', async () => {
            await getDebtCategoriesResolver(root, args);

            expect(getDebtCategories).toHaveBeenCalledTimes(1);
            expect(getDebtCategories).toHaveBeenCalledWith(expectedUserId);
        });

        it('should return the debt categories', async () => {
            const actualResponse = await getDebtCategoriesResolver(root, args);

            expect(actualResponse).toEqual(expectedDebtCategories);
        });
    });

    describe('getDebtCategoryResolver', () => {
        let expectedDebtCategories,
            expectedUserId,
            expectedDebtCategoryId;

        beforeEach(() => {
            expectedDebtCategories = chance.n(createRandomDebtCategory, chance.d6());
            expectedUserId = chance.guid();
            expectedDebtCategoryId = chance.guid();

            getDebtCategoryByDebtCategoryId.mockReturnValue(expectedDebtCategories);

            getPropertyFromArgsOrRoot
                .mockReturnValueOnce(expectedUserId)
                .mockReturnValueOnce(expectedDebtCategoryId);
        });

        it('should call getDebtCategoriesByTimePeriodId', async () => {
            await getDebtCategoryResolver(root, args);

            expect(getDebtCategoryByDebtCategoryId).toHaveBeenCalledTimes(1);
            expect(getDebtCategoryByDebtCategoryId).toHaveBeenCalledWith(expectedUserId, expectedDebtCategoryId);
        });

        it('should return the debt categories', async () => {
            const actualDebtCategories = await getDebtCategoryResolver(root, args);

            expect(actualDebtCategories).toEqual(expectedDebtCategories);
        });
    });
});
