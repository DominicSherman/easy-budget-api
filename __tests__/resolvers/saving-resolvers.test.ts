import {chance} from '../chance';
import {createRandomSaving} from '../model-factory';
import * as savingRepository from '../../src/repositories/saving-repository';
import {
    createSavingResolver,
    deleteSavingResolver,
    getSavingResolver,
    getSavingsResolver,
    updateSavingResolver
} from '../../src/resolvers/saving-resolvers';
import * as resolverHelpers from '../../src/helpers/resolver-helpers';

jest.mock('../../src/repositories/saving-repository');
jest.mock('../../src/helpers/resolver-helpers');

describe('variable category resolvers', () => {
    const {
        getSavingsByVariableCategoryId,
        getSavings,
        insertSaving,
        getSavingBySavingId,
        deleteSaving
    } = savingRepository as jest.Mocked<typeof savingRepository>;
    const {getPropertyFromArgsOrRoot} = resolverHelpers as jest.Mocked<typeof resolverHelpers>;

    let root,
        args;

    beforeEach(() => {
        root = {
            [chance.string()]: chance.string()
        };
        args = {
            [chance.string()]: chance.string()
        };
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    describe('createSavingResolver', () => {
        let expectedCreateSaving;

        beforeEach(() => {
            expectedCreateSaving = createRandomSaving();

            args = {
                saving: expectedCreateSaving
            };
        });

        it('should call insertSaving', async () => {
            await createSavingResolver(root, args);

            expect(insertSaving).toHaveBeenCalledTimes(1);
            expect(insertSaving).toHaveBeenCalledWith(expectedCreateSaving);
        });

        it('should return the input', async () => {
            const actualResponse = await createSavingResolver(root, args);

            expect(actualResponse).toEqual(expectedCreateSaving);
        });
    });

    describe('updateSavingResolver', () => {
        let expectedUpdateSaving;

        beforeEach(() => {
            expectedUpdateSaving = createRandomSaving();

            args = {
                saving: expectedUpdateSaving
            };

            getSavingBySavingId.mockReturnValue(expectedUpdateSaving);
        });

        it('should call insertSaving', async () => {
            await updateSavingResolver(root, args);

            expect(insertSaving).toHaveBeenCalledTimes(1);
            expect(insertSaving).toHaveBeenCalledWith(expectedUpdateSaving);
        });

        it('should return the input', async () => {
            const actualResponse = await updateSavingResolver(root, args);

            expect(actualResponse).toEqual(expectedUpdateSaving);
        });
    });

    describe('deleteSavingResolver', () => {
        let expectedSaving;

        beforeEach(() => {
            expectedSaving = createRandomSaving();

            args = {
                savingId: expectedSaving.savingId,
                userId: expectedSaving.userId
            };
        });

        it('should call deleteSaving', async () => {
            await deleteSavingResolver(root, args);

            expect(deleteSaving).toHaveBeenCalledTimes(1);
            expect(deleteSaving).toHaveBeenCalledWith(expectedSaving.userId, expectedSaving.savingId);
        });

        it('should return the savingId', async () => {
            const actualResponse = await deleteSavingResolver(root, args);

            expect(actualResponse).toEqual(expectedSaving.savingId);
        });
    });

    describe('getSavingsResolver', () => {
        let expectedSavings,
            expectedUserId,
            expectedVariableCategoryId;

        beforeEach(() => {
            expectedSavings = chance.n(createRandomSaving, chance.d6());
            expectedUserId = chance.guid();
            expectedVariableCategoryId = chance.guid();

            getSavings.mockReturnValue(expectedSavings);
            getSavingsByVariableCategoryId.mockReturnValue(expectedSavings);
        });

        describe('when there is no variableCategoryId', () => {
            beforeEach(() => {
                getPropertyFromArgsOrRoot
                    .mockReturnValueOnce(expectedUserId)
                    .mockReturnValueOnce(null);
            });

            it('should call getSavings', async () => {
                await getSavingsResolver(root, args);

                expect(getSavings).toHaveBeenCalledTimes(1);
                expect(getSavings).toHaveBeenCalledWith(expectedUserId);
            });

            it('should return the savings', async () => {
                const actualResponse = await getSavingsResolver(root, args);

                expect(actualResponse).toEqual(expectedSavings);
            });
        });

        describe('when there is a variableCategoryId', () => {
            beforeEach(() => {
                getPropertyFromArgsOrRoot
                    .mockReturnValueOnce(expectedUserId)
                    .mockReturnValueOnce(expectedVariableCategoryId);
            });

            it('should call getSavingsByVariableCategoryId', async () => {
                await getSavingsResolver(root, args);

                expect(getSavingsByVariableCategoryId).toHaveBeenCalledTimes(1);
                expect(getSavingsByVariableCategoryId).toHaveBeenCalledWith(expectedUserId, expectedVariableCategoryId);
            });

            it('should return the savings', async () => {
                const actualSavings = await getSavingsResolver(root, args);

                expect(actualSavings).toEqual(expectedSavings);
            });
        });
    });

    describe('getSavingResolver', () => {
        let expectedSaving,
            expectedUserId,
            expectedSavingId;

        beforeEach(() => {
            expectedSaving = createRandomSaving();
            expectedUserId = chance.guid();
            expectedSavingId = chance.guid();

            getSavingBySavingId.mockReturnValue(expectedSaving);

            getPropertyFromArgsOrRoot
                .mockReturnValueOnce(expectedUserId)
                .mockReturnValueOnce(expectedSavingId);
        });

        it('should call getSavingBySavingId', async () => {
            await getSavingResolver(root, args);

            expect(getSavingBySavingId).toHaveBeenCalledTimes(1);
            expect(getSavingBySavingId).toHaveBeenCalledWith(expectedUserId, expectedSavingId);
        });

        it('should return the savings', async () => {
            const actualResponse = await getSavingResolver(root, args);

            expect(actualResponse).toEqual(expectedSaving);
        });
    });
});
