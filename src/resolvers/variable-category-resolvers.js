import {getVariableCategories, insertVariableCategory} from '../repositories/variable-category-repository';

export const createVariableCategoryResolver = async (root, args) => {
    const {userId, variableCategory} = args;

    await insertVariableCategory(userId, variableCategory);

    return variableCategory;
};

export const getVariableCategoryResolver = async (root, args) => getVariableCategories(args.userId);
