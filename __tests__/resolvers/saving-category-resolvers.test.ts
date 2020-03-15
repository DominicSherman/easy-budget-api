import {chance} from '../chance';
import {createRandomSavingCategory} from '../model-factory';
import * as savingCategoryRepository from '../../src/repositories/saving-category-repository';
import {
    createSavingCategoryResolver,
    deleteSavingCategoryResolver,
    getSavingCategoriesResolver,
    getSavingCategoryResolver,
    updateSavingCategoryResolver
} from '../../src/resolvers/saving-category-resolvers';
import * as resolverHelpers from '../../src/helpers/resolver-helpers';

jest.mock('../../src/repositories/saving-category-repository');
jest.mock('../../src/helpers/resolver-helpers');

describe('saving category resolvers', () => {
    const {
        getSavingCategories,
        insertSavingCategory,
        getSavingCategoryBySavingCategoryId,
        deleteSavingCategory
    } = savingCategoryRepository as jest.Mocked<typeof savingCategoryRepository>;
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

    describe('createSavingCategoryResolver', () => {
        let expectedCreateSavingCategory;

        beforeEach(() => {
            expectedCreateSavingCategory = createRandomSavingCategory();

            args = {
                savingCategory: expectedCreateSavingCategory
            };
        });

        it('should call insertSavingCategory', async () => {
            await createSavingCategoryResolver(root, args);

            expect(insertSavingCategory).toHaveBeenCalledTimes(1);
            expect(insertSavingCategory).toHaveBeenCalledWith({
                ...expectedCreateSavingCategory,
                amount: 0
            });
        });

        it('should return the input', async () => {
            const actualResponse = await createSavingCategoryResolver(root, args);

            expect(actualResponse).toEqual(expectedCreateSavingCategory);
        });
    });

    describe('updateSavingCategoryResolver', () => {
        let expectedUpdateSavingCategory;

        beforeEach(() => {
            expectedUpdateSavingCategory = createRandomSavingCategory();

            args = {
                savingCategory: expectedUpdateSavingCategory
            };

            getSavingCategoryBySavingCategoryId.mockReturnValue(expectedUpdateSavingCategory);
        });

        it('should call insertSavingCategory', async () => {
            await updateSavingCategoryResolver(root, args);

            expect(insertSavingCategory).toHaveBeenCalledTimes(1);
            expect(insertSavingCategory).toHaveBeenCalledWith(expectedUpdateSavingCategory);
        });

        it('should return the input', async () => {
            const actualResponse = await updateSavingCategoryResolver(root, args);

            expect(actualResponse).toEqual(expectedUpdateSavingCategory);
        });
    });

    describe('deleteSavingCategoryResolver', () => {
        let expectedSavingCategory;

        beforeEach(() => {
            expectedSavingCategory = createRandomSavingCategory();

            args = {
                savingCategoryId: expectedSavingCategory.savingCategoryId,
                userId: expectedSavingCategory.userId
            };
        });

        it('should call deleteSavingCategory', async () => {
            await deleteSavingCategoryResolver(root, args);

            expect(deleteSavingCategory).toHaveBeenCalledTimes(1);
            expect(deleteSavingCategory).toHaveBeenCalledWith(expectedSavingCategory.userId, expectedSavingCategory.savingCategoryId);
        });

        it('should return the fixedCategoryId', async () => {
            const actualResponse = await deleteSavingCategoryResolver(root, args);

            expect(actualResponse).toEqual(expectedSavingCategory.savingCategoryId);
        });
    });

    describe('getSavingCategoriesResolver', () => {
        let expectedSavingCategories,
            expectedUserId;

        beforeEach(() => {
            expectedSavingCategories = chance.n(createRandomSavingCategory, chance.d6());
            expectedUserId = chance.guid();

            getSavingCategories.mockReturnValue(expectedSavingCategories);
            getPropertyFromArgsOrRoot.mockReturnValue(expectedUserId);
        });

        it('should call getSavingCategories', async () => {
            await getSavingCategoriesResolver(root, args);

            expect(getSavingCategories).toHaveBeenCalledTimes(1);
            expect(getSavingCategories).toHaveBeenCalledWith(expectedUserId);
        });

        it('should return the saving categories', async () => {
            const actualResponse = await getSavingCategoriesResolver(root, args);

            expect(actualResponse).toEqual(expectedSavingCategories);
        });
    });

    describe('getSavingCategoryResolver', () => {
        let expectedSavingCategories,
            expectedUserId,
            expectedSavingCategoryId;

        beforeEach(() => {
            expectedSavingCategories = chance.n(createRandomSavingCategory, chance.d6());
            expectedUserId = chance.guid();
            expectedSavingCategoryId = chance.guid();

            getSavingCategoryBySavingCategoryId.mockReturnValue(expectedSavingCategories);

            getPropertyFromArgsOrRoot
                .mockReturnValueOnce(expectedUserId)
                .mockReturnValueOnce(expectedSavingCategoryId);
        });

        it('should call getSavingCategoriesByTimePeriodId', async () => {
            await getSavingCategoryResolver(root, args);

            expect(getSavingCategoryBySavingCategoryId).toHaveBeenCalledTimes(1);
            expect(getSavingCategoryBySavingCategoryId).toHaveBeenCalledWith(expectedUserId, expectedSavingCategoryId);
        });

        it('should return the saving categories', async () => {
            const actualSavingCategories = await getSavingCategoryResolver(root, args);

            expect(actualSavingCategories).toEqual(expectedSavingCategories);
        });
    });
});
