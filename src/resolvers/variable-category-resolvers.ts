import {
    deleteVariableCategory,
    getVariableCategories,
    getVariableCategoriesByTimePeriodId, getVariableCategoryByVariableCategoryId,
    insertVariableCategory
} from '../repositories/variable-category-repository';
import {
    CreateVariableCategory,
    MutationCreateVariableCategoryArgs, MutationDeleteVariableCategoryArgs, MutationUpdateVariableCategoryArgs,
    QueryVariableCategoriesArgs, QueryVariableCategoryArgs,
    VariableCategory
} from '../generated/graphql';
import {getPropertyFromArgsOrRoot} from '../helpers/resolver-helpers';

export const createVariableCategoryResolver = async (root: any, args: MutationCreateVariableCategoryArgs): Promise<CreateVariableCategory> => {
    const {variableCategory} = args;

    await insertVariableCategory(variableCategory);

    return variableCategory;
};

export const updateVariableCategoryResolver = async (root: any, args: MutationUpdateVariableCategoryArgs): Promise<VariableCategory> => {
    const {variableCategory} = args;

    await insertVariableCategory(variableCategory);

    return getVariableCategoryByVariableCategoryId(variableCategory.userId, variableCategory.variableCategoryId);
};

export const deleteVariableCategoryResolver = async (root: any, args: MutationDeleteVariableCategoryArgs): Promise<string> => {
    const {userId, variableCategoryId} = args;

    await deleteVariableCategory(userId, variableCategoryId);

    return variableCategoryId;
};

export const getVariableCategoriesResolver = (root: any, args: QueryVariableCategoriesArgs): Promise<VariableCategory[]> => {
    const userId = getPropertyFromArgsOrRoot(root, args, 'userId');
    const timePeriodId = getPropertyFromArgsOrRoot(root, args, 'timePeriodId');

    if (timePeriodId) {
        return getVariableCategoriesByTimePeriodId(userId, timePeriodId);
    }

    return getVariableCategories(userId);
};

export const getVariableCategoryResolver = (root: any, args: QueryVariableCategoryArgs): Promise<VariableCategory> => {
    const userId = getPropertyFromArgsOrRoot(root, args, 'userId');
    const variableCategoryId = getPropertyFromArgsOrRoot(root, args, 'variableCategoryId');

    return getVariableCategoryByVariableCategoryId(userId, variableCategoryId);
};
