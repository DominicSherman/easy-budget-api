import {createVariableCategoryResolver, getVariableCategoryResolver} from './resolvers/variable-category-resolvers';
import {createExpenseResolver, getExpensesResolver} from './resolvers/expense-resolvers';
import {createTimePeriodResolver, getTimePeriodsResolver} from './resolvers/time-period-resolvers';

export default {
    Mutation: {
        createExpense: createExpenseResolver,
        createTimePeriod: createTimePeriodResolver,
        createVariableCategory: createVariableCategoryResolver
    },
    Query: {
        expenses: getExpensesResolver,
        timePeriods: getTimePeriodsResolver,
        variableCategories: getVariableCategoryResolver
    }
};
