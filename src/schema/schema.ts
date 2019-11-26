import {gql} from 'apollo-server-express';

import {expense} from './expense';
import {variableCategory} from './variable-category';
import {timePeriod} from './time-period';

const schema = gql`
type Query {
    expenses(userId: String!, where: ExpenseInput): [Expense!]!
    timePeriods(userId: String!, where: TimePeriodInput): [TimePeriod!]!
    variableCategories(userId: String!, timePeriodId: String): [VariableCategory!]!
}

type Mutation {
    createExpense(expense: CreateExpense!): Expense!
    createTimePeriod(timePeriod: CreateTimePeriod!): TimePeriod!
    createVariableCategory(variableCategory: CreateVariableCategory!): VariableCategory!
}

${timePeriod}
${variableCategory}
${expense}
`;

export default schema;
