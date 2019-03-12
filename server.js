var server = require("http").createServer();

server.on("request", (request, response) => {
  var body = [];
  request.on("data", chunk => {
    body.push(chunk);
  });

  request
    .on("end", () => {
      let bodyString = body.concat().toString();
      response.end(bodyString);
    })
    .on("error", () => {
      response.statusCode = 400;
      response.end();
    });
  response.on("error", err => {
    console.err(err);
  });
});

var env = process.env.NODE_ENV || 'development'
console.log("***env:", env)

if (env === 'development') {
    process.env.PORT = 8008;   
}

server.listen(process.env.PORT, (PORT) => {

  console.log(`Server listening at ${process.env.PORT}`);
});