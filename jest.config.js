/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jest-environment-node',
  transform: {
    '^.+\\.ts?$': 'ts-jest'
  },
  transformIgnorePatterns: ['node_modules/(?!troublesome-dependency/.*)'],
  moduleDirectories: ['node_modules', 'src']
}
