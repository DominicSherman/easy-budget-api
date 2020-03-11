import {deleteFirestoreData, getFirestoreData, IWhereObject, setFirestoreData} from '../adapters/firestore-adapter';
import {CreateSavingCategory, UpdateSavingCategory, SavingCategory} from '../generated/graphql';
import {getDataFromQuerySnapshot} from '../helpers/repository-helpers';

const COLLECTION_NAME = 'savingCategories';

export const insertSavingCategory = (savingCategoryInput: CreateSavingCategory | UpdateSavingCategory): Promise<FirebaseFirestore.WriteResult> =>
    setFirestoreData(savingCategoryInput.userId, COLLECTION_NAME, savingCategoryInput.savingCategoryId, savingCategoryInput);

export const deleteSavingCategory = (userId: string, savingCategoryId: string): Promise<FirebaseFirestore.WriteResult> =>
    deleteFirestoreData(userId, COLLECTION_NAME, savingCategoryId);

export const getSavingCategories = async (userId: string, where?: IWhereObject): Promise<SavingCategory[]> => {
    const querySnapshot = await getFirestoreData(userId, COLLECTION_NAME, where);

    return getDataFromQuerySnapshot(querySnapshot);
};

export const getSavingCategoryBySavingCategoryId = async (userId: string, savingCategoryId: string): Promise<SavingCategory> => {
    const where: IWhereObject = {
        field: 'savingCategoryId',
        operator: '==',
        value: savingCategoryId
    };
    const savingCategories = await getSavingCategories(userId, where);

    return savingCategories[0];
};
