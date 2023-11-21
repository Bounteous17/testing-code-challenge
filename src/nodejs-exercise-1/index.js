"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.computeResult = exports.url = void 0;
const axios_1 = __importDefault(require("axios"));
const radash_1 = require("radash");
// Building a URL instance would help us destructuring properties
exports.url = new URL('https://my-webservice.moveecar.com/users/count');
/**
 * In case we need to handle the error at this point we would need
 * to wait the Promise to be resolved on this funcion by using "await".
 * @returns An HTTP request Promise that would be resolved on the caller
 */
async function getCountUsers() {
    try {
        const response = await axios_1.default.get(exports.url.toString());
        return response.data;
    }
    catch (error) {
        const statusError = error?.response?.status;
        if (statusError) {
            throw new Error(`Request failed with status ${statusError}`);
        }
        throw new Error('Unknown error perfoming request');
    }
}
/**
 *
 * @returns adds 20 units to the response in case the answered value is a number
 */
async function computeResult() {
    const result = await getCountUsers();
    const { total } = result;
    if ((0, radash_1.isNumber)(total)) {
        return total + 20;
    }
    throw new Error(`Expected value is not a number, we received: ${total}`);
}
exports.computeResult = computeResult;
