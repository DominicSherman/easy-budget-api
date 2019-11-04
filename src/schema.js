import {gql} from 'apollo-server-express';

const schema = gql`
type Query {
    variableExpenses: [VariableExpense!]
}

type Mutation {
    createVariableExpense: VariableExpense
}

type VariableExpense {
    variableExpenseId: ID
    amount: Int
    name: String
}
`;

export default schema;