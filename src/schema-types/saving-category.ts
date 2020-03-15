export const savingCategory = `
type SavingCategory {
    savingCategoryId: ID!
    userId: String!
    name: String!
    amount: Int!
}

input CreateSavingCategory {
    savingCategoryId: String!
    userId: String!
    name: String!
}

input UpdateSavingCategory {
    savingCategoryId: String!
    userId: String!
    name: String
    amount: Int
}
`;
