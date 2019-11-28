import {
    deleteFixedCategory,
    getFixedCategories,
    getFixedCategoriesByTimePeriodId, getFixedCategoryByFixedCategoryId,
    insertFixedCategory
} from '../repositories/fixed-category-repository';
import {getPropertyFromArgsOrRoot} from '../helpers/resolver-helpers';
import {
    CreateFixedCategory,
    FixedCategory,
    MutationCreateFixedCategoryArgs, MutationDeleteFixedCategoryArgs, MutationUpdateFixedCategoryArgs,
    QueryFixedCategoriesArgs
} from '../generated/graphql';

export const createFixedCategoryResolver = async (root: any, args: MutationCreateFixedCategoryArgs): Promise<CreateFixedCategory> => {
    const {fixedCategory} = args;

    await insertFixedCategory(fixedCategory);

    return fixedCategory;
};

export const updateFixedCategoryResolver = async (root: any, args: MutationUpdateFixedCategoryArgs): Promise<FixedCategory> => {
    const {fixedCategory} = args;

    await insertFixedCategory(fixedCategory);

    return getFixedCategoryByFixedCategoryId(fixedCategory.userId, fixedCategory.fixedCategoryId);
};

export const deleteFixedCategoryResolver = async (root: any, args: MutationDeleteFixedCategoryArgs): Promise<string> => {
    const {userId, fixedCategoryId} = args;

    await deleteFixedCategory(userId, fixedCategoryId);

    return fixedCategoryId;
};

export const getFixedCategoriesResolver = (root: any, args: QueryFixedCategoriesArgs): Promise<FixedCategory[]> => {
    const userId = getPropertyFromArgsOrRoot(root, args, 'userId');
    const timePeriodId = getPropertyFromArgsOrRoot(root, args, 'timePeriodId');

    if (timePeriodId) {
        return getFixedCategoriesByTimePeriodId(userId, timePeriodId);
    }

    return getFixedCategories(userId);
};
