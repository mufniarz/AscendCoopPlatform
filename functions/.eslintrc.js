module.exports = {
  root: true,
  env: {
    es6: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:import/typescript",
    "google",
    "plugin:@typescript-eslint/recommended",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: ["tsconfig.json"],
    sourceType: "module",
  },
  ignorePatterns: [
    "/lib/**/*", // Ignore built files.
    ".eslintrc.js" // Ignore ESLint config file.
  ],
  overrides: [
    {
      files: ["test/**/*.ts"],
      parserOptions: {
        project: ["tsconfig.test.json"],
      },
      env: { mocha: true },
      rules: {
        "@typescript-eslint/no-var-requires": "off",
        "require-jsdoc": "off",
        "quote-props": "off", // Disable quote-props for test files
      },
    },
  ],
  plugins: ["@typescript-eslint", "import"],
  rules: {
    "quotes": ["error", "double"],
    "import/no-unresolved": 0,
    "indent": ["warn", 2],
    "max-len": ["warn", { "code": 150 }],
    "operator-linebreak": "off"
  },
};
