import {
    createVariableCategoryResolver,
    deleteVariableCategoryResolver,
    getVariableCategoriesResolver,
    getVariableCategoryResolver,
    updateVariableCategoryResolver
} from './resolvers/variable-category-resolvers';
import {
    createExpenseResolver,
    deleteExpenseResolver,
    getExpenseResolver,
    getExpensesResolver,
    updateExpenseResolver
} from './resolvers/expense-resolvers';
import {createTimePeriodResolver, getTimePeriodsResolver} from './resolvers/time-period-resolvers';
import {
    createFixedCategoryResolver,
    deleteFixedCategoryResolver,
    getFixedCategoriesResolver,
    getFixedCategoryResolver,
    updateFixedCategoryResolver
} from './resolvers/fixed-category-resolvers';
import {
    createSavingResolver,
    deleteSavingResolver,
    getSavingResolver,
    getSavingsResolver, updateSavingResolver
} from './resolvers/saving-resolvers';
import {
    createSavingCategoryResolver, deleteSavingCategoryResolver,
    getSavingCategoriesResolver,
    getSavingCategoryResolver, updateSavingCategoryResolver
} from './resolvers/saving-category-resolvers';

export default {
    Mutation: {
        createExpense: createExpenseResolver,
        createFixedCategory: createFixedCategoryResolver,
        createSaving: createSavingResolver,
        createSavingCategory: createSavingCategoryResolver,
        createTimePeriod: createTimePeriodResolver,
        createVariableCategory: createVariableCategoryResolver,
        deleteExpense: deleteExpenseResolver,
        deleteFixedCategory: deleteFixedCategoryResolver,
        deleteSaving: deleteSavingResolver,
        deleteSavingCategory: deleteSavingCategoryResolver,
        deleteVariableCategory: deleteVariableCategoryResolver,
        updateExpense: updateExpenseResolver,
        updateFixedCategory: updateFixedCategoryResolver,
        updateSaving: updateSavingResolver,
        updateSavingCategory: updateSavingCategoryResolver,
        updateVariableCategory: updateVariableCategoryResolver
    },
    Query: {
        expense: getExpenseResolver,
        expenses: getExpensesResolver,
        fixedCategories: getFixedCategoriesResolver,
        fixedCategory: getFixedCategoryResolver,
        saving: getSavingResolver,
        savingCategories: getSavingCategoriesResolver,
        savingCategory: getSavingCategoryResolver,
        savings: getSavingsResolver,
        timePeriods: getTimePeriodsResolver,
        variableCategories: getVariableCategoriesResolver,
        variableCategory: getVariableCategoryResolver
    },
    SavingCategory: {
        savings: getSavingsResolver
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
