import {deleteFirestoreData, getFirestoreData, IWhereObject, setFirestoreData} from '../adapters/firestore-adapter';
import {getDataFromQuerySnapshot} from '../helpers/repository-helpers';
import {CreateFixedCategory, FixedCategory, UpdateFixedCategory} from '../generated/graphql';

const COLLECTION_NAME = 'fixedCategories';

export const insertFixedCategory = (fixedCategoryInput: CreateFixedCategory | UpdateFixedCategory): Promise<FirebaseFirestore.WriteResult> =>
    setFirestoreData(fixedCategoryInput.userId, COLLECTION_NAME, fixedCategoryInput.fixedCategoryId, fixedCategoryInput);

export const deleteFixedCategory = (userId: string, fixedCategoryId: string): Promise<FirebaseFirestore.WriteResult> =>
    deleteFirestoreData(userId, COLLECTION_NAME, fixedCategoryId);

export const getFixedCategories = async (userId: string, where?: IWhereObject): Promise<FixedCategory[]> => {
    const querySnapshot = await getFirestoreData(userId, COLLECTION_NAME, where);

    return getDataFromQuerySnapshot(querySnapshot);
};

export const getFixedCategoriesByTimePeriodId = (userId: string, timePeriodId: string): Promise<FixedCategory[]> => {
    const where: IWhereObject = {
        field: 'timePeriodId',
        operator: '==',
        value: timePeriodId
    };

    return getFixedCategories(userId, where);
};

export const getFixedCategoryByFixedCategoryId = async (userId: string, fixedCategoryId: string): Promise<FixedCategory> => {
    const where: IWhereObject = {
        field: 'fixedCategoryId',
        operator: '==',
        value: fixedCategoryId
    };
    const fixedCategories = await getFixedCategories(userId, where);

    return fixedCategories[0];
};
