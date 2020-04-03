import {getTimePeriods, getTimePeriodsByDate, insertTimePeriod} from '../repositories/time-period-repository';
import {CreateTimePeriod, MutationCreateTimePeriodArgs, QueryTimePeriodsArgs, TimePeriod} from '../generated/graphql';
import {
    getVariableCategoriesByTimePeriodId,
    insertVariableCategory
} from '../repositories/variable-category-repository';
import {getFixedCategoriesByTimePeriodId, insertFixedCategory} from '../repositories/fixed-category-repository';
import {getIncomeItemsByTimePeriodId, insertIncomeItem} from '../repositories/income-item-repository';

const uuid = require('uuid');

export const createTimePeriodResolver = async (root: any, args: MutationCreateTimePeriodArgs): Promise<CreateTimePeriod> => {
    const {timePeriod} = args;

    if (timePeriod.beginDate >= timePeriod.endDate) {
        throw new Error('End date must be after begin date');
    }

    const timePeriods = await getTimePeriods(timePeriod.userId);
    let createVariableCategoryPromises = [],
        createFixedCategoryPromises = [],
        createIncomeItemPromises = [];

    if (timePeriods.length) {
        const sortedTimePeriods = timePeriods.sort((a, b) => a.endDate > b.endDate ? -1 : 1);
        const mostRecentTimePeriod = sortedTimePeriods[0];

        if (mostRecentTimePeriod.endDate > timePeriod.beginDate) {
            throw new Error('Time periods cannot overlap');
        }

        const [previousVariableCategories, previousFixedCategories, previousIncomeItems] = await Promise.all([
            getVariableCategoriesByTimePeriodId(timePeriod.userId, mostRecentTimePeriod.timePeriodId),
            getFixedCategoriesByTimePeriodId(timePeriod.userId, mostRecentTimePeriod.timePeriodId),
            getIncomeItemsByTimePeriodId(timePeriod.userId, mostRecentTimePeriod.timePeriodId)
        ]);

        createVariableCategoryPromises = previousVariableCategories.map((variableCategory) =>
            insertVariableCategory({
                ...variableCategory,
                timePeriodId: timePeriod.timePeriodId,
                variableCategoryId: uuid.v4()
            })
        );
        createFixedCategoryPromises = previousFixedCategories.map((fixedCategory) =>
            insertFixedCategory({
                ...fixedCategory,
                fixedCategoryId: uuid.v4(),
                paid: false,
                timePeriodId: timePeriod.timePeriodId
            })
        );
        createIncomeItemPromises = previousIncomeItems.filter((incomeItem) => incomeItem.recurring).map((incomeItem) =>
            insertIncomeItem({
                ...incomeItem,
                incomeItemId: uuid.v4(),
                timePeriodId: timePeriod.timePeriodId
            })
        );
    }

    await Promise.all([
        ...createVariableCategoryPromises,
        ...createFixedCategoryPromises,
        ...createIncomeItemPromises,
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
