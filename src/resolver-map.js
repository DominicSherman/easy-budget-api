import {createVariableExpenseResolver, getVariableExpensesResolver} from './resolvers/variable-expense-resolvers';

export default {
    Query: {
        variableExpenses: getVariableExpensesResolver
    },
    Mutation: {
        createVariableExpense: createVariableExpenseResolver
    }
};