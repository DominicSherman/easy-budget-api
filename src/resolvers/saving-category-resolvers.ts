import {
    deleteSavingCategory,
    getSavingCategories,
    getSavingCategoryBySavingCategoryId,
    insertSavingCategory
} from '../repositories/saving-category-repository';
import {
    CreateSavingCategory,
    MutationCreateSavingCategoryArgs, MutationDeleteSavingCategoryArgs, MutationUpdateSavingCategoryArgs,
    QuerySavingCategoriesArgs, QuerySavingCategoryArgs,
    SavingCategory
} from '../generated/graphql';
import {getPropertyFromArgsOrRoot} from '../helpers/resolver-helpers';

export const createSavingCategoryResolver = async (root: any, args: MutationCreateSavingCategoryArgs): Promise<CreateSavingCategory> => {
    const {savingCategory} = args;

    await insertSavingCategory(savingCategory);

    return savingCategory;
};

export const updateSavingCategoryResolver = async (root: any, args: MutationUpdateSavingCategoryArgs): Promise<SavingCategory> => {
    const {savingCategory} = args;

    await insertSavingCategory(savingCategory);

    return getSavingCategoryBySavingCategoryId(savingCategory.userId, savingCategory.savingCategoryId);
};

export const deleteSavingCategoryResolver = async (root: any, args: MutationDeleteSavingCategoryArgs): Promise<string> => {
    const {userId, savingCategoryId} = args;

    await deleteSavingCategory(userId, savingCategoryId);

    return savingCategoryId;
};

export const getSavingCategoriesResolver = (root: any, args: QuerySavingCategoriesArgs): Promise<SavingCategory[]> => {
    const userId = getPropertyFromArgsOrRoot(root, args, 'userId');

    return getSavingCategories(userId);
};

export const getSavingCategoryResolver = (root: any, args: QuerySavingCategoryArgs): Promise<SavingCategory> => {
    const userId = getPropertyFromArgsOrRoot(root, args, 'userId');
    const savingCategoryId = getPropertyFromArgsOrRoot(root, args, 'savingCategoryId');

    return getSavingCategoryBySavingCategoryId(userId, savingCategoryId);
};
