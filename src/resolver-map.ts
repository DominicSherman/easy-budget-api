import {createVariableCategoryResolver, getVariableCategoryResolver} from './resolvers/variable-category-resolvers';
import {createExpenseResolver, getExpensesResolver} from './resolvers/expense-resolvers';

export default {
    Mutation: {
        createExpense: createExpenseResolver,
        createVariableCategory: createVariableCategoryResolver
    },
    Query: {
        expenses: getExpensesResolver,
        variableCategories: getVariableCategoryResolver
    }
};
