export const variableCategory = `
type VariableCategory {
    variableCategoryId: ID!
    timePeriodId: String!
    userId: String!
    amount: Int!
    name: String!
    expenses: [Expense!]!
}

input CreateVariableCategory {
    variableCategoryId: String!
    timePeriodId: String!
    userId: String!
    amount: Int!
    name: String!
}

input UpdateVariableCategory {
    variableCategoryId: String!
    userId: String!
    amount: Int
    name: String
}
`;
