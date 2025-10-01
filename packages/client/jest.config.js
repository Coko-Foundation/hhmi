module.exports = {
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    // Force module uuid to resolve with the CJS entry point,
    // because Jest does not support package.json.exports. See https://github.com/uuidjs/uuid/issues/451
    uuid: require.resolve('uuid'),
    '^.+\\.css$': '<rootDir>/test/mockFileExtensions.js',
  },
  setupFiles: ['./test/defaultSetup'],
  transformIgnorePatterns: [
    'node_modules/(?!y-protocols|lib0|wax-prosemirror-core|wax-prosemirror-services|wax-questions-service|wax-table-service)',
  ],
  transform: {
    '\\.[jt]sx?$': '<rootDir>/test/transformer.js',
    '^.+\\.(css|svg)$': '<rootDir>/test/mockFileExtensions.js',
  },
}
