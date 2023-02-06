const ignore = [
  '<rootDir>/test/',
  '<rootDir>/lib/',
  '<rootDir>/coverage/',
  '<rootDir>/node_modules/',
];

export default {
  automock: false,
  clearMocks: true,
  coverageDirectory: 'coverage',
  testEnvironment: 'jsdom',
  roots: ['src'],
  coveragePathIgnorePatterns: ignore,
  moduleFileExtensions: ['js', 'ts'],
  testPathIgnorePatterns: ignore,
  transformIgnorePatterns: ignore.filter((o) => !['<rootDir>/test/'].includes(o)),
  transform: {
    '^.+\\.(t|j)s$': '@swc/jest',
  },
  setupFilesAfterEnv: ['<rootDir>/test/setup.ts'],
  testMatch: ['<rootDir>/src/**/__tests__/**/*.{js,ts}'],
  moduleNameMapper: {},
};
