import {chance} from '../chance';
import {
    createRandomFixedCategory,
    createRandomIncomeItem,
    createRandomTimePeriod,
    createRandomVariableCategory
} from '../model-factory';
import * as timePeriodRepository from '../../src/repositories/time-period-repository';
import {
    createTimePeriodResolver, deleteTimePeriodResolver,
    getTimePeriodsResolver,
    updateTimePeriodResolver
} from '../../src/resolvers/time-period-resolvers';
import * as variableCategoryRepository from '../../src/repositories/variable-category-repository';
import * as fixedCategoryRepository from '../../src/repositories/fixed-category-repository';
import * as incomeItemRepository from '../../src/repositories/income-item-repository';

jest.mock('../../src/repositories/time-period-repository');
jest.mock('../../src/repositories/variable-category-repository');
jest.mock('../../src/repositories/fixed-category-repository');
jest.mock('../../src/repositories/income-item-repository');

describe('variable category resolvers', () => {
    const {getTimePeriods, insertTimePeriod, getTimePeriodsByDate, getTimePeriodByTimePeriodId, deleteTimePeriod} = timePeriodRepository as jest.Mocked<typeof timePeriodRepository>;
    const {getVariableCategoriesByTimePeriodId, insertVariableCategory} = variableCategoryRepository as jest.Mocked<typeof variableCategoryRepository>;
    const {getFixedCategoriesByTimePeriodId, insertFixedCategory} = fixedCategoryRepository as jest.Mocked<typeof fixedCategoryRepository>;
    const {getIncomeItemsByTimePeriodId, insertIncomeItem} = incomeItemRepository as jest.Mocked<typeof incomeItemRepository>;

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

    afterEach(() => {
        jest.resetAllMocks();
    });

    describe('createTimePeriodResolver', () => {
        let expectedCreateTimePeriod,
            expectedMostRecentTimePeriod,
            expectedTimePeriods,
            expectedPreviousVariableCategories,
            expectedPreviousFixedCategories,
            expectedPreviousIncomeItems;

        beforeEach(() => {
            expectedCreateTimePeriod = createRandomTimePeriod();

            args = {
                timePeriod: expectedCreateTimePeriod
            };

            expectedMostRecentTimePeriod = createRandomTimePeriod({
                beginDate: expectedCreateTimePeriod.beginDate - 5,
                endDate: expectedCreateTimePeriod.beginDate - 1
            });
            expectedTimePeriods = [
                createRandomTimePeriod({
                    beginDate: expectedMostRecentTimePeriod.endDate - 6,
                    endDate: expectedMostRecentTimePeriod.endDate - 2
                }),
                expectedMostRecentTimePeriod,
                createRandomTimePeriod({
                    beginDate: expectedMostRecentTimePeriod.endDate - 5,
                    endDate: expectedMostRecentTimePeriod.endDate - 1
                })
            ];
            expectedPreviousVariableCategories = chance.n(createRandomVariableCategory, chance.d6());
            expectedPreviousFixedCategories = chance.n(createRandomFixedCategory, chance.d6());
            expectedPreviousIncomeItems = chance.n(createRandomIncomeItem, chance.d6());

            getTimePeriods.mockReturnValue(expectedTimePeriods);
            getVariableCategoriesByTimePeriodId.mockReturnValue(expectedPreviousVariableCategories);
            getFixedCategoriesByTimePeriodId.mockReturnValue(expectedPreviousFixedCategories);
            getIncomeItemsByTimePeriodId.mockReturnValue(expectedPreviousIncomeItems);
        });

        it('should throw an error if begin date is greater than end date for new time period', async () => {
            expectedCreateTimePeriod.endDate = chance.natural();
            expectedCreateTimePeriod.beginDate = expectedCreateTimePeriod.endDate + 1;
            args.timePeriod = expectedCreateTimePeriod;

            await expect(createTimePeriodResolver(root, args)).rejects.toThrow('End date must be after begin date');
        });

        it('should call getTimePeriod', async () => {
            await createTimePeriodResolver(root, args);

            expect(getTimePeriods).toHaveBeenCalledTimes(1);
            expect(getTimePeriods).toHaveBeenCalledWith(expectedCreateTimePeriod.userId);
        });

        it('should not get variable categories or fixed categories if there are not any previous time period', async () => {
            getTimePeriods.mockResolvedValue([]);

            await createTimePeriodResolver(root, args);

            expect(getVariableCategoriesByTimePeriodId).not.toHaveBeenCalled();
            expect(getFixedCategoriesByTimePeriodId).not.toHaveBeenCalled();
        });

        it('should throw an error if beginDate is conflicting', async () => {
            const conflictingTimePeriod = chance.pickone(expectedTimePeriods);

            expectedCreateTimePeriod = {
                beginDate: conflictingTimePeriod.endDate - 2,
                endDate: conflictingTimePeriod.endDate + 1
            };
            args.timePeriod = expectedCreateTimePeriod;

            await expect(createTimePeriodResolver(root, args)).rejects.toThrow('Time periods cannot overlap');
        });

        it('should throw an error if endDate is conflicting', async () => {
            const conflictingTimePeriod = chance.pickone(expectedTimePeriods);

            expectedCreateTimePeriod = {
                beginDate: conflictingTimePeriod.endDate - 8,
                endDate: conflictingTimePeriod.endDate - 1
            };
            args.timePeriod = expectedCreateTimePeriod;

            await expect(createTimePeriodResolver(root, args)).rejects.toThrow('Time periods cannot overlap');
        });

        it('should call insertVariableCategory for all of the previous variable categories', async () => {
            await createTimePeriodResolver(root, args);

            expect(insertVariableCategory).toHaveBeenCalledTimes(expectedPreviousVariableCategories.length);
            expectedPreviousVariableCategories.forEach((variableCategory) => {
                expect(insertVariableCategory).toHaveBeenCalledWith({
                    ...variableCategory,
                    timePeriodId: expectedCreateTimePeriod.timePeriodId,
                    variableCategoryId: expect.any(String)
                });
            });
        });

        it('should call insertFixedCategory for all of the previous fixed categories', async () => {
            await createTimePeriodResolver(root, args);

            expect(insertFixedCategory).toHaveBeenCalledTimes(expectedPreviousFixedCategories.length);
            expectedPreviousFixedCategories.forEach((variableCategory) => {
                expect(insertFixedCategory).toHaveBeenCalledWith({
                    ...variableCategory,
                    fixedCategoryId: expect.any(String),
                    paid: false,
                    timePeriodId: expectedCreateTimePeriod.timePeriodId
                });
            });
        });

        it('should call insertIncomeItem for all of the previous income items', async () => {
            await createTimePeriodResolver(root, args);

            const recurringIncomeItems = expectedPreviousIncomeItems.filter((incomeItem) => incomeItem.recurring);

            expect(insertIncomeItem).toHaveBeenCalledTimes(recurringIncomeItems.length);
            recurringIncomeItems.forEach((incomeItem) => {
                expect(insertIncomeItem).toHaveBeenCalledWith({
                    ...incomeItem,
                    incomeItemId: expect.any(String),
                    timePeriodId: expectedCreateTimePeriod.timePeriodId
                });
            });
        });

        it('should call insertTimePeriod', async () => {
            await createTimePeriodResolver(root, args);

            expect(insertTimePeriod).toHaveBeenCalledTimes(1);
            expect(insertTimePeriod).toHaveBeenCalledWith(expectedCreateTimePeriod);
        });

        it('should return the input', async () => {
            const actualResponse = await createTimePeriodResolver(root, args);

            expect(actualResponse).toEqual(expectedCreateTimePeriod);
        });
    });

    describe('deleteTimePeriodResolver', () => {
        let root,
            args;

        beforeEach(() => {
            root = {
                [chance.string()]: chance.string()
            };
            args = {
                timePeriodId: chance.string(),
                userId: chance.string()
            };
        });

        it('should call deleteTimePeriod', async () => {
            const actualResponse = await deleteTimePeriodResolver(root, args);

            expect(deleteTimePeriod).toHaveBeenCalledTimes(1);
            expect(deleteTimePeriod).toHaveBeenCalledWith(args.userId, args.timePeriodId);
            expect(actualResponse).toEqual(args.timePeriodId);
        });
    });

    describe('updateTimePeriodResolver', () => {
        let root,
            args,
            expectedResponse,
            expectedTimePeriods,
            expectedCurrentTimePeriod;

        beforeEach(() => {
            root = {
                [chance.string()]: chance.string()
            };
            args = {
                timePeriod: createRandomTimePeriod()
            };
            expectedResponse = {
                [chance.string()]: chance.string()
            };
            expectedTimePeriods = chance.n(() => {
                const endDate = args.timePeriod.endDate - chance.natural();

                return createRandomTimePeriod({
                    beginDate: endDate - 1,
                    endDate
                });
            }, chance.d6());
            expectedCurrentTimePeriod = createRandomTimePeriod({timePeriodId: args.timePeriod.timePeriodId});

            getTimePeriodByTimePeriodId.mockResolvedValue(expectedResponse);
            getTimePeriods.mockResolvedValue([
                ...expectedTimePeriods,
                expectedCurrentTimePeriod
            ]);
        });

        it('should call insertTimePeriod', async () => {
            const actualResponse = await updateTimePeriodResolver(root, args);

            expect(insertTimePeriod).toHaveBeenCalledTimes(1);
            expect(insertTimePeriod).toHaveBeenCalledWith(args.timePeriod);
            expect(getTimePeriodByTimePeriodId).toHaveBeenCalledTimes(1);
            expect(getTimePeriodByTimePeriodId).toHaveBeenCalledWith(args.timePeriod.userId, args.timePeriod.timePeriodId);
            expect(actualResponse).toEqual(expectedResponse);
        });

        describe('validation', () => {
            it('should throw an error if there is no current time period', async () => {
                getTimePeriods.mockResolvedValue(expectedTimePeriods);

                await expect(updateTimePeriodResolver(root, args)).rejects.toThrow('Invalid time period ID');
            });

            it('should throw an error if there is a begin date and it conflicts a current time period', async () => {
                const conflictingTimePeriod = chance.pickone(expectedTimePeriods);

                args.timePeriod.beginDate = conflictingTimePeriod.beginDate + 1;

                await expect(updateTimePeriodResolver(root, args)).rejects.toThrow('Time periods cannot overlap');
            });

            it('should throw an error if there is an end date and it conflicts a current time period', async () => {
                const conflictingTimePeriod = chance.pickone(expectedTimePeriods);

                args.timePeriod = {
                    ...args.timePeriod,
                    beginDate: null,
                    endDate: conflictingTimePeriod.endDate - 1
                };

                await expect(updateTimePeriodResolver(root, args)).rejects.toThrow('Time periods cannot overlap');
            });

            it('should throw an error if there is only a begin date and it is after the current end date', async () => {
                args.timePeriod = {
                    ...args.timePeriod,
                    beginDate: expectedCurrentTimePeriod.endDate + 1,
                    endDate: null
                };

                await expect(updateTimePeriodResolver(root, args)).rejects.toThrow('End date must be after begin date');
            });

            it('should throw an error if there is only an end date and it is before the current beginDate date', async () => {
                args.timePeriod = {
                    ...args.timePeriod,
                    beginDate: null,
                    endDate: expectedCurrentTimePeriod.beginDate - 1
                };

                await expect(updateTimePeriodResolver(root, args)).rejects.toThrow('End date must be after begin date');
            });

            it('should throw an error if there is both dates and the end date is before the begin date', async () => {
                args.timePeriod = {
                    ...args.timePeriod,
                    endDate: args.timePeriod.beginDate - 1
                };

                await expect(updateTimePeriodResolver(root, args)).rejects.toThrow('End date must be after begin date');
            });
        });
    });

    describe('getTimePeriodsResolver', () => {
        let expectedTimePeriods;

        beforeEach(() => {
            expectedTimePeriods = chance.n(createRandomTimePeriod, chance.d6());

            args.userId = chance.guid();

            getTimePeriods.mockReturnValue(expectedTimePeriods);
            getTimePeriodsByDate.mockReturnValue(expectedTimePeriods);
        });

        describe('when there is no date', () => {
            it('should call getTimePeriods', async () => {
                await getTimePeriodsResolver(root, args);

                expect(getTimePeriods).toHaveBeenCalledTimes(1);
                expect(getTimePeriods).toHaveBeenCalledWith(args.userId);
            });

            it('should return the time periods', async () => {
                const actualResponse = await getTimePeriodsResolver(root, args);

                expect(actualResponse).toEqual(expectedTimePeriods);
            });
        });

        describe('when there is a date', () => {
            beforeEach(() => {
                args.date = chance.string();
            });

            it('should call getTimePeriodsByDate', async () => {
                await getTimePeriodsResolver(root, args);

                expect(getTimePeriodsByDate).toHaveBeenCalledTimes(1);
                expect(getTimePeriodsByDate).toHaveBeenCalledWith(args.userId, args.date);
            });

            it('should return the time periods', async () => {
                const actualTimePeriods = await getTimePeriodsResolver(root, args);

                expect(actualTimePeriods).toEqual(expectedTimePeriods);
            });
        });
    });
});
