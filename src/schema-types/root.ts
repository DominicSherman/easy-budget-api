export const root = `
type Query {
    debtCategories(userId: String!): [DebtCategory!]!
    debtCategory(userId: String!, debtCategoryId: String!): DebtCategory!
    expense(userId: String!, expenseId: String!): Expense!
    expenses(userId: String!, variableCategoryId: String, timePeriodId: String): [Expense!]!
    fixedCategories(userId: String!, timePeriodId: String): [FixedCategory!]!
    fixedCategory(userId: String!, fixedCategoryId: String!): FixedCategory!
    incomeItem(userId: String!, incomeItemId: String!): IncomeItem!
    incomeItems(userId: String!, timePeriodId: String): [IncomeItem!]!
    savingCategories(userId: String!): [SavingCategory!]!
    savingCategory(userId: String!, savingCategoryId: String!): SavingCategory!
    timePeriod(userId: String!, timePeriodId: String!): TimePeriod!
    timePeriods(userId: String!, date: String): [TimePeriod!]!
    variableCategories(userId: String!, timePeriodId: String): [VariableCategory!]!
    variableCategory(userId: String!, variableCategoryId: String!): VariableCategory!
}

type Mutation {
    createDebtCategory(debtCategory: CreateDebtCategory!): DebtCategory!
    createExpense(expense: CreateExpense!): Expense!
    createFixedCategory(fixedCategory: CreateFixedCategory!): FixedCategory!
    createIncomeItem(incomeItem: CreateIncomeItem!): IncomeItem!
    createSavingCategory(savingCategory: CreateSavingCategory!): SavingCategory!
    createTimePeriod(timePeriod: CreateTimePeriod!): TimePeriod!
    createVariableCategory(variableCategory: CreateVariableCategory!): VariableCategory!
    deleteDebtCategory(userId: String!, debtCategoryId: String!): String!
    deleteExpense(userId: String!, expenseId: String!): String!
    deleteFixedCategory(userId: String!, fixedCategoryId: String!): String!
    deleteIncomeItem(userId: String!, incomeItemId: String!): String!
    deleteSavingCategory(userId: String!, savingCategoryId: String!): String!
    deleteVariableCategory(userId: String!, variableCategoryId: String!): String!
    updateDebtCategory(debtCategory: UpdateDebtCategory!): DebtCategory!
    updateExpense(expense: UpdateExpense!): Expense!
    updateFixedCategory(fixedCategory: UpdateFixedCategory!): FixedCategory!
    updateIncomeItem(incomeItem: UpdateIncomeItem!): IncomeItem!
    updateSavingCategory(savingCategory: UpdateSavingCategory!): SavingCategory!
    updateVariableCategory(variableCategory: UpdateVariableCategory!): VariableCategory!
}
`;
