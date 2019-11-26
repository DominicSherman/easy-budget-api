import {initializeApp} from './lib/adapters/firestore-adapter';

const uuid = require('uuid');
const moment = require('moment');

const {insertTimePeriod} = require('./lib/repositories/time-period-repository');
const {insertVariableCategory} = require('./lib/repositories/variable-category-repository');
const {insertExpense} = require('./lib/repositories/expense-repository');

const userId = 'KRrbQtb3Lwc41ispywo5Ci72vow2';

const timePeriods = [
    {
        beginDate: moment().subtract(2, 'd').toISOString(),
        endDate: moment().add(28, 'd').toISOString(),
        timePeriodId: uuid.v4(),
        userId
    },
    {
        beginDate: moment().subtract(2, 'M').subtract(2, 'd').toISOString(),
        endDate: moment().subtract(2, 'M').add(28, 'd').toISOString(),
        timePeriodId: uuid.v4(),
        userId
    }
];

const variableCategories = [
    {
        amount: 100,
        name: 'Gas',
        timePeriodId: timePeriods[0].timePeriodId,
        userId,
        variableCategoryId: uuid.v4()
    },
    {
        amount: 50,
        name: 'Clothes',
        timePeriodId: timePeriods[0].timePeriodId,
        userId,
        variableCategoryId: uuid.v4()
    },
    {
        amount: 400,
        name: 'Food',
        timePeriodId: timePeriods[0].timePeriodId,
        userId,
        variableCategoryId: uuid.v4()
    },
    {
        amount: 400,
        name: 'Food',
        timePeriodId: timePeriods[1].timePeriodId,
        userId,
        variableCategoryId: uuid.v4()
    }
];

const expenses = [
    {
        amount: 3.50,
        date: moment().subtract(2, 'd').toISOString(),
        expenseId: uuid.v4(),
        name: 'Taco Bell',
        timePeriodId: variableCategories[2].timePeriodId,
        userId,
        variableCategoryId: variableCategories[2].variableCategoryId
    },
    {
        amount: 29.21,
        date: moment().subtract(3, 'd').toISOString(),
        expenseId: uuid.v4(),
        name: 'Hy-Vee',
        timePeriodId: variableCategories[2].timePeriodId,
        userId,
        variableCategoryId: variableCategories[2].variableCategoryId
    },
    {
        amount: 20.84,
        date: moment().subtract(7, 'd').toISOString(),
        expenseId: uuid.v4(),
        name: 'Taco Bell',
        timePeriodId: variableCategories[3].timePeriodId,
        userId,
        variableCategoryId: variableCategories[3].variableCategoryId
    },
    {
        amount: 29.99,
        date: moment().subtract(1, 'd').toISOString(),
        expenseId: uuid.v4(),
        name: 'Gas',
        timePeriodId: variableCategories[0].timePeriodId,
        userId,
        variableCategoryId: variableCategories[0].variableCategoryId
    }
];

// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const addTestData = () => {
    initializeApp();

    timePeriods.forEach((timePeriod) => {
        insertTimePeriod(timePeriod);
    });
    variableCategories.forEach((variableCategory) => {
        insertVariableCategory(variableCategory);
    });
    expenses.forEach((expense) => {
        insertExpense(expense);
    });
};

addTestData();
