import {chance} from '../chance';
import {createRandomFixedCategory, createRandomTimePeriod, createRandomVariableCategory} from '../model-factory';
import * as timePeriodRepository from '../../src/repositories/time-period-repository';
import {createTimePeriodResolver, getTimePeriodsResolver} from '../../src/resolvers/time-period-resolvers';
import * as variableCategoryRepository from '../../src/repositories/variable-category-repository';
import * as fixedCategoryRepository from '../../src/repositories/fixed-category-repository';

jest.mock('../../src/repositories/time-period-repository');
jest.mock('../../src/repositories/variable-category-repository');
jest.mock('../../src/repositories/fixed-category-repository');

describe('variable category resolvers', () => {
    const {getTimePeriods, insertTimePeriod, getTimePeriodsByDate} = timePeriodRepository as jest.Mocked<typeof timePeriodRepository>;
    const {getVariableCategoriesByTimePeriodId, insertVariableCategory} = variableCategoryRepository as jest.Mocked<typeof variableCategoryRepository>;
    const {getFixedCategoriesByTimePeriodId, insertFixedCategory} = fixedCategoryRepository as jest.Mocked<typeof fixedCategoryRepository>;

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
            expectedPreviousFixedCategories;

        beforeEach(() => {
            expectedCreateTimePeriod = createRandomTimePeriod();

            args = {
                timePeriod: expectedCreateTimePeriod
            };

            expectedMostRecentTimePeriod = createRandomTimePeriod({
                endDate: expectedCreateTimePeriod.beginDate - 1
            });
            expectedTimePeriods = [
                createRandomTimePeriod({endDate: expectedMostRecentTimePeriod.endDate - 2}),
                expectedMostRecentTimePeriod,
                createRandomTimePeriod({endDate: expectedMostRecentTimePeriod.endDate - 1})
            ];
            expectedPreviousVariableCategories = chance.n(createRandomVariableCategory, chance.d6());
            expectedPreviousFixedCategories = chance.n(createRandomFixedCategory, chance.d6());

            getTimePeriods.mockReturnValue(expectedTimePeriods);
            getVariableCategoriesByTimePeriodId.mockReturnValue(expectedPreviousVariableCategories);
            getFixedCategoriesByTimePeriodId.mockReturnValue(expectedPreviousFixedCategories);
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

        it('should throw an error if mostRecentTimePeriod.endDate is greater than beginDate', async () => {
            expectedCreateTimePeriod.beginDate = expectedMostRecentTimePeriod.endDate - 1;
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
                    userId: expectedCreateTimePeriod.userId,
                    variableCategoryId: expect.any(String)
                });
            });
        });

        it('should call insertFixedCategory for all of the previous variable categories', async () => {
            await createTimePeriodResolver(root, args);

            expect(insertFixedCategory).toHaveBeenCalledTimes(expectedPreviousFixedCategories.length);
            expectedPreviousFixedCategories.forEach((variableCategory) => {
                expect(insertFixedCategory).toHaveBeenCalledWith({
                    ...variableCategory,
                    fixedCategoryId: expect.any(String),
                    paid: false,
                    timePeriodId: expectedCreateTimePeriod.timePeriodId,
                    userId: expectedCreateTimePeriod.userId
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
