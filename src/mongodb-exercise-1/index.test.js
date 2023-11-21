"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongodb_1 = require("mongodb");
const date_fns_1 = require("date-fns");
const constants_1 = require("../mongodb-exercises-resources/constants");
const _1 = require(".");
const client = new mongodb_1.MongoClient(constants_1.environment.mongodb.uri);
describe('search exact email name match and recently logged', () => {
    const constants = {
        email: 'jest@localhost',
        date: new Date(),
    };
    constants.fourMonthsAgo = (0, date_fns_1.subMonths)(constants.date, 4);
    constants.oneMonthAgo = (0, date_fns_1.subMonths)(constants.date, 1);
    beforeAll(async () => {
        await client.connect();
        return client
            .db('dimatica')
            .collection('users')
            .insertMany([
            {
                email: 'mocha@localhost',
                first_name: 'Mocha',
                last_name: 'Test',
                roles: [],
                last_connection_date: new Date(),
            },
            // 8 months since last login
            {
                email: constants.email,
                first_name: 'Jest Legacy',
                last_name: 'Test',
                roles: [],
                last_connection_date: (0, date_fns_1.subMonths)(constants.date, 8),
            },
            // 4 months since last login
            {
                email: constants.email,
                first_name: 'Jest Latest',
                last_name: 'Test',
                roles: [],
                last_connection_date: constants.fourMonthsAgo,
            },
            // 1 months since last login
            {
                email: constants.email,
                first_name: 'Jest Beta',
                last_name: 'Test',
                roles: [],
                last_connection_date: constants.oneMonthAgo,
            },
        ]);
    });
    afterAll(async () => {
        await client.db('dimatica').collection('users').deleteMany({});
        return client.close();
    });
    describe('should not fail', () => {
        it('return only jest latest version user that logged in recently', async () => {
            const data = await (0, _1.searchExactEmailNameAndRecentlyLogged)({
                client,
                email: constants.email,
                name: 'Latest',
            });
            expect(data).toHaveLength(1);
            const [user] = data;
            expect(user).toMatchObject({
                email: 'jest@localhost',
                first_name: 'Jest Latest',
                last_name: 'Test',
                roles: [],
                last_connection_date: constants.fourMonthsAgo,
            });
        });
        it('return multiple jest agents user that logged in recently', async () => {
            const data = await (0, _1.searchExactEmailNameAndRecentlyLogged)({
                client,
                email: constants.email,
                name: 'Jest',
            });
            expect(data).toHaveLength(2);
            expect(data).toMatchObject([
                {
                    email: 'jest@localhost',
                    first_name: 'Jest Latest',
                    last_name: 'Test',
                    roles: [],
                    last_connection_date: constants.fourMonthsAgo,
                },
                {
                    email: 'jest@localhost',
                    first_name: 'Jest Beta',
                    last_name: 'Test',
                    roles: [],
                    last_connection_date: constants.oneMonthAgo,
                },
            ]);
        });
    });
});
