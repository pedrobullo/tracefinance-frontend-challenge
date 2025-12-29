import nextJest from "next/jest.js";

const createJestConfig = nextJest({
  dir: "./",
});

/** @type {import('jest').Config} */
const config = {
  coverageProvider: "v8",
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/$1",
  },
  testPathIgnorePatterns: ["<rootDir>/node_modules/", "<rootDir>/.next/"],
  collectCoverageFrom: [
    "**/*.{ts,tsx}",
    "!**/*.d.ts",
    "!**/*.stories.tsx",
    "!**/node_modules/**",
    "!**/.next/**",
    "!**/coverage/**",
    "!jest.config.mjs",
    "!jest.setup.ts",
    "!next.config.ts",
    "!postcss.config.js",
    "!tailwind.config.ts",

    // Ignore Next.js app directory
    "!app/**/*.{ts,tsx}",

    // Ignore translations
    "!lib/i18n/translations/**/*.ts",

    // Ignore contexts
    "!contexts/**/*.{ts,tsx}",

    // Ignore index files
    "!lib/i18n/index.ts",
    "!**/index.ts",
  ],
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 70,
      lines: 70,
      statements: 70,
    },
  },
};

export default createJestConfig(config);
