export const timePeriod = `
type TimePeriod {
    timePeriodId: ID!
    beginDate: String!
    endDate: String!
    userId: String!
    variableCategories: [VariableCategory!]!
    expenses: [Expense!]!
}

input CreateTimePeriod {
    timePeriodId: String!
    beginDate: String!
    endDate: String!
    userId: String!
}
`;
