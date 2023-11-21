"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateByField = void 0;
async function updateByField({ client, _id, field, value, }) {
    let udpatedValue;
    if (field === 'roles') {
        udpatedValue = [value];
    }
    // the Promise would be resolved on the caller scope and errors being handled outside this function
    return client
        .db('dimatica')
        .collection('users')
        .updateOne({ _id }, { $set: { [field]: udpatedValue || value } });
}
exports.updateByField = updateByField;
