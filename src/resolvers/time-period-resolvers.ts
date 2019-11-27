import {getTimePeriods, getTimePeriodsByDate, insertTimePeriod} from '../repositories/time-period-repository';
import {CreateTimePeriod, MutationCreateTimePeriodArgs, QueryTimePeriodsArgs, TimePeriod} from '../generated/graphql';

export const createTimePeriodResolver = async (root: any, args: MutationCreateTimePeriodArgs): Promise<CreateTimePeriod> => {
    const {timePeriod} = args;

    await insertTimePeriod(timePeriod);

    return timePeriod;
};

export const getTimePeriodsResolver = (root: any, args: QueryTimePeriodsArgs): Promise<TimePeriod[]> => {
    const {userId, date} = args;

    if (date) {
        return getTimePeriodsByDate(userId, date);
    }

    return getTimePeriods(userId);
};
