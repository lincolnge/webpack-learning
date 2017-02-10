var path = require("path");

module.exports = {
  context: __dirname,
  entry: ["./app.js", "webpack-dev-server/client?http://localhost:8080/"],
  output: {
    path: path.resolve(__dirname, "dist"),
    publicPath: "/",
    filename: "bundle.js"
  }
}
