import {CreateExpense, Expense, MutationCreateExpenseArgs, QueryExpensesArgs} from '../generated/graphql';
import {getPropertyFromArgsOrRoot} from '../helpers/resolver-helpers';
import {
    getExpenses,
    getExpensesByTimePeriodId,
    getExpensesByVariableCategoryId,
    insertExpense
} from '../repositories/expense-repository';

export const createExpenseResolver = async (root: any, args: MutationCreateExpenseArgs): Promise<CreateExpense> => {
    const {expense} = args;

    await insertExpense(expense);

    return expense;
};

export const getExpensesResolver = (root: any, args: QueryExpensesArgs): Promise<Expense[]> => {
    const userId = getPropertyFromArgsOrRoot(root, args, 'userId');
    const variableCategoryId = getPropertyFromArgsOrRoot(root, args, 'variableCategoryId');
    const timePeriodId = getPropertyFromArgsOrRoot(root, args, 'timePeriodId');

    if (variableCategoryId) {
        return getExpensesByVariableCategoryId(userId, variableCategoryId);
    }

    if (timePeriodId) {
        return getExpensesByTimePeriodId(userId, timePeriodId);
    }

    return getExpenses(userId);
};
