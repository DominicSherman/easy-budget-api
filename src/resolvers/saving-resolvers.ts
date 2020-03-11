import {
    CreateSaving,
    MutationCreateSavingArgs,
    MutationDeleteSavingArgs,
    MutationUpdateSavingArgs,
    QuerySavingArgs,
    QuerySavingsArgs,
    Saving
} from '../generated/graphql';
import {getPropertyFromArgsOrRoot} from '../helpers/resolver-helpers';
import {
    deleteSaving,
    getSavingBySavingId,
    getSavings,
    getSavingsByVariableCategoryId,
    insertSaving
} from '../repositories/saving-repository';

export const createSavingResolver = async (root: any, args: MutationCreateSavingArgs): Promise<CreateSaving> => {
    const {saving} = args;

    await insertSaving(saving);

    return saving;
};

export const updateSavingResolver = async (root: any, args: MutationUpdateSavingArgs): Promise<Saving> => {
    const {saving} = args;

    await insertSaving(saving);

    return getSavingBySavingId(saving.userId, saving.savingId);
};

export const deleteSavingResolver = async (root: any, args: MutationDeleteSavingArgs): Promise<string> => {
    const {userId, savingId} = args;

    await deleteSaving(userId, savingId);

    return savingId;
};

export const getSavingsResolver = (root: any, args: QuerySavingsArgs): Promise<Saving[]> => {
    const userId = getPropertyFromArgsOrRoot(root, args, 'userId');
    const variableCategoryId = getPropertyFromArgsOrRoot(root, args, 'variableCategoryId');

    if (variableCategoryId) {
        return getSavingsByVariableCategoryId(userId, variableCategoryId);
    }

    return getSavings(userId);
};

export const getSavingResolver = (root, args: QuerySavingArgs): Promise<Saving> => {
    const userId = getPropertyFromArgsOrRoot(root, args, 'userId');
    const savingId = getPropertyFromArgsOrRoot(root, args, 'savingId');

    return getSavingBySavingId(userId, savingId);
};
