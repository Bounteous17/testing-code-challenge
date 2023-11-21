"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require(".");
const http_status_1 = require("http-status");
const nock_1 = __importDefault(require("nock"));
const axios_1 = __importDefault(require("axios"));
axios_1.default.defaults.adapter = 'http';
describe('exercise 1', () => {
    afterEach(() => nock_1.default.cleanAll());
    beforeEach(() => expect(nock_1.default.isDone()).toBe(true));
    describe('should not fail', () => {
        function mockResponseTotal(total = 10) {
            (0, nock_1.default)(_1.url.origin).get(_1.url.pathname).reply(http_status_1.OK, { total });
            expect(nock_1.default.isDone()).toBe(false);
        }
        afterEach(() => expect(nock_1.default.isDone()).toBe(true));
        it('add 20 units to received value 10', async () => {
            mockResponseTotal();
            const firstValue = await (0, _1.computeResult)();
            expect(firstValue).toBe(30);
        });
        it('add 2 units to received value 10', async () => {
            mockResponseTotal(2);
            const firstValue = await (0, _1.computeResult)();
            expect(firstValue).toBe(22);
        });
    });
    describe('should fail', () => {
        it('failed response status internal server error', async () => {
            const httpMock = (0, nock_1.default)(_1.url.origin)
                .get(_1.url.pathname)
                .reply(http_status_1.INTERNAL_SERVER_ERROR, { total: 1 });
            expect(httpMock.isDone()).toBe(false);
            await expect(_1.computeResult).rejects.toThrow('Request failed with status 500');
            expect(httpMock.isDone()).toBe(true);
        });
        it('response total type is not a number', async () => {
            const httpMock = (0, nock_1.default)(_1.url.origin)
                .get(_1.url.pathname)
                .reply(http_status_1.OK, { total: 'cat' });
            expect(httpMock.isDone()).toBe(false);
            await expect(_1.computeResult).rejects.toThrow('Expected value is not a number, we received: cat');
            expect(httpMock.isDone()).toBe(true);
        });
    });
});
