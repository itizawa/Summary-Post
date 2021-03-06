module.exports = {
  roots: ['<rootDir>'],
  transform: { '^.+\\.tsx?$': 'babel-jest' },
  testPathIgnorePatterns: [
    '<rootDir>.next/',
    '<rootDir>/node_modules/',
  ],
  moduleFileExtensions: [
    'ts', 'tsx', 'js', 'jsx', 'json', 'node',
  ],
  testMatch: ['**/*.test.(ts|tsx|js)'],
};
