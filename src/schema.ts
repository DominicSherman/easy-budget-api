import {gql} from 'apollo-server-express';

const schema = gql`
type Query {
    expenses(userId: String!, variableCategoryId: String): [Expense!]!
    timePeriods(userId: String!, where: TimePeriodInput): [TimePeriod!]!
    variableCategories(userId: String!): [VariableCategory!]!
}

type Mutation {
    createExpense(expense: CreateExpense!): Expense!
    createTimePeriod(timePeriod: CreateTimePeriod!): TimePeriod!
    createVariableCategory(variableCategory: CreateVariableCategory!): VariableCategory!
}

type TimePeriod {
    timePeriodId: ID!
    beginDate: String!
    endDate: String!
    userId: String!
}

input CreateTimePeriod {
    timePeriodId: String!
    beginDate: String!
    endDate: String!
    userId: String!
}

input TimePeriodInput {
    beginDate: String!
    endDate: String!
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
    amount: Float!
    date: String!
    name: String
}

input CreateExpense {
    expenseId: String!
    userId: String!
    variableCategoryId: String!
    amount: Float!
    date: String!
    name: String
}
`;

export default schema;
