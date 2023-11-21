"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchByRoleAndEmailsMatch = void 0;
async function searchByRoleAndEmailsMatch({ client, role, emails, }) {
    const rawData = client
        .db('dimatica')
        .collection('users')
        .aggregate([
        {
            $match: {
                roles: role,
                email: { $in: emails },
            },
        },
    ]);
    return rawData.toArray();
}
exports.searchByRoleAndEmailsMatch = searchByRoleAndEmailsMatch;
