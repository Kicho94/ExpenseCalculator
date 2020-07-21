const express = require("express");
const proxy = require("http-proxy");

//initialize//
var api = express();
var apiProxy = proxy.createProxyServer();

api.all("/api/v1/auth/*", (req, res) => {
  console.log("AUTH")
  apiProxy.web(req, res, { target: "http://localhost:8081" });
});

api.all("/api/v1/products/*", (req, res) => {
  console.log("PRODUCTS")
  apiProxy.web(req, res, { target: "http://localhost:8080" });
});

api.all("/*", (req, res) => {
  apiProxy.web(req, res, { target: "http://localhost:8082" });
});

// api.all("/*", (req, res) => {
//   res.status(400).send("not found");
// });

api.listen(process.env.PORT, err => {
  if (err) {
    console.log("could not start server");
    console.log(err);
    return;
  }
  console.log('server started');
});