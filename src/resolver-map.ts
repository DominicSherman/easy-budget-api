import {
    createVariableCategoryResolver,
    deleteVariableCategoryResolver,
    getVariableCategoriesResolver, getVariableCategoryResolver,
    updateVariableCategoryResolver
} from './resolvers/variable-category-resolvers';
import {
    createExpenseResolver,
    deleteExpenseResolver, getExpenseResolver,
    getExpensesResolver,
    updateExpenseResolver
} from './resolvers/expense-resolvers';
import {createTimePeriodResolver, getTimePeriodsResolver} from './resolvers/time-period-resolvers';
import {
    createFixedCategoryResolver,
    deleteFixedCategoryResolver,
    getFixedCategoriesResolver, getFixedCategoryResolver,
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
        expense: getExpenseResolver,
        expenses: getExpensesResolver,
        fixedCategories: getFixedCategoriesResolver,
        fixedCategory: getFixedCategoryResolver,
        timePeriods: getTimePeriodsResolver,
        variableCategories: getVariableCategoriesResolver,
        variableCategory: getVariableCategoryResolver
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
