export const root = `
type Query {
    expenses(userId: String!, variableCategoryId: String, timePeriodId: String): [Expense!]!
    fixedCategory(userId: String!, fixedCategoryId: String!): FixedCategory!
    fixedCategories(userId: String!, timePeriodId: String): [FixedCategory!]!
    timePeriod(userId: String!, timePeriodId: String!): TimePeriod!
    timePeriods(userId: String!, date: String): [TimePeriod!]!
    variableCategory(userId: String!, variableCategoryId: String!): VariableCategory!
    variableCategories(userId: String!, timePeriodId: String): [VariableCategory!]!
}

type Mutation {
    createExpense(expense: CreateExpense!): Expense!
    createFixedCategory(fixedCategory: CreateFixedCategory!): FixedCategory!
    createTimePeriod(timePeriod: CreateTimePeriod!): TimePeriod!
    createVariableCategory(variableCategory: CreateVariableCategory!): VariableCategory!
    deleteExpense(userId: String!, expenseId: String!): String!
    deleteFixedCategory(userId: String!, fixedCategoryId: String!): String!
    deleteVariableCategory(userId: String!, variableCategoryId: String!): String!
    updateExpense(expense: UpdateExpense!): Expense!
    updateFixedCategory(fixedCategory: UpdateFixedCategory!): FixedCategory!
    updateVariableCategory(variableCategory: UpdateVariableCategory!): VariableCategory!
}
`;
