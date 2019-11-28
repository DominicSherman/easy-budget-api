import {chance} from '../chance';
import {createRandomVariableCategory} from '../model-factory';
import * as variableCategoryRepository from '../../src/repositories/variable-category-repository';
import {
    createVariableCategoryResolver, deleteVariableCategoryResolver,
    getVariableCategoriesResolver, updateVariableCategoryResolver
} from '../../src/resolvers/variable-category-resolvers';
import * as resolverHelpers from '../../src/helpers/resolver-helpers';

jest.mock('../../src/repositories/variable-category-repository');
jest.mock('../../src/helpers/resolver-helpers');

describe('variable category resolvers', () => {
    const {
        getVariableCategoriesByTimePeriodId,
        getVariableCategories,
        insertVariableCategory,
        getVariableCategoryByVariableCategoryId,
        deleteVariableCategory
    } = variableCategoryRepository as jest.Mocked<typeof variableCategoryRepository>;
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

    describe('createVariableCategoryResolver', () => {
        let expectedCreateVariableCategory;

        beforeEach(() => {
            expectedCreateVariableCategory = createRandomVariableCategory();

            args = {
                variableCategory: expectedCreateVariableCategory
            };
        });

        it('should call insertVariableCategory', async () => {
            await createVariableCategoryResolver(root, args);

            expect(insertVariableCategory).toHaveBeenCalledTimes(1);
            expect(insertVariableCategory).toHaveBeenCalledWith(expectedCreateVariableCategory);
        });

        it('should return the input', async () => {
            const actualResponse = await createVariableCategoryResolver(root, args);

            expect(actualResponse).toEqual(expectedCreateVariableCategory);
        });
    });

    describe('updateVariableCategoryResolver', () => {
        let expectedUpdateVariableCategory;

        beforeEach(() => {
            expectedUpdateVariableCategory = createRandomVariableCategory();

            args = {
                variableCategory: expectedUpdateVariableCategory
            };

            getVariableCategoryByVariableCategoryId.mockReturnValue(expectedUpdateVariableCategory);
        });

        it('should call insertVariableCategory', async () => {
            await updateVariableCategoryResolver(root, args);

            expect(insertVariableCategory).toHaveBeenCalledTimes(1);
            expect(insertVariableCategory).toHaveBeenCalledWith(expectedUpdateVariableCategory);
        });

        it('should return the input', async () => {
            const actualResponse = await updateVariableCategoryResolver(root, args);

            expect(actualResponse).toEqual(expectedUpdateVariableCategory);
        });
    });

    describe('deleteVariableCategoryResolver', () => {
        let expectedVariableCategory;

        beforeEach(() => {
            expectedVariableCategory = createRandomVariableCategory();

            args = {
                userId: expectedVariableCategory.userId,
                variableCategoryId: expectedVariableCategory.variableCategoryId
            };
        });

        it('should call deleteVariableCategory', async () => {
            await deleteVariableCategoryResolver(root, args);

            expect(deleteVariableCategory).toHaveBeenCalledTimes(1);
            expect(deleteVariableCategory).toHaveBeenCalledWith(expectedVariableCategory.userId, expectedVariableCategory.variableCategoryId);
        });

        it('should return the fixedCategoryId', async () => {
            const actualResponse = await deleteVariableCategoryResolver(root, args);

            expect(actualResponse).toEqual(expectedVariableCategory.variableCategoryId);
        });
    });

    describe('getVariableCategoryResolver', () => {
        let expectedVariableCategories,
            expectedUserId,
            expectedTimePeriodId;

        beforeEach(() => {
            expectedVariableCategories = chance.n(createRandomVariableCategory, chance.d6());
            expectedUserId = chance.guid();
            expectedTimePeriodId = chance.guid();

            getVariableCategories.mockReturnValue(expectedVariableCategories);
            getVariableCategoriesByTimePeriodId.mockReturnValue(expectedVariableCategories);
        });

        describe('when there is no timePeriodId', () => {
            beforeEach(() => {
                getPropertyFromArgsOrRoot
                    .mockReturnValueOnce(expectedUserId)
                    .mockReturnValueOnce(null);
            });

            it('should call getVariableCategories', async () => {
                await getVariableCategoriesResolver(root, args);

                expect(getVariableCategories).toHaveBeenCalledTimes(1);
                expect(getVariableCategories).toHaveBeenCalledWith(expectedUserId);
            });

            it('should return the variable categories', async () => {
                const actualResponse = await getVariableCategoriesResolver(root, args);

                expect(actualResponse).toEqual(expectedVariableCategories);
            });
        });

        describe('when there is a timePeriodId', () => {
            beforeEach(() => {
                getPropertyFromArgsOrRoot
                    .mockReturnValueOnce(expectedUserId)
                    .mockReturnValueOnce(expectedTimePeriodId);
            });

            it('should call getVariableCategoriesByTimePeriodId', async () => {
                await getVariableCategoriesResolver(root, args);

                expect(getVariableCategoriesByTimePeriodId).toHaveBeenCalledTimes(1);
                expect(getVariableCategoriesByTimePeriodId).toHaveBeenCalledWith(expectedUserId, expectedTimePeriodId);
            });

            it('should return the variable categories', async () => {
                const actualVariableCategories = await getVariableCategoriesResolver(root, args);

                expect(actualVariableCategories).toEqual(expectedVariableCategories);
            });
        });
    });
});
