import {createVariableCategoryResolver, getVariableCategoriesResolver} from './resolvers/variable-category-resolvers';
import {createExpenseResolver, getExpensesResolver} from './resolvers/expense-resolvers';
import {createTimePeriodResolver, getTimePeriodsResolver} from './resolvers/time-period-resolvers';
import {createFixedCategoryResolver, getFixedCategoriesResolver} from './resolvers/fixed-category-resolvers';

export default {
    Mutation: {
        createExpense: createExpenseResolver,
        createFixedCategory: createFixedCategoryResolver,
        createTimePeriod: createTimePeriodResolver,
        createVariableCategory: createVariableCategoryResolver
    },
    Query: {
        expenses: getExpensesResolver,
        fixedCategories: getFixedCategoriesResolver,
        timePeriods: getTimePeriodsResolver,
        variableCategories: getVariableCategoriesResolver
    },
    TimePeriod: {
        expenses: getExpensesResolver,
        fixedCategories: getFixedCategoriesResolver,
        variableCategories: getVariableCategoriesResolver
    },
    VariableCategory: {
        expenses: getExpensesResolver
    }
};
