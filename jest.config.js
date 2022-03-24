module.exports = {
    restoreMocks: true,
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    transform: {
        '\\.(js|jsx|ts|tsx)$': 'ts-jest',
        '\\.css$': 'jest-raw-loader',
    },
    moduleNameMapper: {
        '\\.(jpg|jpeg|png|gif|eot|otf|webp|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/jest/__mocks__/file-mock.js',
        '\\.svg': '<rootDir>/jest/__mocks__/svgr-mock.js',
        '^(?!!!raw-loader!).*.(css|less|scss)$': 'identity-obj-proxy',
        '@src/(.*)$': '<rootDir>/src/$1',
    },
    setupFiles: [
        "<rootDir>/jest/__mocks__/env.js"
    ],
    setupFilesAfterEnv: ['<rootDir>/jest/jest-setup.ts'],
    modulePathIgnorePatterns: ['<rootDir>/dist/'],
    globals: {
        'ts-jest': {
            packageJson: 'package.json',
        },
    },
}