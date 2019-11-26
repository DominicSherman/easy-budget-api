import {getTimePeriods, getTimePeriodsByDate, insertTimePeriod} from '../repositories/time-period-repository';
import {MutationCreateTimePeriodArgs, QueryTimePeriodsArgs, TimePeriod} from '../generated/graphql';

export const createTimePeriodResolver = async (root: any, args: MutationCreateTimePeriodArgs): Promise<TimePeriod> => {
    const {timePeriod} = args;

    await insertTimePeriod(timePeriod);

    return timePeriod;
};

export const getTimePeriodsResolver = (root: any, args: QueryTimePeriodsArgs): Promise<TimePeriod[]> => {
    const {userId, where} = args;

    if (where) {
        return getTimePeriodsByDate(userId, where.beginDate, where.endDate);
    }

    return getTimePeriods(userId);
};
