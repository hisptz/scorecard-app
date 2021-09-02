const {config} = require('@dhis2/cli-style')

module.exports = {
    extends: [config.eslintReact, "plugin:cypress/recommended", "plugin:react-hooks/recommended"],
    plugins: [
        "cypress",
        "react-hooks"
    ],
    rules: {
        "react-hooks/rules-of-hooks": "error",
        "react-hooks/exhaustive-deps": ["warn",
            {
                "additionalHooks": "useRecoilCallback|useRecoilTransaction_UNSTABLE"
            }
        ]
    },
    env: {
        "cypress/globals": true
    }
}
