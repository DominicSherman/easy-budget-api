import {chance} from '../chance';
import {createRandomFixedCategory} from '../model-factory';
import * as fixedCategoryRepository from '../../src/repositories/fixed-category-repository';
import {
    createFixedCategoryResolver, deleteFixedCategoryResolver,
    getFixedCategoriesResolver, getFixedCategoryResolver, updateFixedCategoryResolver
} from '../../src/resolvers/fixed-category-resolvers';
import * as resolverHelpers from '../../src/helpers/resolver-helpers';

jest.mock('../../src/repositories/fixed-category-repository');
jest.mock('../../src/helpers/resolver-helpers');

describe('fixed category resolvers', () => {
    const {
        getFixedCategoriesByTimePeriodId,
        getFixedCategories,
        insertFixedCategory,
        deleteFixedCategory,
        getFixedCategoryByFixedCategoryId
    } = fixedCategoryRepository as jest.Mocked<typeof fixedCategoryRepository>;
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

    describe('createFixedCategoryResolver', () => {
        let expectedCreateFixedCategory;

        beforeEach(() => {
            expectedCreateFixedCategory = createRandomFixedCategory();

            args = {
                fixedCategory: expectedCreateFixedCategory
            };
        });

        it('should call insertFixedCategory', async () => {
            await createFixedCategoryResolver(root, args);

            expect(insertFixedCategory).toHaveBeenCalledTimes(1);
            expect(insertFixedCategory).toHaveBeenCalledWith(expectedCreateFixedCategory);
        });

        it('should return the input', async () => {
            const actualResponse = await createFixedCategoryResolver(root, args);

            expect(actualResponse).toEqual(expectedCreateFixedCategory);
        });
    });

    describe('updateFixedCategoryResolver', () => {
        let expectedUpdateFixedCategory;

        beforeEach(() => {
            expectedUpdateFixedCategory = createRandomFixedCategory();

            args = {
                fixedCategory: expectedUpdateFixedCategory
            };

            getFixedCategoryByFixedCategoryId.mockReturnValue(expectedUpdateFixedCategory);
        });

        it('should call insertFixedCategory', async () => {
            await updateFixedCategoryResolver(root, args);

            expect(insertFixedCategory).toHaveBeenCalledTimes(1);
            expect(insertFixedCategory).toHaveBeenCalledWith(expectedUpdateFixedCategory);
        });

        it('should return the input', async () => {
            const actualResponse = await updateFixedCategoryResolver(root, args);

            expect(actualResponse).toEqual(expectedUpdateFixedCategory);
        });
    });

    describe('deleteFixedCategoryResolver', () => {
        let expectedFixedCategory;

        beforeEach(() => {
            expectedFixedCategory = createRandomFixedCategory();

            args = {
                fixedCategoryId: expectedFixedCategory.fixedCategoryId,
                userId: expectedFixedCategory.userId
            };
        });

        it('should call insertFixedCategory', async () => {
            await deleteFixedCategoryResolver(root, args);

            expect(deleteFixedCategory).toHaveBeenCalledTimes(1);
            expect(deleteFixedCategory).toHaveBeenCalledWith(expectedFixedCategory.userId, expectedFixedCategory.fixedCategoryId);
        });

        it('should return the fixedCategory', async () => {
            const actualResponse = await deleteFixedCategoryResolver(root, args);

            expect(actualResponse).toEqual(expectedFixedCategory.fixedCategoryId);
        });
    });

    describe('getFixedCategoriesResolver', () => {
        let expectedFixedCategories,
            expectedUserId,
            expectedTimePeriodId;

        beforeEach(() => {
            expectedFixedCategories = chance.n(createRandomFixedCategory, chance.d6());
            expectedUserId = chance.guid();
            expectedTimePeriodId = chance.guid();

            getFixedCategories.mockReturnValue(expectedFixedCategories);
            getFixedCategoriesByTimePeriodId.mockReturnValue(expectedFixedCategories);
        });

        describe('when there is no timePeriodId', () => {
            beforeEach(() => {
                getPropertyFromArgsOrRoot
                    .mockReturnValueOnce(expectedUserId)
                    .mockReturnValueOnce(null);
            });

            it('should call getFixedCategories', async () => {
                await getFixedCategoriesResolver(root, args);

                expect(getFixedCategories).toHaveBeenCalledTimes(1);
                expect(getFixedCategories).toHaveBeenCalledWith(expectedUserId);
            });

            it('should return the fixed categories', async () => {
                const actualResponse = await getFixedCategoriesResolver(root, args);

                expect(actualResponse).toEqual(expectedFixedCategories);
            });
        });

        describe('when there is a timePeriodId', () => {
            beforeEach(() => {
                getPropertyFromArgsOrRoot
                    .mockReturnValueOnce(expectedUserId)
                    .mockReturnValueOnce(expectedTimePeriodId);
            });

            it('should call getFixedCategoriesByTimePeriodId', async () => {
                await getFixedCategoriesResolver(root, args);

                expect(getFixedCategoriesByTimePeriodId).toHaveBeenCalledTimes(1);
                expect(getFixedCategoriesByTimePeriodId).toHaveBeenCalledWith(expectedUserId, expectedTimePeriodId);
            });

            it('should return the fixed categories', async () => {
                const actualFixedCategories = await getFixedCategoriesResolver(root, args);

                expect(actualFixedCategories).toEqual(expectedFixedCategories);
            });
        });
    });

    describe('getFixedCategoryResolver', () => {
        let expectedFixedCategories,
            expectedUserId,
            expectedFixedCategoryId;

        beforeEach(() => {
            expectedFixedCategories = chance.n(createRandomFixedCategory, chance.d6());
            expectedUserId = chance.guid();
            expectedFixedCategoryId = chance.guid();

            getFixedCategoryByFixedCategoryId.mockReturnValue(expectedFixedCategories);

            getPropertyFromArgsOrRoot
                .mockReturnValueOnce(expectedUserId)
                .mockReturnValueOnce(expectedFixedCategoryId);
        });

        it('should call getFixedCategoryByFixedCategoryId', () => {
            const actualValue = getFixedCategoryResolver(root, args);

            expect(getPropertyFromArgsOrRoot).toHaveBeenCalledTimes(2);
            expect(getPropertyFromArgsOrRoot).toHaveBeenCalledWith(root, args, 'userId');
            expect(getPropertyFromArgsOrRoot).toHaveBeenCalledWith(root, args, 'fixedCategoryId');
            expect(getFixedCategoryByFixedCategoryId).toHaveBeenCalledTimes(1);
            expect(getFixedCategoryByFixedCategoryId).toHaveBeenCalledWith(expectedUserId, expectedFixedCategoryId);
            expect(actualValue).toEqual(expectedFixedCategories);
        });
    });
});
