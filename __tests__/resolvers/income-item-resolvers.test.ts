import {chance} from '../chance';
import {createRandomIncomeItem} from '../model-factory';
import * as incomeItemRepository from '../../src/repositories/income-item-repository';
import {
    createIncomeItemResolver,
    deleteIncomeItemResolver,
    getIncomeItemResolver,
    getIncomeItemsResolver,
    updateIncomeItemResolver
} from '../../src/resolvers/income-item-resolvers';
import * as resolverHelpers from '../../src/helpers/resolver-helpers';

jest.mock('../../src/repositories/income-item-repository');
jest.mock('../../src/helpers/resolver-helpers');

describe('income item resolvers', () => {
    const {
        getIncomeItemsByTimePeriodId,
        getIncomeItems,
        insertIncomeItem,
        getIncomeItemByIncomeItemId,
        deleteIncomeItem
    } = incomeItemRepository as jest.Mocked<typeof incomeItemRepository>;
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

    describe('createIncomeItemResolver', () => {
        let expectedCreateIncomeItem;

        beforeEach(() => {
            expectedCreateIncomeItem = createRandomIncomeItem();

            args = {
                incomeItem: expectedCreateIncomeItem
            };
        });

        it('should call insertIncomeItem', async () => {
            await createIncomeItemResolver(root, args);

            expect(insertIncomeItem).toHaveBeenCalledTimes(1);
            expect(insertIncomeItem).toHaveBeenCalledWith(expectedCreateIncomeItem);
        });

        it('should return the input', async () => {
            const actualResponse = await createIncomeItemResolver(root, args);

            expect(actualResponse).toEqual(expectedCreateIncomeItem);
        });
    });

    describe('updateIncomeItemResolver', () => {
        let expectedUpdateIncomeItem;

        beforeEach(() => {
            expectedUpdateIncomeItem = createRandomIncomeItem();

            args = {
                incomeItem: expectedUpdateIncomeItem
            };

            getIncomeItemByIncomeItemId.mockReturnValue(expectedUpdateIncomeItem);
        });

        it('should call insertIncomeItem', async () => {
            await updateIncomeItemResolver(root, args);

            expect(insertIncomeItem).toHaveBeenCalledTimes(1);
            expect(insertIncomeItem).toHaveBeenCalledWith(expectedUpdateIncomeItem);
        });

        it('should return the input', async () => {
            const actualResponse = await updateIncomeItemResolver(root, args);

            expect(actualResponse).toEqual(expectedUpdateIncomeItem);
        });
    });

    describe('deleteIncomeItemResolver', () => {
        let expectedIncomeItem;

        beforeEach(() => {
            expectedIncomeItem = createRandomIncomeItem();

            args = {
                incomeItemId: expectedIncomeItem.incomeItemId,
                userId: expectedIncomeItem.userId
            };
        });

        it('should call deleteIncomeItem', async () => {
            await deleteIncomeItemResolver(root, args);

            expect(deleteIncomeItem).toHaveBeenCalledTimes(1);
            expect(deleteIncomeItem).toHaveBeenCalledWith(expectedIncomeItem.userId, expectedIncomeItem.incomeItemId);
        });

        it('should return the incomeItemId', async () => {
            const actualResponse = await deleteIncomeItemResolver(root, args);

            expect(actualResponse).toEqual(expectedIncomeItem.incomeItemId);
        });
    });

    describe('getIncomeItemsResolver', () => {
        let expectedIncomeItems,
            expectedUserId,
            expectedTimePeriodId;

        beforeEach(() => {
            expectedIncomeItems = chance.n(createRandomIncomeItem, chance.d6());
            expectedUserId = chance.guid();
            expectedTimePeriodId = chance.guid();

            getIncomeItems.mockReturnValue(expectedIncomeItems);
            getIncomeItemsByTimePeriodId.mockReturnValue(expectedIncomeItems);
        });

        describe('when there is a timePeriodId', () => {
            beforeEach(() => {
                getPropertyFromArgsOrRoot
                    .mockReturnValueOnce(expectedUserId)
                    .mockReturnValueOnce(expectedTimePeriodId);
            });

            it('should call getIncomeItemsByTimePeriodId', async () => {
                await getIncomeItemsResolver(root, args);

                expect(getIncomeItemsByTimePeriodId).toHaveBeenCalledTimes(1);
                expect(getIncomeItemsByTimePeriodId).toHaveBeenCalledWith(expectedUserId, expectedTimePeriodId);
            });

            it('should return the incomeItems', async () => {
                const actualIncomeItems = await getIncomeItemsResolver(root, args);

                expect(actualIncomeItems).toEqual(expectedIncomeItems);
            });
        });

        describe('when there is no timePeriodId', () => {
            beforeEach(() => {
                getPropertyFromArgsOrRoot
                    .mockReturnValueOnce(expectedUserId)
                    .mockReturnValueOnce(null);
            });

            it('should call getIncomeItems', async () => {
                await getIncomeItemsResolver(root, args);

                expect(getIncomeItems).toHaveBeenCalledTimes(1);
                expect(getIncomeItems).toHaveBeenCalledWith(expectedUserId);
            });

            it('should return the incomeItems', async () => {
                const actualResponse = await getIncomeItemsResolver(root, args);

                expect(actualResponse).toEqual(expectedIncomeItems);
            });
        });
    });

    describe('getIncomeItemResolver', () => {
        let expectedIncomeItem,
            expectedUserId,
            expectedIncomeItemId;

        beforeEach(() => {
            expectedIncomeItem = createRandomIncomeItem();
            expectedUserId = chance.guid();
            expectedIncomeItemId = chance.guid();

            getIncomeItemByIncomeItemId.mockReturnValue(expectedIncomeItem);

            getPropertyFromArgsOrRoot
                .mockReturnValueOnce(expectedUserId)
                .mockReturnValueOnce(expectedIncomeItemId);
        });

        it('should call getIncomeItemByIncomeItemId', async () => {
            await getIncomeItemResolver(root, args);

            expect(getIncomeItemByIncomeItemId).toHaveBeenCalledTimes(1);
            expect(getIncomeItemByIncomeItemId).toHaveBeenCalledWith(expectedUserId, expectedIncomeItemId);
        });

        it('should return the incomeItems', async () => {
            const actualResponse = await getIncomeItemResolver(root, args);

            expect(actualResponse).toEqual(expectedIncomeItem);
        });
    });
});
