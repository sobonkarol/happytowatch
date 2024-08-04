const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);
      return config;
    },
    reporter: 'cypress-mochawesome-reporter',
    reporterOptions: {
      reportDir: 'cypress/reports', // Directory for storing reports
      overwrite: true,              // Overwrite existing reports for each run
      html: true,                   // Enable HTML report generation
      json: false                   // Disable JSON report generation
    },
  },
});