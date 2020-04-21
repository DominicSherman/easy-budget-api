import {deleteFirestoreData, getFirestoreData, IWhereObject, setFirestoreData} from '../adapters/firestore-adapter';
import {getDataFromQuerySnapshot} from '../helpers/repository-helpers';
import {CreateTimePeriod, TimePeriod, UpdateTimePeriod} from '../generated/graphql';

const COLLECTION_NAME = 'timePeriods';

export const insertTimePeriod = (timePeriodInput: CreateTimePeriod | UpdateTimePeriod): Promise<FirebaseFirestore.WriteResult> =>
    setFirestoreData(timePeriodInput.userId, COLLECTION_NAME, timePeriodInput.timePeriodId, timePeriodInput);

export const deleteTimePeriod = (userId: string, timePeriodId: string): Promise<FirebaseFirestore.WriteResult> =>
    deleteFirestoreData(userId, COLLECTION_NAME, timePeriodId);

export const getTimePeriods = async (userId: string, where?: IWhereObject): Promise<TimePeriod[]> => {
    const querySnapshot = await getFirestoreData(userId, COLLECTION_NAME, where);

    return getDataFromQuerySnapshot(querySnapshot);
};

export const getTimePeriodByTimePeriodId = async (userId: string, timePeriodId: string): Promise<TimePeriod> => {
    const where: IWhereObject = {
        field: 'timePeriodId',
        operator: '==',
        value: timePeriodId
    };
    const timePeriods = await getTimePeriods(userId, where);

    return timePeriods[0];
};

export const getTimePeriodsByDate = async (userId: string, date: string): Promise<TimePeriod[]> => {
    const timePeriods = await getTimePeriods(userId);

    return timePeriods.filter((timePeriod) => timePeriod.beginDate <= date && timePeriod.endDate > date);
};
