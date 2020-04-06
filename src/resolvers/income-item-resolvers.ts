import {
    CreateIncomeItem,
    IncomeItem,
    MutationCreateIncomeItemArgs,
    MutationDeleteIncomeItemArgs,
    MutationUpdateIncomeItemArgs,
    QueryIncomeItemArgs,
    QueryIncomeItemsArgs
} from '../generated/graphql';
import {getPropertyFromArgsOrRoot} from '../helpers/resolver-helpers';
import {
    deleteIncomeItem,
    getIncomeItemByIncomeItemId,
    getIncomeItems,
    getIncomeItemsByTimePeriodId,
    insertIncomeItem
} from '../repositories/income-item-repository';

export const createIncomeItemResolver = async (root: any, args: MutationCreateIncomeItemArgs): Promise<CreateIncomeItem> => {
    const {incomeItem} = args;

    await insertIncomeItem(incomeItem);

    return incomeItem;
};

export const updateIncomeItemResolver = async (root: any, args: MutationUpdateIncomeItemArgs): Promise<IncomeItem> => {
    const {incomeItem} = args;

    await insertIncomeItem(incomeItem);

    return getIncomeItemByIncomeItemId(incomeItem.userId, incomeItem.incomeItemId);
};

export const deleteIncomeItemResolver = async (root: any, args: MutationDeleteIncomeItemArgs): Promise<string> => {
    const {userId, incomeItemId} = args;

    await deleteIncomeItem(userId, incomeItemId);

    return incomeItemId;
};

export const getIncomeItemsResolver = (root: any, args: QueryIncomeItemsArgs): Promise<IncomeItem[]> => {
    const userId = getPropertyFromArgsOrRoot(root, args, 'userId');
    const timePeriodId = getPropertyFromArgsOrRoot(root, args, 'timePeriodId');

    if (timePeriodId) {
        return getIncomeItemsByTimePeriodId(userId, timePeriodId);
    }

    return getIncomeItems(userId);
};

export const getIncomeItemResolver = (root, args: QueryIncomeItemArgs): Promise<IncomeItem> => {
    const userId = getPropertyFromArgsOrRoot(root, args, 'userId');
    const incomeItemId = getPropertyFromArgsOrRoot(root, args, 'incomeItemId');

    return getIncomeItemByIncomeItemId(userId, incomeItemId);
};
