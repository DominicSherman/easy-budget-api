export const expense = `
type Expense {
    expenseId: ID!
    userId: String!
    variableCategoryId: String!
    timePeriodId: String!
    amount: Float!
    date: String!
    name: String
    variableCategory: VariableCategory!
}

input CreateExpense {
    expenseId: String!
    userId: String!
    variableCategoryId: String!
    timePeriodId: String!
    amount: Float!
    date: String!
    name: String
}

input UpdateExpense {
    expenseId: String!
    userId: String!
    amount: Float
    date: String
    name: String
}
`;
