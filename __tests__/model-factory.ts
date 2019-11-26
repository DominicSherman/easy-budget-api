import {VariableCategory} from '../src/generated/graphql';

const Chance = require('chance');

const chance = new Chance();

export const createRandomVariableCategory = (variableCategory = {}): VariableCategory => ({
    __typename: 'VariableCategory',
    amount: chance.natural(),
    name: chance.string(),
    timePeriodId: chance.guid(),
    userId: chance.string(),
    variableCategoryId: chance.guid(),
    ...variableCategory
});
