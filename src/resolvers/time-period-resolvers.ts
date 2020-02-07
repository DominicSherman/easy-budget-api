import {getTimePeriods, getTimePeriodsByDate, insertTimePeriod} from '../repositories/time-period-repository';
import {CreateTimePeriod, MutationCreateTimePeriodArgs, QueryTimePeriodsArgs, TimePeriod} from '../generated/graphql';
import {
    getVariableCategoriesByTimePeriodId,
    insertVariableCategory
} from '../repositories/variable-category-repository';
import {getFixedCategoriesByTimePeriodId, insertFixedCategory} from '../repositories/fixed-category-repository';

const uuid = require('uuid');

export const createTimePeriodResolver = async (root: any, args: MutationCreateTimePeriodArgs): Promise<CreateTimePeriod> => {
    const {timePeriod} = args;

    if (timePeriod.beginDate >= timePeriod.endDate) {
        throw new Error('End date must be after begin date');
    }

    const timePeriods = await getTimePeriods(timePeriod.userId);
    let createVariableCategoryPromises = [],
        createFixedCategoryPromises = [];

    if (timePeriods.length) {
        const sortedTimePeriods = timePeriods.sort((a, b) => a.endDate > b.endDate ? -1 : 1);
        const mostRecentTimePeriod = sortedTimePeriods[0];

        const previousVariableCategories = await getVariableCategoriesByTimePeriodId(timePeriod.userId, mostRecentTimePeriod.timePeriodId);
        const previousFixedCategories = await getFixedCategoriesByTimePeriodId(timePeriod.userId, mostRecentTimePeriod.timePeriodId);

        createVariableCategoryPromises = previousVariableCategories.map((variableCategory) =>
            insertVariableCategory({
                amount: variableCategory.amount,
                name: variableCategory.name,
                timePeriodId: timePeriod.timePeriodId,
                userId: timePeriod.userId,
                variableCategoryId: uuid.v4()
            })
        );
        createFixedCategoryPromises = previousFixedCategories.map((fixedCategory) =>
            insertFixedCategory({
                amount: fixedCategory.amount,
                fixedCategoryId: uuid.v4(),
                name: fixedCategory.name,
                paid: false,
                timePeriodId: timePeriod.timePeriodId,
                userId: timePeriod.userId
            })
        );
    }

    await Promise.all([
        ...createVariableCategoryPromises,
        ...createFixedCategoryPromises,
        insertTimePeriod(timePeriod)
    ]);

    return timePeriod;
};

export const getTimePeriodsResolver = (root: any, args: QueryTimePeriodsArgs): Promise<TimePeriod[]> => {
    const {userId, date} = args;

    if (date) {
        return getTimePeriodsByDate(userId, date);
    }

    return getTimePeriods(userId);
};
