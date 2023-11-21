"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require(".");
describe('get capitalize first word', () => {
    describe('should not fail', () => {
        it('should capitalize first word only', () => {
            const name = 'àlex serra';
            const toTestResult = (0, _1.getCapitalizeFirstWord)(name);
            /**
             * two different approaches
             */
            // using snapshots
            expect(toTestResult).toMatchSnapshot();
            // using inline comparison
            expect(toTestResult).toBe('Àlex Serra');
        });
    });
    describe('should fail', () => {
        it('the name is null', () => {
            // instead of using "".toThrow" method
            expect(_1.getCapitalizeFirstWord).toThrowErrorMatchingSnapshot();
        });
        it('the name is empty', () => {
            // Other comparison operator "toStrictEqual"
            // More usefull for detailed objects comparison
            expect((0, _1.getCapitalizeFirstWord)('')).toStrictEqual('');
        });
    });
});
