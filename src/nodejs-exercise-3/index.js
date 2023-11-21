"use strict";
// This function is the original one from the exercise
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCapitalizeFirstWord = void 0;
// I have noticed that code also capitalizes the rest of the words
function getCapitalizeFirstWord(name) {
    if (name == null) {
        throw new Error('Failed to capitalize first word with null');
    }
    if (!name) {
        return name;
    }
    return name
        .split(' ')
        .map((n) => n.length > 1
        ? n.substring(0, 1).toUpperCase() + n.substring(1).toLowerCase()
        : n)
        .join(' ');
}
exports.getCapitalizeFirstWord = getCapitalizeFirstWord;
