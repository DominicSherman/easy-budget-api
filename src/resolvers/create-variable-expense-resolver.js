import {insertVariableExpense} from '../repositories/variable-expense-repository';

const userId = '00bc5823-6f99-4f59-b1b3-8a9a8422d940';

export default async (root, args) => {
    const variableExpense = {
        amount: 400,
        name: 'Food',
        spent: 0
    };

    const response = await insertVariableExpense(userId, variableExpense);

    console.log('response', response);

    return variableExpense;
};