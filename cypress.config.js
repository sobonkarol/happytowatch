const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // Integrate cypress-mochawesome-reporter plugin
      require('cypress-mochawesome-reporter/plugin')(on);
      
      // You can add other plugins here as needed
    },
    baseUrl: 'https://moodfilm.netlify.app/', // Set the base URL for your app
    supportFile: 'cypress/support/e2e.js', // Ensure support file is set
    reporter: 'cypress-mochawesome-reporter', // Use mochawesome reporter
    reporterOptions: {
      reportDir: 'cypress/reports', // Directory where reports are stored
      overwrite: true, // Prevent overwriting of previous reports
      html: true, // Generate HTML reports
      json: false, // Generate JSON reports
      reportPageTitle: 'MoodFilm Test Report', // Set a custom report page title
      embeddedScreenshots: true, // Embed screenshots in the report
      inlineAssets: true, // Include CSS and JS inline for self-contained report
    },
    video: false, // Capture video of test runs
    screenshotOnRunFailure: true, // Capture screenshots on test failure
  },
});