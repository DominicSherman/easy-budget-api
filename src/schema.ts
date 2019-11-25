import {gql} from 'apollo-server-express';

const schema = gql`
type Query {
    expenses(userId: String!, variableCategoryId: Id): [Expense!]!
    variableCategories(userId: String!): [VariableCategory!]!
}

type Mutation {
    createVariableCategory(variableCategory: CreateVariableCategory!): VariableCategory!
    createExpense(expense: CreateExpense!): Expense!
}

type VariableCategory {
    variableCategoryId: ID!
    userId: String!
    amount: Int!
    name: String!
}

input CreateVariableCategory {
    variableCategoryId: String!
    userId: String!
    amount: Int!
    name: String!
}

type Expense {
    expenseId: ID!
    userId: String!
    variableCategoryId: String!
    amount: Int!
    name: String
}

input CreateExpense {
    expenseId: String!
    userId: String!
    variableCategoryId: String!
    amount: Int!
    name: String
}
`;

export default schema;
