export const fixedCategory = `
type FixedCategory {
    fixedCategoryId: ID!
    timePeriodId: String!
    userId: String!
    amount: Int!
    name: String!
    paid: Boolean!
}

input CreateFixedCategory {
    fixedCategoryId: ID!
    timePeriodId: String!
    userId: String!
    amount: Int!
    name: String!
    paid: Boolean!
}
`;
