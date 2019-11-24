import {gql} from 'apollo-server-express';

const schema = gql`
type Query {
    variableCategories(userId: String!): [VariableCategory!]!
}

type Mutation {
    createVariableCategory(variableCategory: CreateVariableCategory!): VariableCategory!
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
`;

export default schema;
