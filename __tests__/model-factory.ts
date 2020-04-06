import {Expense, FixedCategory, SavingCategory, TimePeriod, VariableCategory, IncomeItem} from '../src/generated/graphql';

import {chance} from './chance';

// eslint-disable-next-line @typescript-eslint/ban-ts-ignore
// @ts-ignore
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

export const createRandomSavingCategory = (savingCategory = {}): SavingCategory => ({
    __typename: 'SavingCategory',
    amount: chance.natural(),
    name: chance.string(),
    savingCategoryId: chance.guid(),
    userId: chance.string(),
    ...savingCategory
});

export const createRandomVariableCategory = (variableCategory = {}): VariableCategory => ({
    __typename: 'VariableCategory',
    amount: chance.natural(),
    expenses: chance.n(createRandomExpense, chance.d6()),
    name: chance.string(),
    timePeriodId: chance.guid(),
    userId: chance.string(),
    variableCategoryId: chance.guid(),
    ...variableCategory
});

export const createRandomFixedCategory = (fixedCategory = {}): FixedCategory => ({
    __typename: 'FixedCategory',
    amount: chance.natural(),
    fixedCategoryId: chance.guid(),
    name: chance.string(),
    note: chance.string(),
    paid: chance.bool(),
    timePeriodId: chance.guid(),
    userId: chance.string(),
    ...fixedCategory
});

export const createRandomIncomeItem = (incomeItem = {}): IncomeItem => ({
    __typename: 'IncomeItem',
    amount: chance.natural(),
    incomeItemId: chance.guid(),
    name: chance.string(),
    recurring: chance.bool(),
    timePeriodId: chance.guid(),
    userId: chance.string(),
    ...incomeItem
});

export const createRandomTimePeriod = (timePeriod = {}): TimePeriod => {
    const beginDate = chance.natural();
    const endDate = beginDate + chance.natural();

    return {
        __typename: 'TimePeriod',
        beginDate,
        endDate,
        expenses: chance.n(createRandomExpense, chance.d6()),
        fixedCategories: chance.n(createRandomFixedCategory, chance.d6()),
        timePeriodId: chance.guid(),
        userId: chance.string(),
        variableCategories: chance.n(createRandomVariableCategory, chance.d6()),
        ...timePeriod
    };
};
