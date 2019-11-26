export const variableCategory = `
type VariableCategory {
    variableCategoryId: ID!
    timePeriodId: String!
    userId: String!
    amount: Int!
    name: String!
}

input CreateVariableCategory {
    variableCategoryId: String!
    timePeriodId: String!
    userId: String!
    amount: Int!
    name: String!
}
`;
