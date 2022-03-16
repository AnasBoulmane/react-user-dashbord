module.exports = {
  rootDir: "./src",
  preset: "ts-jest",
  testEnvironment: "jsdom",
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  setupFilesAfterEnv: ["<rootDir>/setup-tests.ts"],
  extensionsToTreatAsEsm: [".ts", ".tsx"],
  moduleDirectories: ["node_modules", "./src"],
};