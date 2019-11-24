import {getFirestoreData, setFirestoreData} from '../adapters/firestore-adapter';
import {CreateVariableCategory, VariableCategory} from '../generated/graphql';
import {getDataFromQuerySnapshot} from '../helpers/repository-helpers';

export const insertVariableCategory = (userId: string, variableCategoryInput: CreateVariableCategory): Promise<FirebaseFirestore.WriteResult> =>
    setFirestoreData(userId, 'variableCategories', variableCategoryInput.variableCategoryId, variableCategoryInput);

export const getVariableCategories = async (userId): Promise<VariableCategory[]> => {
    const querySnapshot = await getFirestoreData(userId, 'variableCategories');

    return getDataFromQuerySnapshot(querySnapshot);
};
