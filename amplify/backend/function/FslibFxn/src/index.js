const awsServerlessExpress = require("aws-serverless-express");
const app = require("./app");

const server = awsServerlessExpress.createServer(app);

exports.handler = (event, context) => {
  console.log(`EVENT: ${JSON.stringify(event)}`);
  // allows for using callbacks as finish/error-handlers
  return awsServerlessExpress.proxy(server, event, context, "PROMISE").promise;
};
