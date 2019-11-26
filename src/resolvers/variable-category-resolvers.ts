import {
    getVariableCategories,
    getVariableCategoriesByTimePeriodId,
    insertVariableCategory
} from '../repositories/variable-category-repository';
import {
    CreateVariableCategory,
    MutationCreateVariableCategoryArgs,
    QueryVariableCategoriesArgs,
    VariableCategory
} from '../generated/graphql';
import {getPropertyFromArgsOrRoot} from '../helpers/resolver-helpers';

export const createVariableCategoryResolver = async (root: any, args: MutationCreateVariableCategoryArgs): Promise<CreateVariableCategory> => {
    const {variableCategory} = args;

    await insertVariableCategory(variableCategory);

    return variableCategory;
};

export const getVariableCategoryResolver = (root: any, args: QueryVariableCategoriesArgs): Promise<VariableCategory[]> => {
    const userId = getPropertyFromArgsOrRoot(root, args, 'userId');
    const timePeriodId = getPropertyFromArgsOrRoot(root, args, 'timePeriodId');

    if (timePeriodId) {
        return getVariableCategoriesByTimePeriodId(userId, timePeriodId);
    }

    return getVariableCategories(userId);
};
