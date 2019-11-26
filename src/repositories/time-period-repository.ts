import {getFirestoreData, IWhereObject, setFirestoreData} from '../adapters/firestore-adapter';
import {getDataFromQuerySnapshot} from '../helpers/repository-helpers';

const COLLECTION_NAME = 'timePeriods';

export const getTimePeriods = async (userId: string, where?: IWhereObject, where2?: IWhereObject): Promise<any> => {
    const querySnapshot = await getFirestoreData(userId, COLLECTION_NAME, where, where2);

    return getDataFromQuerySnapshot(querySnapshot);
};

export const getTimePeriodsByDate = (userId: string, beginDate: string, endDate: string): Promise<any> => {
    const where: IWhereObject = {
        field: 'beginDate',
        operator: '>=',
        value: beginDate
    };
    const where2: IWhereObject = {
        field: 'endDate',
        operator: '<=',
        value: endDate
    };

    return getTimePeriods(userId, where, where2);
};

export const insertTimePeriod = (timePeriodInput: any): Promise<FirebaseFirestore.WriteResult> =>
    setFirestoreData(timePeriodInput.userId, COLLECTION_NAME, timePeriodInput.timePeriodId, timePeriodInput);
