import {getFirestoreData, setFirestoreData} from '../adapters/firestore-adapter';
import * as functions from 'firebase-functions';

export const insertVariableExpense = (userId, variableExpense) =>
    setFirestoreData('users', userId, 'variableExpenses', variableExpense.variableExpenseId, variableExpense);

export const getVariableExpenses = async (userId) => {
    console.log('functions.config()', functions.config().firebase);
    let variableExpenses = [];

    const querySnapshot = await getFirestoreData(userId, 'variableExpenses');

    querySnapshot.forEach((doc) => {
        variableExpenses = [
            ...variableExpenses,
            doc.data()
        ]
    });

    return variableExpenses;
};
