export const timePeriod = `
type TimePeriod {
    timePeriodId: ID!
    beginDate: String!
    endDate: String!
    userId: String!
    fixedCategories: [FixedCategory!]!
    variableCategories: [VariableCategory!]!
    expenses: [Expense!]!
}

input CreateTimePeriod {
    timePeriodId: String!
    beginDate: String!
    endDate: String!
    userId: String!
}

input UpdateTimePeriod {
    timePeriodId: String!
    beginDate: String
    endDate: String
    userId: String!
}
`;
