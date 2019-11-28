import * as firestoreAdapter from '../../src/adapters/firestore-adapter';
import * as repositoryHelpers from '../../src/helpers/repository-helpers';
import {
    deleteExpense, getExpenseByExpenseId,
    getExpenses,
    getExpensesByTimePeriodId,
    getExpensesByVariableCategoryId,
    insertExpense
} from '../../src/repositories/expense-repository';
import {createRandomExpense} from '../model-factory';

const Chance = require('chance');

const chance = new Chance();

jest.mock('../../src/adapters/firestore-adapter');
jest.mock('../../src/helpers/repository-helpers');

describe('expense repository', () => {
    const {getFirestoreData, setFirestoreData, deleteFirestoreData} = firestoreAdapter as jest.Mocked<typeof firestoreAdapter>;
    const {getDataFromQuerySnapshot} = repositoryHelpers as jest.Mocked<typeof repositoryHelpers>;

    let expectedUserId;

    beforeEach(() => {
        expectedUserId = chance.string();
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    describe('insertExpense', () => {
        let expectedResponse,
            expectedExpense;

        beforeEach(() => {
            expectedResponse = {
                [chance.string()]: chance.string()
            };
            expectedExpense = createRandomExpense();

            setFirestoreData.mockReturnValue(expectedResponse);
        });

        it('should call setFirestoreData', () => {
            insertExpense(expectedExpense);

            expect(setFirestoreData).toHaveBeenCalledTimes(1);
            expect(setFirestoreData).toHaveBeenCalledWith(
                expectedExpense.userId,
                'expenses',
                expectedExpense.expenseId,
                expectedExpense
            );
        });
    });

    describe('deleteExpense', () => {
        let expectedResponse,
            expectedExpense;

        beforeEach(() => {
            expectedResponse = {
                [chance.string()]: chance.string()
            };
            expectedExpense = createRandomExpense();

            setFirestoreData.mockReturnValue(expectedResponse);
        });

        it('should call deleteFirestoreData', () => {
            deleteExpense(expectedExpense.userId, expectedExpense.expenseId);

            expect(deleteFirestoreData).toHaveBeenCalledTimes(1);
            expect(deleteFirestoreData).toHaveBeenCalledWith(
                expectedExpense.userId,
                'expenses',
                expectedExpense.expenseId
            );
        });
    });

    describe('getExpenses', () => {
        let expectedQuerySnapshot,
            expectedResponse,
            expectedWhere;

        beforeEach(() => {
            expectedQuerySnapshot = {
                [chance.string()]: chance.string()
            };
            expectedResponse = {
                [chance.string()]: chance.string()
            };
            expectedWhere = {
                [chance.string()]: chance.string()
            };

            getFirestoreData.mockReturnValue(expectedQuerySnapshot);
            getDataFromQuerySnapshot.mockReturnValue(expectedResponse);
        });

        it('should call getFirestoreData', async () => {
            await getExpenses(expectedUserId, expectedWhere);

            expect(getFirestoreData).toHaveBeenCalledTimes(1);
            expect(getFirestoreData).toHaveBeenCalledWith(expectedUserId, 'expenses', expectedWhere);
        });

        it('should call getDataFromQuerySnapshot', async () => {
            await getExpenses(expectedUserId);

            expect(getDataFromQuerySnapshot).toHaveBeenCalledTimes(1);
            expect(getDataFromQuerySnapshot).toHaveBeenCalledWith(expectedQuerySnapshot);
        });

        it('should return the data', async () => {
            const actualResponse = await getExpenses(expectedUserId);

            expect(actualResponse).toEqual(expectedResponse);
        });
    });

    describe('getExpensesByVariableCategoryId', () => {
        let expectedVariableCategoryId;

        beforeEach(() => {
            expectedVariableCategoryId = chance.guid();
        });

        it('should call getFirestoreData', async () => {
            await getExpensesByVariableCategoryId(expectedUserId, expectedVariableCategoryId);

            expect(getFirestoreData).toHaveBeenCalledTimes(1);
            expect(getFirestoreData).toHaveBeenCalledWith(expectedUserId, 'expenses', {
                field: 'variableCategoryId',
                operator: '==',
                value: expectedVariableCategoryId
            });
        });
    });

    describe('getExpensesByTimePeriodId', () => {
        let expectedTimePeriodId;

        beforeEach(() => {
            expectedTimePeriodId = chance.guid();
        });

        it('should call getFirestoreData', async () => {
            await getExpensesByTimePeriodId(expectedUserId, expectedTimePeriodId);

            expect(getFirestoreData).toHaveBeenCalledTimes(1);
            expect(getFirestoreData).toHaveBeenCalledWith(expectedUserId, 'expenses', {
                field: 'timePeriodId',
                operator: '==',
                value: expectedTimePeriodId
            });
        });
    });

    describe('getExpenseByExpenseId', () => {
        let expectedExpenseId,
            expectedExpenses;

        beforeEach(() => {
            expectedExpenseId = chance.guid();
            expectedExpenses = chance.n(createRandomExpense, chance.d6());

            getDataFromQuerySnapshot.mockReturnValue(expectedExpenses);
        });

        it('should call getFirestoreData', async () => {
            await getExpenseByExpenseId(expectedUserId, expectedExpenseId);

            expect(getFirestoreData).toHaveBeenCalledTimes(1);
            expect(getFirestoreData).toHaveBeenCalledWith(expectedUserId, 'expenses', {
                field: 'expenseId',
                operator: '==',
                value: expectedExpenseId
            });
        });

        it('should return the expense', async () => {
            const actualExpense = await getExpenseByExpenseId(expectedUserId, expectedExpenseId);

            expect(actualExpense).toEqual(expectedExpenses[0]);
        });
    });
});
