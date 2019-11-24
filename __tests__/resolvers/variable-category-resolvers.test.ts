import {chance} from '../chance';
import {createRandomVariableCategory} from '../model-factory';
import * as variableCategoryRepository from '../../src/repositories/variable-category-repository';
import {
    createVariableCategoryResolver,
    getVariableCategoryResolver
} from '../../src/resolvers/variable-category-resolvers';

jest.mock('../../src/repositories/variable-category-repository');

describe('variable category resolvers', () => {
    const {getVariableCategories, insertVariableCategory} = variableCategoryRepository as jest.Mocked<typeof variableCategoryRepository>;

    let root,
        args;

    beforeEach(() => {
        root = {
            [chance.string()]: chance.string()
        };
        args = {
            [chance.string()]: chance.string(),
            userId: chance.string()
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
            expect(insertVariableCategory).toHaveBeenCalledWith(
                expectedCreateVariableCategory.userId,
                expectedCreateVariableCategory
            );
        });

        it('should return the input', async () => {
            const actualResponse = await createVariableCategoryResolver(root, args);

            expect(actualResponse).toEqual(expectedCreateVariableCategory);
        });
    });

    describe('getVariableCategoryResolver', () => {
        let expectedVariableCategories;

        beforeEach(() => {
            expectedVariableCategories = chance.n(createRandomVariableCategory, chance.d6());

            getVariableCategories.mockReturnValue(expectedVariableCategories);
        });

        it('should call insertVariableCategory', async () => {
            await getVariableCategoryResolver(root, args);

            expect(getVariableCategories).toHaveBeenCalledTimes(1);
            expect(getVariableCategories).toHaveBeenCalledWith(args.userId);
        });

        it('should return the variable categories', async () => {
            const actualResponse = await getVariableCategoryResolver(root, args);

            expect(actualResponse).toEqual(expectedVariableCategories);
        });
    });
});
