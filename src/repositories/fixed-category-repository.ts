import {getFirestoreData, IWhereObject, setFirestoreData} from '../adapters/firestore-adapter';
import {getDataFromQuerySnapshot} from '../helpers/repository-helpers';
import {CreateFixedCategory, FixedCategory} from '../generated/graphql';

const COLLECTION_NAME = 'fixedCategories';

export const insertFixedCategory = (fixedCategoryInput: CreateFixedCategory): Promise<FirebaseFirestore.WriteResult> =>
    setFirestoreData(fixedCategoryInput.userId, COLLECTION_NAME, fixedCategoryInput.fixedCategoryId, fixedCategoryInput);

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
