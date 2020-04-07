export const debtCategory = `
type DebtCategory {
    debtCategoryId: ID!
    userId: String!
    name: String!
    amount: Int!
}

input CreateDebtCategory {
    debtCategoryId: String!
    userId: String!
    name: String!
}

input UpdateDebtCategory {
    debtCategoryId: String!
    userId: String!
    name: String
    amount: Int
}
`;
