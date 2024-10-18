module.exports = {
    preset: 'jest-preset-angular',
    setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
    testPathIgnorePatterns: ['/node_modules/', '/dist/', '/src/test.ts'],
    globals: {
      'ts-jest': {
        tsconfig: '<rootDir>/tsconfig.spec.json',
        stringifyContentPathRegex: '\\.html$',
      },
    },
    transform: {
      '^.+\\.(ts|js|html)$': 'ts-jest',
    },
    moduleNameMapper: {
      '^@app/(.*)': '<rootDir>/src/app/$1',
      '^@environments/(.*)': '<rootDir>/src/environments/$1',
    },
    moduleFileExtensions: ['ts', 'html', 'js', 'json'],
    coverageReporters: ['html'],
    collectCoverage: true,
    collectCoverageFrom: [
      'src/**/*.ts',
      '!src/main.ts',
      '!src/polyfills.ts',
      '!src/**/*.module.ts',
      '!src/**/*.array.ts',
    ],
  };
  