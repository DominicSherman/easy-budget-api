import moment from 'moment';
import {getVariableExpenses, insertVariableExpense} from '../repositories/variable-expense-repository';

const userId = '00bc5823-6f99-4f59-b1b3-8a9a8422d940';
const variableExpenseId = '9e525ff1-339b-4336-a9c1-b817fd7a9edb';

export const createVariableExpenseResolver = async (root, args) => {
    const variableExpense = {
        amount: 400,
        name: 'Food',
        variableExpenseId
    };

    await insertVariableExpense(userId, variableExpense);

    return variableExpense;
};

export const getVariableExpensesResolver = async (root, args) => {
    const now = moment();
    const data =  getVariableExpenses(userId);
    console.log('moment().diff(now)', moment().diff(now));

    return data;
};

