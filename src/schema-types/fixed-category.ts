export const fixedCategory = `
type FixedCategory {
    fixedCategoryId: ID!
    timePeriodId: String!
    userId: String!
    amount: Int!
    name: String!
    paid: Boolean!
    note: String
}

input CreateFixedCategory {
    fixedCategoryId: String!
    timePeriodId: String!
    userId: String!
    amount: Int!
    name: String!
    paid: Boolean!
    note: String
}

input UpdateFixedCategory {
    fixedCategoryId: String!
    userId: String!
    amount: Int
    name: String
    paid: Boolean
    note: String
}
`;
