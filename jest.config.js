module.exports = {
    collectCoverageFrom: [
        '<rootDir>/src/*/**/*.ts',
        '<rootDir>/src/*.ts'
    ],
    coverageDirectory: '.coverage',
    coveragePathIgnorePatterns: [
        '<rootDir>/src/generated/graphql.ts'
    ],
    coverageThreshold: {
        'global': {
            'branches': 100,
            'functions': 100,
            'lines': 100,
            'statements': 100
        }
    },
    moduleFileExtensions: [
        'ts',
        'tsx',
        'js',
        'json'
    ],
    setupFilesAfterEnv: ['jest-chain'],
    testMatch: [
        '<rootDir>/__tests__/**/*.test.ts'
    ],
    transform: {
        '\\.(ts|tsx)$': 'ts-jest'
    }
};
