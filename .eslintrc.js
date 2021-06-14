const {config} = require('@dhis2/cli-style')

module.exports = {
    extends: [config.eslintReact, "plugin:cypress/recommended"],
    plugins: [
        "cypress"
    ],
    env: {
        "cypress/globals": true
    }
}
