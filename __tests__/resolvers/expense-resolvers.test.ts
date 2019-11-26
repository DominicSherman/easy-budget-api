import {chance} from '../chance';
import {createRandomExpense} from '../model-factory';
import * as expenseRepository from '../../src/repositories/expense-repository';
import {createExpenseResolver, getExpensesResolver} from '../../src/resolvers/expense-resolvers';
import * as resolverHelpers from '../../src/helpers/resolver-helpers';

jest.mock('../../src/repositories/expense-repository');
jest.mock('../../src/helpers/resolver-helpers');

describe('variable category resolvers', () => {
    const {getExpensesByVariableCategoryId, getExpensesByTimePeriodId, getExpenses, insertExpense} = expenseRepository as jest.Mocked<typeof expenseRepository>;
    const {getPropertyFromArgsOrRoot} = resolverHelpers as jest.Mocked<typeof resolverHelpers>;

    let root,
        args;

    beforeEach(() => {
        root = {
            [chance.string()]: chance.string()
        };
        args = {
            [chance.string()]: chance.string()
        };
    });

    describe('createExpenseResolver', () => {
        let expectedCreateExpense;

        beforeEach(() => {
            expectedCreateExpense = createRandomExpense();

            args = {
                expense: expectedCreateExpense
            };
        });

        it('should call insertExpense', async () => {
            await createExpenseResolver(root, args);

            expect(insertExpense).toHaveBeenCalledTimes(1);
            expect(insertExpense).toHaveBeenCalledWith(expectedCreateExpense);
        });

        it('should return the input', async () => {
            const actualResponse = await createExpenseResolver(root, args);

            expect(actualResponse).toEqual(expectedCreateExpense);
        });
    });

    describe('getExpensesResolver', () => {
        let expectedExpenses,
            expectedUserId,
            expectedVariableCategoryId,
            expectedTimePeriodId;

        beforeEach(() => {
            expectedExpenses = chance.n(createRandomExpense, chance.d6());
            expectedUserId = chance.guid();
            expectedVariableCategoryId = chance.guid();
            expectedTimePeriodId = chance.guid();

            getExpenses.mockReturnValue(expectedExpenses);
            getExpensesByVariableCategoryId.mockReturnValue(expectedExpenses);
            getExpensesByTimePeriodId.mockReturnValue(expectedExpenses);
        });

        describe('when there is no timePeriodId or variableCategoryId', () => {
            beforeEach(() => {
                getPropertyFromArgsOrRoot
                    .mockReturnValueOnce(expectedUserId)
                    .mockReturnValueOnce(null)
                    .mockReturnValueOnce(null);
            });

            it('should call getExpenses', async () => {
                await getExpensesResolver(root, args);

                expect(getExpenses).toHaveBeenCalledTimes(1);
                expect(getExpenses).toHaveBeenCalledWith(expectedUserId);
            });

            it('should return the expenses', async () => {
                const actualResponse = await getExpensesResolver(root, args);

                expect(actualResponse).toEqual(expectedExpenses);
            });
        });

        describe('when there is a variableCategoryId', () => {
            beforeEach(() => {
                getPropertyFromArgsOrRoot
                    .mockReturnValueOnce(expectedUserId)
                    .mockReturnValueOnce(expectedVariableCategoryId)
                    .mockReturnValueOnce(null);
            });

            it('should call getExpensesByVariableCategoryId', async () => {
                await getExpensesResolver(root, args);

                expect(getExpensesByVariableCategoryId).toHaveBeenCalledTimes(1);
                expect(getExpensesByVariableCategoryId).toHaveBeenCalledWith(expectedUserId, expectedVariableCategoryId);
            });

            it('should return the expenses', async () => {
                const actualExpenses = await getExpensesResolver(root, args);

                expect(actualExpenses).toEqual(expectedExpenses);
            });
        });

        describe('when there is no variableCategoryId and a timePeriodId', () => {
            beforeEach(() => {
                getPropertyFromArgsOrRoot
                    .mockReturnValueOnce(expectedUserId)
                    .mockReturnValueOnce(null)
                    .mockReturnValueOnce(expectedTimePeriodId);
            });

            it('should call getExpensesByTimePeriodId', async () => {
                await getExpensesResolver(root, args);

                expect(getExpensesByTimePeriodId).toHaveBeenCalledTimes(1);
                expect(getExpensesByTimePeriodId).toHaveBeenCalledWith(expectedUserId, expectedTimePeriodId);
            });

            it('should return the expenses', async () => {
                const actualExpenses = await getExpensesResolver(root, args);

                expect(actualExpenses).toEqual(expectedExpenses);
            });
        });
    });
});
