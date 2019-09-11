module.exports = {
  verbose: true,
  testURL: "http://localhost/",
  globals: {
    NODE_ENV: "test",
  },
  collectCoverage: true,
  collectCoverageFrom: ["src/**/*.{js,jsx}"],
  moduleDirectories: ["node_modules", "./src"],
  moduleNameMapper: {
    "\\.(jpg|jpeg|png|svg)$": "<rootDir>/test/__mocks__/fileMock.js",
    "\\.(css|scss|sass)$": "<rootDir>/test/__mocks__/styleMock.js",
  },
  setupFiles: ["<rootDir>/test/helpers/enzymeSetup.js"],
  snapshotSerializers: ["<rootDir>/node_modules/enzyme-to-json/serializer"],
};
