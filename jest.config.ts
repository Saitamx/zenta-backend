import type { Config } from 'jest';

const config: Config = {
	preset: 'ts-jest',
	testEnvironment: 'node',
	rootDir: '.',
	moduleFileExtensions: ['ts', 'js', 'json'],
	testRegex: '.*\\.spec\\.ts$',
	coverageDirectory: './coverage',
	collectCoverageFrom: ['src/**/*.(t|j)s'],
};

export default config;


