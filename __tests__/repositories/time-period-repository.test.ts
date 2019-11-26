import * as firestoreAdapter from '../../src/adapters/firestore-adapter';
import * as repositoryHelpers from '../../src/helpers/repository-helpers';
import {
    getTimePeriods,
    getTimePeriodsByDate,
    insertTimePeriod
} from '../../src/repositories/time-period-repository';
import {createRandomTimePeriod} from '../model-factory';
import {chance} from '../chance';

import moment = require('moment');

jest.mock('../../src/adapters/firestore-adapter');
jest.mock('../../src/helpers/repository-helpers');

describe('time period repository', () => {
    const {getFirestoreData, setFirestoreData} = firestoreAdapter as jest.Mocked<typeof firestoreAdapter>;
    const {getDataFromQuerySnapshot} = repositoryHelpers as jest.Mocked<typeof repositoryHelpers>;

    let expectedUserId;

    beforeEach(() => {
        expectedUserId = chance.string();
    });

    afterEach(() => {
        jest.resetAllMocks();
    });

    describe('insertTimePeriod', () => {
        let expectedResponse,
            expectedTimePeriod;

        beforeEach(() => {
            expectedResponse = {
                [chance.string()]: chance.string()
            };
            expectedTimePeriod = createRandomTimePeriod();

            setFirestoreData.mockReturnValue(expectedResponse);
        });

        it('should call setFirestoreData', () => {
            insertTimePeriod(expectedTimePeriod);

            expect(setFirestoreData).toHaveBeenCalledTimes(1);
            expect(setFirestoreData).toHaveBeenCalledWith(
                expectedTimePeriod.userId,
                'timePeriods',
                expectedTimePeriod.timePeriodId,
                expectedTimePeriod
            );
        });
    });

    describe('getTimePeriods', () => {
        let expectedQuerySnapshot,
            expectedResponse;

        beforeEach(() => {
            expectedQuerySnapshot = {
                [chance.string()]: chance.string()
            };
            expectedResponse = {
                [chance.string()]: chance.string()
            };

            getFirestoreData.mockReturnValue(expectedQuerySnapshot);
            getDataFromQuerySnapshot.mockReturnValue(expectedResponse);
        });

        it('should call getFirestoreData', async () => {
            await getTimePeriods(expectedUserId);

            expect(getFirestoreData).toHaveBeenCalledTimes(1);
            expect(getFirestoreData).toHaveBeenCalledWith(expectedUserId, 'timePeriods');
        });

        it('should call getDataFromQuerySnapshot', async () => {
            await getTimePeriods(expectedUserId);

            expect(getDataFromQuerySnapshot).toHaveBeenCalledTimes(1);
            expect(getDataFromQuerySnapshot).toHaveBeenCalledWith(expectedQuerySnapshot);
        });

        it('should return the data', async () => {
            const actualResponse = await getTimePeriods(expectedUserId);

            expect(actualResponse).toEqual(expectedResponse);
        });
    });

    describe('getTimePeriodsByDate', () => {
        let expectedQuerySnapshot,
            expectedActiveTimePeriod,
            expectedInactiveTimePeriods,
            expectedResponse,
            expectedDate;

        beforeEach(() => {
            expectedQuerySnapshot = {
                [chance.string()]: chance.string()
            };
            expectedActiveTimePeriod = createRandomTimePeriod({
                beginDate: moment().subtract(1, 'd').toISOString(),
                endDate: moment().add(1, 'd').toISOString()
            });
            expectedInactiveTimePeriods = chance.n(createRandomTimePeriod, chance.d6(), {
                beginDate: moment().subtract(2, 'M'),
                endDate: moment().subtract(1, 'M')
            });
            expectedDate = moment().toISOString();
            expectedResponse = chance.shuffle([
                expectedActiveTimePeriod,
                ...expectedInactiveTimePeriods
            ]);

            getFirestoreData.mockReturnValue(expectedQuerySnapshot);
            getDataFromQuerySnapshot.mockReturnValue(expectedResponse);
        });

        it('should call getTimePeriods and filter down by date', async () => {
            const activeTimePeriod = await getTimePeriodsByDate(expectedUserId, expectedDate);

            expect(activeTimePeriod).toEqual([expectedActiveTimePeriod]);
        });
    });
});
