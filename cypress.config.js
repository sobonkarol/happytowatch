const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // Integrate cypress-mochawesome-reporter plugin
      require('cypress-mochawesome-reporter/plugin')(on);
      
      // You can add other plugins here as needed
    },
    baseUrl: 'http://localhost:3000/', // Set the base URL for your app
    supportFile: 'cypress/support/e2e.js', // Ensure support file is set
    reporter: 'cypress-mochawesome-reporter', // Use mochawesome reporter
    reporterOptions: {
      reportDir: 'cypress/reports', // Directory where reports are stored
      overwrite: false, // Prevent overwriting of previous reports
      html: true, // Generate HTML reports
      json: false, // Generate JSON reports
      reportPageTitle: 'MoodFilm Test Report', // Set a custom report page title
      embeddedScreenshots: true, // Embed screenshots in the report
      inlineAssets: true, // Include CSS and JS inline for self-contained report
    },
    video: true, // Capture video of test runs
    screenshotOnRunFailure: true, // Capture screenshots on test failure
  },
});