import createVariableExpenseResolver from './resolvers/create-variable-expense-resolver';

export default {
    Query: {
        hello: () => 'foo'
    },
    Mutation: {
        createVariableExpense: createVariableExpenseResolver
    }
};