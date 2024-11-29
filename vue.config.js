// const { defineConfig } = require("@vue/cli-service");
// module.exports = defineConfig({
//   transpileDependencies: true,
//   devServer: {
//     proxy: "https://localhost:8000",
//     https: true,
//   },
// });

const fs = require("fs");
const { defineConfig } = require("@vue/cli-service");
const webpack = require("webpack");

module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    https: {
      key: fs.readFileSync("./certs/server.key"),
      cert: fs.readFileSync("./certs/server.cert"),
    },
    server: "https",
    proxy: {
      "/api": {
        target: "https://localhost:8000",
        secure: false, // Set to true if using trusted certificates
        changeOrigin: true,
      },
    },
    // Ensure correct devServer configuration
    host: "localhost",
    port: 8080,
  },
  configureWebpack: {
    plugins: [
      new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery",
      }),
    ],
  },
});
