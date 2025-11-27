"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    rootDir: '.',
    moduleFileExtensions: ['ts', 'js', 'json'],
    testRegex: '.*\\.spec\\.ts$',
    coverageDirectory: './coverage',
    collectCoverageFrom: ['src/**/*.(t|j)s'],
};
exports.default = config;
//# sourceMappingURL=jest.config.js.map