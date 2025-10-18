const config = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/test'],
  testMatch: ['**/*.test.ts'],
  collectCoverageFrom: ['src/**/*.ts', '!src/**/*.test.ts'],
  moduleNameMapper: {
    '^@domain/(.*)$': '<rootDir>/src/domain/$1',
    '^@domain': '<rootDir>/src/domain',
    '^@application/(.*)$': '<rootDir>/src/application/$1',
    '^@application': '<rootDir>/src/application',
    '^@infrastructure/(.*)$': '<rootDir>/src/infrastructure/$1',
    '^@infrastructure': '<rootDir>/src/infrastructure',
    '^@interfaces/(.*)$': '<rootDir>/src/interfaces/$1',
    '^@interfaces': '<rootDir>/src/interfaces',
  },
};

module.exports = config;

