export const root = `
type Query {
    expense(userId: String!, expenseId: String!): Expense!
    expenses(userId: String!, variableCategoryId: String, timePeriodId: String): [Expense!]!
    fixedCategories(userId: String!, timePeriodId: String): [FixedCategory!]!
    fixedCategory(userId: String!, fixedCategoryId: String!): FixedCategory!
    savingCategories(userId: String!): [SavingCategory!]!
    savingCategory(userId: String!, savingCategoryId: String!): SavingCategory!
    timePeriod(userId: String!, timePeriodId: String!): TimePeriod!
    timePeriods(userId: String!, date: String): [TimePeriod!]!
    variableCategories(userId: String!, timePeriodId: String): [VariableCategory!]!
    variableCategory(userId: String!, variableCategoryId: String!): VariableCategory!
}

type Mutation {
    createExpense(expense: CreateExpense!): Expense!
    createFixedCategory(fixedCategory: CreateFixedCategory!): FixedCategory!
    createSavingCategory(savingCategory: CreateSavingCategory!): SavingCategory!
    createTimePeriod(timePeriod: CreateTimePeriod!): TimePeriod!
    createVariableCategory(variableCategory: CreateVariableCategory!): VariableCategory!
    deleteExpense(userId: String!, expenseId: String!): String!
    deleteFixedCategory(userId: String!, fixedCategoryId: String!): String!
    deleteSavingCategory(userId: String!, savingCategoryId: String!): String!
    deleteVariableCategory(userId: String!, variableCategoryId: String!): String!
    updateExpense(expense: UpdateExpense!): Expense!
    updateFixedCategory(fixedCategory: UpdateFixedCategory!): FixedCategory!
    updateSavingCategory(savingCategory: UpdateSavingCategory!): SavingCategory!
    updateVariableCategory(variableCategory: UpdateVariableCategory!): VariableCategory!
}
`;
