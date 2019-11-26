import {getFirestoreData, setFirestoreData} from '../adapters/firestore-adapter';
import {CreateVariableCategory, VariableCategory} from '../generated/graphql';
import {getDataFromQuerySnapshot} from '../helpers/repository-helpers';

const COLLECTION_NAME = 'variableCategories';

export const insertVariableCategory = (variableCategoryInput: CreateVariableCategory): Promise<FirebaseFirestore.WriteResult> =>
    setFirestoreData(variableCategoryInput.userId, COLLECTION_NAME, variableCategoryInput.variableCategoryId, variableCategoryInput);

export const getVariableCategories = async (userId: string): Promise<VariableCategory[]> => {
    const querySnapshot = await getFirestoreData(userId, COLLECTION_NAME);

    return getDataFromQuerySnapshot(querySnapshot);
};
