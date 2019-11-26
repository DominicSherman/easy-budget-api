import {chance} from '../chance';
import {createRandomTimePeriod} from '../model-factory';
import * as timePeriodRepository from '../../src/repositories/time-period-repository';
import {createTimePeriodResolver, getTimePeriodsResolver} from '../../src/resolvers/time-period-resolvers';

jest.mock('../../src/repositories/time-period-repository');

describe('variable category resolvers', () => {
    const {getTimePeriods, insertTimePeriod, getTimePeriodsByDate} = timePeriodRepository as jest.Mocked<typeof timePeriodRepository>;

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

    describe('createTimePeriodResolver', () => {
        let expectedCreateTimePeriod;

        beforeEach(() => {
            expectedCreateTimePeriod = createRandomTimePeriod();

            args = {
                timePeriod: expectedCreateTimePeriod
            };
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
