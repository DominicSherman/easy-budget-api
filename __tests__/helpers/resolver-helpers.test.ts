import {chance} from '../chance';
import {getPropertyFromArgsOrRoot} from '../../src/helpers/resolver-helpers';

describe('resolver helpers', () => {
    describe('getPropertyFromArgsOrRoot', () => {
        let root,
            args,
            key;

        it('should return the args value when it has the key', () => {
            const expectedValue = chance.string();

            key = chance.string();
            args = {
                [key]: expectedValue
            };

            const actualValue = getPropertyFromArgsOrRoot(root, args, key);

            expect(actualValue).toEqual(expectedValue);
        });

        it('should return the root value when it has the key', () => {
            const expectedValue = chance.string();

            key = chance.string();
            root = {
                [key]: expectedValue
            };

            const actualValue = getPropertyFromArgsOrRoot(root, args, key);

            expect(actualValue).toEqual(expectedValue);
        });
    });
});
