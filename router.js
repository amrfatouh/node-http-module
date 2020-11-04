const fs = require("fs");

function handleRequest(req, res) {
  const url = req.url;
  const method = req.method;

  console.log(url);
  if (url === "/") {
    res.write("<h1>Welcome to Node.JS Guide!</h1>");
    res.write(`
      <form action='message' method='POST'>
        <input autofocus type='text' name='message'/>
        <input type='submit' value='Send' />
      </form>
    `);
    res.end();
  } else if (url === "/message") {
    const body = [];
    req.on("data", (chunk) => {
      body.push(chunk);
    });
    req.on("end", () => {
      const parsedMessage = Buffer.concat(body).toString();
      const message = parsedMessage.split("=")[1];
      fs.writeFile("./message.txt", message, () => {
        res.statusCode = 302;
        res.setHeader("Location", "/");
        res.end();
      });
    });
  }
}

exports = handleRequest;
