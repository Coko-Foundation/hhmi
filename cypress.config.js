/* eslint-disable import/no-extraneous-dependencies */
const { defineConfig } = require('cypress')
const reader = require('any-text')

module.exports = defineConfig({
  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    setupNodeEvents(on, config) {
      on('task', {
        readF(filePath) {
          return new Promise((resolve, reject) => {
            try {
              let data = {}
              data = reader.getText(filePath)
              resolve(data)
            } catch (e) {
              reject(e)
            }
          })
        },
      })
    },
    baseUrl: 'http://localhost:4000',
  },
})
