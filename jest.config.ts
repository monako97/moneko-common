const ignore = [
  '<rootDir>/test/',
  '<rootDir>/lib/',
  '<rootDir>/es/',
  '<rootDir>/dist/',
  '<rootDir>/node_modules/',
];

export default {
  automock: false,
  clearMocks: true,
  coverageDirectory: 'coverage',
  testEnvironment: 'jsdom',
  roots: ['src'],
  coveragePathIgnorePatterns: ignore,
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
  testPathIgnorePatterns: ignore,
  transformIgnorePatterns: ignore.filter(
    (o) =>
      ![
        '<rootDir>/test/',
      ].includes(o)
  ),
  transform: {
    '^.+\\.(t|j)sx?$': '@swc/jest',
  },
  setupFilesAfterEnv: ['<rootDir>/test/setup.ts'],
  testMatch: [
    '<rootDir>/src/**/__tests__/**/*.{js,jsx,ts,tsx}',
  ],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/test/file.mock.ts',
    '\\.(css|less)$': 'identity-obj-proxy',
    'iconfont.js$': '<rootDir>/test/file.mock.ts',
  },
};
