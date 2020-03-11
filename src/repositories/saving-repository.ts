import {CreateSaving, Saving, UpdateSaving} from '../generated/graphql';
import {deleteFirestoreData, getFirestoreData, IWhereObject, setFirestoreData} from '../adapters/firestore-adapter';
import {getDataFromQuerySnapshot} from '../helpers/repository-helpers';

const COLLECTION_NAME = 'savings';

export const insertSaving = (savingInput: CreateSaving | UpdateSaving): Promise<FirebaseFirestore.WriteResult> =>
    setFirestoreData(savingInput.userId, COLLECTION_NAME, savingInput.savingId, savingInput);

export const deleteSaving = (userId: string, savingId: string): Promise<FirebaseFirestore.WriteResult> =>
    deleteFirestoreData(userId, COLLECTION_NAME, savingId);

export const getSavings = async (userId: string, where?: IWhereObject): Promise<Saving[]> => {
    const querySnapshot = await getFirestoreData(userId, COLLECTION_NAME, where);

    return getDataFromQuerySnapshot(querySnapshot);
};

export const getSavingsByVariableCategoryId = (userId: string, variableCategoryId: string): Promise<Saving[]> => {
    const where: IWhereObject = {
        field: 'variableCategoryId',
        operator: '==',
        value: variableCategoryId
    };

    return getSavings(userId, where);
};

export const getSavingBySavingId = async (userId: string, savingId: string): Promise<Saving> => {
    const where: IWhereObject = {
        field: 'savingId',
        operator: '==',
        value: savingId
    };
    const savings = await getSavings(userId, where);

    return savings[0];
};
