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
    createSavingCategoryResolver, deleteSavingCategoryResolver,
    getSavingCategoriesResolver,
    getSavingCategoryResolver, updateSavingCategoryResolver
} from './resolvers/saving-category-resolvers';
import {
    createIncomeItemResolver, deleteIncomeItemResolver,
    getIncomeItemResolver,
    getIncomeItemsResolver, updateIncomeItemResolver
} from './resolvers/income-item-resolvers';

export default {
    Mutation: {
        createExpense: createExpenseResolver,
        createFixedCategory: createFixedCategoryResolver,
        createIncomeItem: createIncomeItemResolver,
        createSavingCategory: createSavingCategoryResolver,
        createTimePeriod: createTimePeriodResolver,
        createVariableCategory: createVariableCategoryResolver,
        deleteExpense: deleteExpenseResolver,
        deleteFixedCategory: deleteFixedCategoryResolver,
        deleteIncomeItem: deleteIncomeItemResolver,
        deleteSavingCategory: deleteSavingCategoryResolver,
        deleteVariableCategory: deleteVariableCategoryResolver,
        updateExpense: updateExpenseResolver,
        updateFixedCategory: updateFixedCategoryResolver,
        updateIncomeItem: updateIncomeItemResolver,
        updateSavingCategory: updateSavingCategoryResolver,
        updateVariableCategory: updateVariableCategoryResolver
    },
    Query: {
        expense: getExpenseResolver,
        expenses: getExpensesResolver,
        fixedCategories: getFixedCategoriesResolver,
        fixedCategory: getFixedCategoryResolver,
        incomeItem: getIncomeItemResolver,
        incomeItems: getIncomeItemsResolver,
        savingCategories: getSavingCategoriesResolver,
        savingCategory: getSavingCategoryResolver,
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
