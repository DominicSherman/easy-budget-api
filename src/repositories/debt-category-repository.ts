import {deleteFirestoreData, getFirestoreData, IWhereObject, setFirestoreData} from '../adapters/firestore-adapter';
import {CreateDebtCategory, UpdateDebtCategory, DebtCategory} from '../generated/graphql';
import {getDataFromQuerySnapshot} from '../helpers/repository-helpers';

const COLLECTION_NAME = 'debtCategories';

export const insertDebtCategory = (debtCategoryInput: CreateDebtCategory | UpdateDebtCategory): Promise<FirebaseFirestore.WriteResult> =>
    setFirestoreData(debtCategoryInput.userId, COLLECTION_NAME, debtCategoryInput.debtCategoryId, debtCategoryInput);

export const deleteDebtCategory = (userId: string, debtCategoryId: string): Promise<FirebaseFirestore.WriteResult> =>
    deleteFirestoreData(userId, COLLECTION_NAME, debtCategoryId);

export const getDebtCategories = async (userId: string, where?: IWhereObject): Promise<DebtCategory[]> => {
    const querySnapshot = await getFirestoreData(userId, COLLECTION_NAME, where);

    return getDataFromQuerySnapshot(querySnapshot);
};

export const getDebtCategoryByDebtCategoryId = async (userId: string, debtCategoryId: string): Promise<DebtCategory> => {
    const where: IWhereObject = {
        field: 'debtCategoryId',
        operator: '==',
        value: debtCategoryId
    };
    const debtCategories = await getDebtCategories(userId, where);

    return debtCategories[0];
};
