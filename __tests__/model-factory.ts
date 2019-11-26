import {Expense, TimePeriod, VariableCategory} from '../src/generated/graphql';

import {chance} from './chance';

export const createRandomVariableCategory = (variableCategory = {}): VariableCategory => ({
    __typename: 'VariableCategory',
    amount: chance.natural(),
    name: chance.string(),
    timePeriodId: chance.guid(),
    userId: chance.string(),
    variableCategoryId: chance.guid(),
    ...variableCategory
});

export const createRandomExpense = (expense = {}): Expense => ({
    __typename: 'Expense',
    amount: chance.natural(),
    date: chance.date().toString(),
    expenseId: chance.natural(),
    name: chance.string(),
    timePeriodId: chance.guid(),
    userId: chance.string(),
    variableCategoryId: chance.guid(),
    ...expense
});

export const createRandomTimePeriod = (timePeriod = {}): TimePeriod => ({
    __typename: 'TimePeriod',
    beginDate: chance.date().toString(),
    endDate: chance.date().toString(),
    timePeriodId: chance.guid(),
    userId: chance.string(),
    ...timePeriod
});
