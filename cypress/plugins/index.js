const injectDevServer = require("@cypress/react/plugins/react-scripts");
const {
  networkShim,
  chromeAllowXSiteCookies,
  cucumberPreprocessor,
} = require("@dhis2/cypress-plugins");

/**
 * @type {Cypress.PluginConfig}
 */
const cucumber = require("cypress-cucumber-preprocessor").default;

// eslint-disable-next-line no-unused-vars
module.exports = (on, config) => {
  networkShim(on, config);
  chromeAllowXSiteCookies(on, config);
  cucumberPreprocessor(on, config);
  injectDevServer(on, config);
  on("file:preprocessor", cucumber());
  return config;
};
