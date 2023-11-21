"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config = {
    bail: 1,
    // Indicates the root directory where Jest should look for test files
    roots: ['<rootDir>/src'],
    // The list of file extensions that Jest will recognize as test files
    testMatch: [
        '**/__tests__/**/*.+(ts|tsx|js)',
        '**/?(*.)+(spec|test).+(ts|tsx|js)',
    ],
    // Transform files with ts-jest for TypeScript support
    transform: {
        '^.+\\.(ts|tsx)$': 'ts-jest',
    },
    // Module file extensions that Jest should use
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
    // Indicates whether each individual test should be reported during the run
    verbose: true,
    // Setup files before running the tests
    // setupFiles: ['<rootDir>/jest.setup.ts'],
    // Other Jest configurations as needed
    // ...
    // Example: Collect coverage information
    collectCoverage: true,
    coverageDirectory: 'coverage',
    collectCoverageFrom: ['<rootDir>/src/**/*.ts'],
    moduleNameMapper: {
        // Force CommonJS build for http adapter to be available.
        // via https://github.com/axios/axios/issues/5101#issuecomment-1276572468
        '^axios$': require.resolve('axios'),
    },
};
exports.default = config;
