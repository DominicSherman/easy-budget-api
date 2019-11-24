import {chance} from '../chance';
import {getDataFromQuerySnapshot} from '../../src/helpers/repository-helpers';

describe('repository helpers', () => {
    describe('getDataFromQuerySnapshot', () => {
        let expectedData,
            expectedQuerySnapshot;

        beforeEach(() => {
            expectedData = chance.n(chance.string, chance.d6());

            expectedQuerySnapshot = expectedData.map((data) => ({
                data: jest.fn(() => data)
            }));
        });

        it('should map over the data', () => {
            const data = getDataFromQuerySnapshot(expectedQuerySnapshot);

            expect(data).toEqual(expectedData);
        });
    });
});
