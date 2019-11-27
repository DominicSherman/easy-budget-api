import {deleteFirestoreData, getFirestoreData, IWhereObject, setFirestoreData} from '../adapters/firestore-adapter';
import {CreateVariableCategory, VariableCategory} from '../generated/graphql';
import {getDataFromQuerySnapshot} from '../helpers/repository-helpers';

const COLLECTION_NAME = 'variableCategories';

export const insertVariableCategory = (variableCategoryInput: CreateVariableCategory): Promise<FirebaseFirestore.WriteResult> =>
    setFirestoreData(variableCategoryInput.userId, COLLECTION_NAME, variableCategoryInput.variableCategoryId, variableCategoryInput);

export const deleteVariableCategory = (userId: string, variableCategoryId: string): Promise<FirebaseFirestore.WriteResult> =>
    deleteFirestoreData(userId, COLLECTION_NAME, variableCategoryId);

export const getVariableCategories = async (userId: string, where?: IWhereObject): Promise<VariableCategory[]> => {
    const querySnapshot = await getFirestoreData(userId, COLLECTION_NAME, where);

    return getDataFromQuerySnapshot(querySnapshot);
};

export const getVariableCategoriesByTimePeriodId = (userId: string, timePeriodId: string): Promise<VariableCategory[]> => {
    const where: IWhereObject = {
        field: 'timePeriodId',
        operator: '==',
        value: timePeriodId
    };

    return getVariableCategories(userId, where);
};
