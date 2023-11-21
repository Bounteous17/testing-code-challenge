"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchExactEmailNameAndRecentlyLogged = void 0;
const date_fns_1 = require("date-fns");
async function searchExactEmailNameAndRecentlyLogged({ client, email, name, }) {
    const halfAYearAgo = (0, date_fns_1.subMonths)(new Date(), 6);
    const rawData = client
        .db('dimatica')
        .collection('users')
        .find({
        email,
        last_connection_date: { $gt: halfAYearAgo },
        $or: [{ first_name: { $regex: name } }, { last_name: { $regex: name } }],
    });
    return rawData.toArray();
}
exports.searchExactEmailNameAndRecentlyLogged = searchExactEmailNameAndRecentlyLogged;
