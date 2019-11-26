export const expense = `
type Expense {
    expenseId: ID!
    userId: String!
    variableCategoryId: String!
    timePeriodId: String!
    amount: Float!
    date: String!
    name: String
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

input ExpenseInput {
    variableCategoryId: String
    timePeriodId: String
}
`;
