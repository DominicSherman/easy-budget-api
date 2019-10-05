import {setFirestoreData} from '../adapters/firestore-adapter';

export const insertVariableExpense = (userId, variableExpense) =>
    setFirestoreData(userId, 'variableExpenses', variableExpense);