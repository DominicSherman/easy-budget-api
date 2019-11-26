import {chance} from '../chance';
import {createRandomVariableCategory} from '../model-factory';
import * as variableCategoryRepository from '../../src/repositories/variable-category-repository';
import {
    createVariableCategoryResolver,
    getVariableCategoriesResolver
} from '../../src/resolvers/variable-category-resolvers';
import * as resolverHelpers from '../../src/helpers/resolver-helpers';

jest.mock('../../src/repositories/variable-category-repository');
jest.mock('../../src/helpers/resolver-helpers');

describe('variable category resolvers', () => {
    const {getVariableCategoriesByTimePeriodId, getVariableCategories, insertVariableCategory} = variableCategoryRepository as jest.Mocked<typeof variableCategoryRepository>;
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
