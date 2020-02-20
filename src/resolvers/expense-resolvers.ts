import {
    CreateExpense,
    Expense,
    MutationCreateExpenseArgs,
    MutationDeleteExpenseArgs,
    MutationUpdateExpenseArgs,
    QueryExpenseArgs,
    QueryExpensesArgs
} from '../generated/graphql';
import {getPropertyFromArgsOrRoot} from '../helpers/resolver-helpers';
import {
    deleteExpense,
    getExpenseByExpenseId,
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

export const updateExpenseResolver = async (root: any, args: MutationUpdateExpenseArgs): Promise<Expense> => {
    const {expense} = args;

    await insertExpense(expense);

    return getExpenseByExpenseId(expense.userId, expense.expenseId);
};

export const deleteExpenseResolver = async (root: any, args: MutationDeleteExpenseArgs): Promise<string> => {
    const {userId, expenseId} = args;

    await deleteExpense(userId, expenseId);

    return expenseId;
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

export const getExpenseResolver = (root, args: QueryExpenseArgs): Promise<Expense> => {
    const userId = getPropertyFromArgsOrRoot(root, args, 'userId');
    const expenseId = getPropertyFromArgsOrRoot(root, args, 'expenseId');

    return getExpenseByExpenseId(userId, expenseId);
};
