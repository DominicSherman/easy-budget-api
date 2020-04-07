import {
    deleteDebtCategory,
    getDebtCategories,
    getDebtCategoryByDebtCategoryId,
    insertDebtCategory
} from '../repositories/debt-category-repository';
import {
    CreateDebtCategory,
    DebtCategory,
    MutationCreateDebtCategoryArgs,
    MutationDeleteDebtCategoryArgs,
    MutationUpdateDebtCategoryArgs,
    QueryDebtCategoriesArgs,
    QueryDebtCategoryArgs
} from '../generated/graphql';
import {getPropertyFromArgsOrRoot} from '../helpers/resolver-helpers';

export const createDebtCategoryResolver = async (root: any, args: MutationCreateDebtCategoryArgs): Promise<CreateDebtCategory> => {
    const {debtCategory} = args;

    await insertDebtCategory({
        ...debtCategory,
        amount: 0
    });

    return debtCategory;
};

export const updateDebtCategoryResolver = async (root: any, args: MutationUpdateDebtCategoryArgs): Promise<DebtCategory> => {
    const {debtCategory} = args;

    await insertDebtCategory(debtCategory);

    return getDebtCategoryByDebtCategoryId(debtCategory.userId, debtCategory.debtCategoryId);
};

export const deleteDebtCategoryResolver = async (root: any, args: MutationDeleteDebtCategoryArgs): Promise<string> => {
    const {userId, debtCategoryId} = args;

    await deleteDebtCategory(userId, debtCategoryId);

    return debtCategoryId;
};

export const getDebtCategoriesResolver = (root: any, args: QueryDebtCategoriesArgs): Promise<DebtCategory[]> => {
    const userId = getPropertyFromArgsOrRoot(root, args, 'userId');

    return getDebtCategories(userId);
};

export const getDebtCategoryResolver = (root: any, args: QueryDebtCategoryArgs): Promise<DebtCategory> => {
    const userId = getPropertyFromArgsOrRoot(root, args, 'userId');
    const debtCategoryId = getPropertyFromArgsOrRoot(root, args, 'debtCategoryId');

    return getDebtCategoryByDebtCategoryId(userId, debtCategoryId);
};
