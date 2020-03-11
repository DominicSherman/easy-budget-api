export const savingCategory = `
type SavingCategory {
    savingCategoryId: ID!
    userId: String!
    name: String!
    savings: [Saving!]!
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
}
`;
