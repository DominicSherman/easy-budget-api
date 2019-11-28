import {
    createVariableCategoryResolver,
    deleteVariableCategoryResolver,
    getVariableCategoriesResolver,
    updateVariableCategoryResolver
} from './resolvers/variable-category-resolvers';
import {
    createExpenseResolver,
    deleteExpenseResolver,
    getExpensesResolver,
    updateExpenseResolver
} from './resolvers/expense-resolvers';
import {createTimePeriodResolver, getTimePeriodsResolver} from './resolvers/time-period-resolvers';
import {
    createFixedCategoryResolver,
    deleteFixedCategoryResolver,
    getFixedCategoriesResolver,
    updateFixedCategoryResolver
} from './resolvers/fixed-category-resolvers';

export default {
    Mutation: {
        createExpense: createExpenseResolver,
        createFixedCategory: createFixedCategoryResolver,
        createTimePeriod: createTimePeriodResolver,
        createVariableCategory: createVariableCategoryResolver,
        deleteExpense: deleteExpenseResolver,
        deleteFixedCategory: deleteFixedCategoryResolver,
        deleteVariableCategory: deleteVariableCategoryResolver,
        updateExpense: updateExpenseResolver,
        updateFixedCategory: updateFixedCategoryResolver,
        updateVariableCategory: updateVariableCategoryResolver
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
