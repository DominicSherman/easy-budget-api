import {getVariableCategories, insertVariableCategory} from '../repositories/variable-category-repository';

export const createVariableCategoryResolver = async (root, args) => {
    const {variableCategory} = args;

    await insertVariableCategory(variableCategory.userId, variableCategory);

    return variableCategory;
};

export const getVariableCategoryResolver = async (root, args) => getVariableCategories(args.userId);
