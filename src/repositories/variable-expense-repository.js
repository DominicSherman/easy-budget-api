import {getFirestoreData, setFirestoreData} from '../adapters/firestore-adapter';

export const insertVariableExpense = (userId, variableExpense) =>
    setFirestoreData('users', userId, 'variableExpenses', variableExpense.variableExpenseId, variableExpense);

export const getVariableExpenses = async (userId) => {
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
