import {gql} from 'apollo-server-express';

const schema = gql`
type Query {
    hello: String
}

type Mutation {
    createVariableExpense: VariableExpense
}

type VariableExpense {
    amount: Int
    name: String
    spent: Int
}
`;

export default schema;