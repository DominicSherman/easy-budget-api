import {getTimePeriods, getTimePeriodsByDate, insertTimePeriod} from '../repositories/time-period-repository';

export const createTimePeriodResolver = async (root: any, args: any): Promise<any> => {
    const {timePeriod} = args;

    await insertTimePeriod(timePeriod);

    return timePeriod;
};

export const getTimePeriodsResolver = (root: any, args: any): Promise<any> => {
    const {userId, where} = args;

    if (where) {
        return getTimePeriodsByDate(userId, where.beginDate, where.endDate);
    }

    return getTimePeriods(userId);
};
