import {getFirestoreData, setFirestoreData} from '../adapters/firestore-adapter';

export const insertVariableCategory = (userId, variableCategory) =>
    setFirestoreData(userId, 'variableCategories', variableCategory.variableCategoryId, variableCategory);

export const getVariableCategories = async (userId) => {
    let variableExpenses = [];

    const querySnapshot = await getFirestoreData(userId, 'variableCategories');

    querySnapshot.forEach((doc) => {
        variableExpenses = [
            ...variableExpenses,
            doc.data()
        ]
    });

    return variableExpenses;
};
