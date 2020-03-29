import * as firestoreAdapter from '../../src/adapters/firestore-adapter';
import * as repositoryHelpers from '../../src/helpers/repository-helpers';
import {
    deleteIncomeItem,
    getIncomeItemByIncomeItemId,
    getIncomeItems,
    getIncomeItemsByTimePeriodId,
    insertIncomeItem
} from '../../src/repositories/income-item-repository';
import {createRandomIncomeItem} from '../model-factory';

const Chance = require('chance');

const chance = new Chance();

jest.mock('../../src/adapters/firestore-adapter');
jest.mock('../../src/helpers/repository-helpers');

describe('income item repository', () => {
    const {getFirestoreData, setFirestoreData, deleteFirestoreData} = firestoreAdapter as jest.Mocked<typeof firestoreAdapter>;
    const {getDataFromQuerySnapshot} = repositoryHelpers as jest.Mocked<typeof repositoryHelpers>;

    let expectedUserId;

    beforeEach(() => {
        expectedUserId = chance.string();
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    describe('insertIncomeItem', () => {
        let expectedResponse,
            expectedIncomeItem;

        beforeEach(() => {
            expectedResponse = {
                [chance.string()]: chance.string()
            };
            expectedIncomeItem = createRandomIncomeItem();

            setFirestoreData.mockReturnValue(expectedResponse);
        });

        it('should call setFirestoreData', () => {
            insertIncomeItem(expectedIncomeItem);

            expect(setFirestoreData).toHaveBeenCalledTimes(1);
            expect(setFirestoreData).toHaveBeenCalledWith(
                expectedIncomeItem.userId,
                'incomeItems',
                expectedIncomeItem.incomeItemId,
                expectedIncomeItem
            );
        });
    });

    describe('deleteIncomeItem', () => {
        let expectedResponse,
            expectedIncomeItem;

        beforeEach(() => {
            expectedResponse = {
                [chance.string()]: chance.string()
            };
            expectedIncomeItem = createRandomIncomeItem();

            setFirestoreData.mockReturnValue(expectedResponse);
        });

        it('should call deleteFirestoreData', () => {
            deleteIncomeItem(expectedIncomeItem.userId, expectedIncomeItem.incomeItemId);

            expect(deleteFirestoreData).toHaveBeenCalledTimes(1);
            expect(deleteFirestoreData).toHaveBeenCalledWith(
                expectedIncomeItem.userId,
                'incomeItems',
                expectedIncomeItem.incomeItemId
            );
        });
    });

    describe('getIncomeItems', () => {
        let expectedQuerySnapshot,
            expectedResponse,
            expectedWhere;

        beforeEach(() => {
            expectedQuerySnapshot = {
                [chance.string()]: chance.string()
            };
            expectedResponse = {
                [chance.string()]: chance.string()
            };
            expectedWhere = {
                [chance.string()]: chance.string()
            };

            getFirestoreData.mockReturnValue(expectedQuerySnapshot);
            getDataFromQuerySnapshot.mockReturnValue(expectedResponse);
        });

        it('should call getFirestoreData', async () => {
            await getIncomeItems(expectedUserId, expectedWhere);

            expect(getFirestoreData).toHaveBeenCalledTimes(1);
            expect(getFirestoreData).toHaveBeenCalledWith(expectedUserId, 'incomeItems', expectedWhere);
        });

        it('should call getDataFromQuerySnapshot', async () => {
            await getIncomeItems(expectedUserId);

            expect(getDataFromQuerySnapshot).toHaveBeenCalledTimes(1);
            expect(getDataFromQuerySnapshot).toHaveBeenCalledWith(expectedQuerySnapshot);
        });

        it('should return the data', async () => {
            const actualResponse = await getIncomeItems(expectedUserId);

            expect(actualResponse).toEqual(expectedResponse);
        });
    });

    describe('getIncomeItemsByTimePeriodId', () => {
        let expectedTimePeriodId;

        beforeEach(() => {
            expectedTimePeriodId = chance.guid();
        });

        it('should call getFirestoreData', async () => {
            await getIncomeItemsByTimePeriodId(expectedUserId, expectedTimePeriodId);

            expect(getFirestoreData).toHaveBeenCalledTimes(1);
            expect(getFirestoreData).toHaveBeenCalledWith(expectedUserId, 'incomeItems', {
                field: 'timePeriodId',
                operator: '==',
                value: expectedTimePeriodId
            });
        });
    });

    describe('getIncomeItemByIncomeItemId', () => {
        let expectedIncomeItemId,
            expectedIncomeItems;

        beforeEach(() => {
            expectedIncomeItemId = chance.guid();
            expectedIncomeItems = chance.n(createRandomIncomeItem, chance.d6());

            getDataFromQuerySnapshot.mockReturnValue(expectedIncomeItems);
        });

        it('should call getFirestoreData', async () => {
            await getIncomeItemByIncomeItemId(expectedUserId, expectedIncomeItemId);

            expect(getFirestoreData).toHaveBeenCalledTimes(1);
            expect(getFirestoreData).toHaveBeenCalledWith(expectedUserId, 'incomeItems', {
                field: 'incomeItemId',
                operator: '==',
                value: expectedIncomeItemId
            });
        });

        it('should return the incomeItem', async () => {
            const actualIncomeItem = await getIncomeItemByIncomeItemId(expectedUserId, expectedIncomeItemId);

            expect(actualIncomeItem).toEqual(expectedIncomeItems[0]);
        });
    });
});
