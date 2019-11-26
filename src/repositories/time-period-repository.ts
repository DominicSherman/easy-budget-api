import {getFirestoreData, setFirestoreData} from '../adapters/firestore-adapter';
import {getDataFromQuerySnapshot} from '../helpers/repository-helpers';
import {CreateTimePeriod, TimePeriod} from '../generated/graphql';

const COLLECTION_NAME = 'timePeriods';

export const insertTimePeriod = (timePeriodInput: CreateTimePeriod): Promise<FirebaseFirestore.WriteResult> =>
    setFirestoreData(timePeriodInput.userId, COLLECTION_NAME, timePeriodInput.timePeriodId, timePeriodInput);

export const getTimePeriods = async (userId: string): Promise<TimePeriod[]> => {
    const querySnapshot = await getFirestoreData(userId, COLLECTION_NAME);

    return getDataFromQuerySnapshot(querySnapshot);
};

export const getTimePeriodsByDate = async (userId: string, date: string): Promise<TimePeriod[]> => {
    const timePeriods = await getTimePeriods(userId);

    return timePeriods.filter((timePeriod) => timePeriod.beginDate <= date && timePeriod.endDate >= date);
};
