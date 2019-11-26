import {CreateExpense, Expense} from '../generated/graphql';
import {getFirestoreData, IWhereObject, setFirestoreData} from '../adapters/firestore-adapter';
import {getDataFromQuerySnapshot} from '../helpers/repository-helpers';

const COLLECTION_NAME = 'expenses';

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

export const insertExpense = (expenseInput: CreateExpense): Promise<FirebaseFirestore.WriteResult> =>
    setFirestoreData(expenseInput.userId, COLLECTION_NAME, expenseInput.expenseId, expenseInput);
