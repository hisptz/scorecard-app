const {config} = require("@dhis2/cli-style");

module.exports = {
    parser: "@typescript-eslint/parser",
    extends: [
        config.eslintReact,
        "plugin:cypress/recommended",
        "plugin:react-hooks/recommended",
        "plugin:@typescript-eslint/recommended"
        
    ],
    parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
        ecmaFeatures: {
          jsx: true
        }
      },
    plugins: ["cypress", "react-hooks"],
    rules: {
        "react-hooks/rules-of-hooks": "error",
        "react-hooks/exhaustive-deps": [
            "warn",
            {
                additionalHooks: "useRecoilCallback|useRecoilTransaction_UNSTABLE",
            },
        ],
        "import/extensions": [
            "error",
            "ignorePackages",
            {
                "js": "never",
                "jsx": "never",
                "ts": "never",
                "tsx": "never"
            }
        ]

    },
    env: {
        "cypress/globals": true,
    }
};
