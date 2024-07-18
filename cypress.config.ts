// import { defineConfig } from "cypress";

// export default defineConfig({
//   component: {
//     devServer: {
//       framework: "create-react-app",
//       bundler: "webpack",
//     },
//   },
// });

const { defineConfig } = require("cypress");
const { startDevServer } = require("@cypress/webpack-dev-server");
// const webpack = require('@cypress/webpack-preprocessor');

module.exports = defineConfig({
  projectId: "tsx4ao",
  e2e: {
    setupNodeEvents(on, config) {
      on("dev-server:start", (options) => startDevServer({ options }));
      // on('file:preprocessor', webpack());
    },
    baseUrl: "http://localhost:3000",
  },

  component: {
    devServer: {
      framework: "create-react-app",
      bundler: "webpack",
    },
  }
});
