const { defineConfig } = require("cypress");
require('dotenv').config()

module.exports = defineConfig({
  e2e: {
    specPattern: 'cypress/e2e/tests/**/*.cy.js',
    viewportWidth: 1280, // Default desktop width
    viewportHeight: 800, // Default desktop height

    baseUrl: 'https://goodbudget.com',

    setupNodeEvents(on, config) {
      // Merge .env variables into Cypress config.env
      config.env.API_USERNAME = process.env.API_USERNAME
      config.env.API_PASSWORD = process.env.API_PASSWORD
      return config
    },
  },
});