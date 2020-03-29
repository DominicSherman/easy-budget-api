import {CreateIncomeItem, IncomeItem, UpdateIncomeItem} from '../generated/graphql';
import {deleteFirestoreData, getFirestoreData, IWhereObject, setFirestoreData} from '../adapters/firestore-adapter';
import {getDataFromQuerySnapshot} from '../helpers/repository-helpers';

const COLLECTION_NAME = 'incomeItems';

export const insertIncomeItem = (incomeItemInput: CreateIncomeItem | UpdateIncomeItem): Promise<FirebaseFirestore.WriteResult> =>
    setFirestoreData(incomeItemInput.userId, COLLECTION_NAME, incomeItemInput.incomeItemId, incomeItemInput);

export const deleteIncomeItem = (userId: string, incomeItemId: string): Promise<FirebaseFirestore.WriteResult> =>
    deleteFirestoreData(userId, COLLECTION_NAME, incomeItemId);

export const getIncomeItems = async (userId: string, where?: IWhereObject): Promise<IncomeItem[]> => {
    const querySnapshot = await getFirestoreData(userId, COLLECTION_NAME, where);

    return getDataFromQuerySnapshot(querySnapshot);
};

export const getIncomeItemsByTimePeriodId = (userId: string, timePeriodId: string): Promise<IncomeItem[]> => {
    const where: IWhereObject = {
        field: 'timePeriodId',
        operator: '==',
        value: timePeriodId
    };

    return getIncomeItems(userId, where);
};

export const getIncomeItemByIncomeItemId = async (userId: string, incomeItemId: string): Promise<IncomeItem> => {
    const where: IWhereObject = {
        field: 'incomeItemId',
        operator: '==',
        value: incomeItemId
    };
    const incomeItems = await getIncomeItems(userId, where);

    return incomeItems[0];
};
