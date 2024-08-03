module.exports = {
    onPostBuild: async ({ utils }) => {
      try {
        // Run Cypress tests
        await utils.run.command('npx cypress run');
  
        console.log('Cypress tests passed!');
      } catch (error) {
        utils.build.failBuild('Cypress tests failed', { error });
      }
    },
  };
  