import {getVariableCategories, insertVariableCategory} from '../repositories/variable-category-repository';
import {
    CreateVariableCategory,
    MutationCreateVariableCategoryArgs,
    QueryVariableCategoriesArgs,
    VariableCategory
} from '../generated/graphql';

export const createVariableCategoryResolver = async (root: any, args: MutationCreateVariableCategoryArgs): Promise<CreateVariableCategory> => {
    const {variableCategory} = args;

    await insertVariableCategory(variableCategory);

    return variableCategory;
};

export const getVariableCategoryResolver = (root: any, args: QueryVariableCategoriesArgs): Promise<VariableCategory[]> =>
    getVariableCategories(args.userId);
