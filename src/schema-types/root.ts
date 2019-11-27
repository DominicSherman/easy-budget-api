export const root = `
type Query {
    expenses(userId: String!, variableCategoryId: String, timePeriodId: String): [Expense!]!
    fixedCategories(userId: String!, fixedCategoryId: String, timePeriodId: String): [FixedCategory!]!
    timePeriods(userId: String!, date: String): [TimePeriod!]!
    variableCategories(userId: String!, timePeriodId: String): [VariableCategory!]!
}

type Mutation {
    createExpense(expense: CreateExpense!): Expense!
    createFixedCategory(fixedCategory: CreateFixedCategory!): FixedCategory!
    createTimePeriod(timePeriod: CreateTimePeriod!): TimePeriod!
    createVariableCategory(variableCategory: CreateVariableCategory!): VariableCategory!
}
`;
