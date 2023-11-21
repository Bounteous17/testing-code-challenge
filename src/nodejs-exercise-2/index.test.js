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
        it('responded total value is 0', async () => {
            mockResponseTotal(0);
            const firstValue = await (0, _1.getPlurial)();
            expect(firstValue).toBe('none');
        });
        it('responded total value is 10', async () => {
            mockResponseTotal(10);
            const firstValue = await (0, _1.getPlurial)();
            expect(firstValue).toBe('few');
        });
        it('responded total value is 20', async () => {
            mockResponseTotal(20);
            const firstValue = await (0, _1.getPlurial)();
            expect(firstValue).toBe('many');
        });
    });
    describe('should fail', () => {
        it('failed response status bad request', async () => {
            const httpMock = (0, nock_1.default)(_1.url.origin)
                .get(_1.url.pathname)
                .reply(http_status_1.BAD_REQUEST, { total: 1 });
            expect(httpMock.isDone()).toBe(false);
            await expect(_1.getPlurial).rejects.toThrow('Request failed with status 400');
            expect(httpMock.isDone()).toBe(true);
        });
        it('uknown request error like dns resolution', async () => {
            const httpMock = (0, nock_1.default)(_1.url.origin)
                .get(_1.url.pathname)
                .replyWithError('DNS resolution error');
            expect(httpMock.isDone()).toBe(false);
            await expect(_1.getPlurial).rejects.toThrow('Unknown error perfoming request');
            expect(httpMock.isDone()).toBe(true);
        });
    });
});
