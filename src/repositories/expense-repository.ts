import {CreateExpense, Expense, UpdateExpense} from '../generated/graphql';
import {deleteFirestoreData, getFirestoreData, IWhereObject, setFirestoreData} from '../adapters/firestore-adapter';
import {getDataFromQuerySnapshot} from '../helpers/repository-helpers';

const COLLECTION_NAME = 'expenses';

export const insertExpense = (expenseInput: CreateExpense | UpdateExpense): Promise<FirebaseFirestore.WriteResult> =>
    setFirestoreData(expenseInput.userId, COLLECTION_NAME, expenseInput.expenseId, expenseInput);

export const deleteExpense = (userId: string, expenseId: string): Promise<FirebaseFirestore.WriteResult> =>
    deleteFirestoreData(userId, COLLECTION_NAME, expenseId);

export const getExpenses = async (userId: string, where?: IWhereObject): Promise<Expense[]> => {
    const querySnapshot = await getFirestoreData(userId, COLLECTION_NAME, where);

    return getDataFromQuerySnapshot(querySnapshot);
};

export const getExpensesByVariableCategoryId = (userId: string, variableCategoryId: string): Promise<Expense[]> => {
    const where: IWhereObject = {
        field: 'variableCategoryId',
        operator: '==',
        value: variableCategoryId
    };

    return getExpenses(userId, where);
};

export const getExpensesByTimePeriodId = (userId: string, timePeriodId: string): Promise<Expense[]> => {
    const where: IWhereObject = {
        field: 'timePeriodId',
        operator: '==',
        value: timePeriodId
    };

    return getExpenses(userId, where);
};

export const getExpenseByExpenseId = async (userId: string, expenseId: string): Promise<Expense> => {
    const where: IWhereObject = {
        field: 'expenseId',
        operator: '==',
        value: expenseId
    };
    const expenses = await getExpenses(userId, where);

    return expenses[0];
};
