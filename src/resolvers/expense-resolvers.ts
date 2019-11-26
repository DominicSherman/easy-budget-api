import {CreateExpense, Expense, MutationCreateExpenseArgs, QueryExpensesArgs} from '../generated/graphql';
import {getPropertyFromArgsOrRoot} from '../helpers/resolver-helpers';
import {getExpenses, getExpensesByVariableCategoryId, insertExpense} from '../repositories/expense-repository';

export const createExpenseResolver = async (root: any, args: MutationCreateExpenseArgs): Promise<CreateExpense> => {
    const {expense} = args;

    await insertExpense(expense);

    return expense;
};

export const getExpensesResolver = (root: any, args: QueryExpensesArgs): Promise<Expense[]> => {
    const userId = getPropertyFromArgsOrRoot(root, args, 'userId');
    const variableCategoryId = getPropertyFromArgsOrRoot(root, args, 'variableCategoryId');

    if (variableCategoryId) {
        return getExpensesByVariableCategoryId(userId, variableCategoryId);
    }

    return getExpenses(userId);
};
