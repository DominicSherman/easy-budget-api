export const income = `
type IncomeItem {
    incomeItemId: ID!
    timePeriodId: String!
    userId: String!
    amount: Int!
    recurring: Boolean!
    name: String!
}

input CreateIncomeItem {
    incomeItemId: ID!
    timePeriodId: String!
    userId: String!
    amount: Int!
    recurring: Boolean!
    name: String!
}

input UpdateIncomeItem {
    incomeItemId: ID!
    userId: String!
    amount: Int
    recurring: Boolean
    name: String
}
`;
