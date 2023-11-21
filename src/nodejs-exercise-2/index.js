"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getPlurial = exports.url = void 0;
const axios_1 = __importDefault(require("axios"));
// Building a URL instance would help us destructuring properties
exports.url = new URL('https://my-webservice.moveecar.com');
// Another way to add the url path name
exports.url.pathname = 'vehicles/total';
/**
 * In case we need to handle the error at this point we would need
 * to wait the Promise to be resolved on this funcion by using "await".
 * @returns An HTTP request Promise that would be resolved on the caller
 */
async function getTotalVehicles() {
    try {
        // Another way to read the response data if it's possible
        return (await axios_1.default.get(exports.url.toString())).data;
    }
    catch (error) {
        const statusError = error?.response?.status;
        if (statusError) {
            throw new Error(`Request failed with status ${statusError}`);
        }
        throw new Error('Unknown error perfoming request');
    }
}
async function getPlurial() {
    const { total } = await getTotalVehicles();
    if (total <= 0) {
        return 'none';
    }
    if (total <= 10) {
        return 'few';
    }
    return 'many';
}
exports.getPlurial = getPlurial;
