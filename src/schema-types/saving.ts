export const saving = `
type Saving {
    savingId: ID!
    userId: String!
    savingCategoryId: String!
    amount: Float!
    date: String!
    name: String
    saving: SavingCategory!
}

input CreateSaving {
    savingId: String!
    userId: String!
    savingCategoryId: String!
    amount: Float!
    date: String!
    name: String
}

input UpdateSaving {
    savingId: String!
    userId: String!
    savingCategoryId: String
    amount: Float
    date: String
    name: String
}
`;
