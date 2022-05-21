module.exports = {
  collectCoverage: false,
  // collectCoverageFrom: [
  //   '<rootDir>/src/models/**/*.model.js',
  //   '<rootDir>/src/models/useTransaction.js',
  //   '!<rootDir>/src/models/__tests__/helpers/**',
  // ],
  // coverageDirectory: '<rootDir>/coverage',
  projects: [
    {
      displayName: 'models',
      testEnvironment: 'node',
      testRegex: 'models/__tests__/.+test.js$',
      globalSetup: '<rootDir>/models/__tests__/_setup.js',
      // globalTeardown: '<rootDir>/src/models/__tests__/_teardown.js',
    },
  ],
  maxWorkers: 1,
}
