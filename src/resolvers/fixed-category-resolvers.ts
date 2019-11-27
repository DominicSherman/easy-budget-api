import {
    getFixedCategories,
    getFixedCategoriesByTimePeriodId,
    insertFixedCategory
} from '../repositories/fixed-category-repository';
import {getPropertyFromArgsOrRoot} from '../helpers/resolver-helpers';
import {
    CreateFixedCategory,
    FixedCategory,
    MutationCreateFixedCategoryArgs,
    QueryFixedCategoriesArgs
} from '../generated/graphql';

export const createFixedCategoryResolver = async (root: any, args: MutationCreateFixedCategoryArgs): Promise<CreateFixedCategory> => {
    const {fixedCategory} = args;

    await insertFixedCategory(fixedCategory);

    return fixedCategory;
};

export const getFixedCategoriesResolver = (root: any, args: QueryFixedCategoriesArgs): Promise<FixedCategory[]> => {
    const userId = getPropertyFromArgsOrRoot(root, args, 'userId');
    const timePeriodId = getPropertyFromArgsOrRoot(root, args, 'timePeriodId');

    if (timePeriodId) {
        return getFixedCategoriesByTimePeriodId(userId, timePeriodId);
    }

    return getFixedCategories(userId);
};
