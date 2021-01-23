require("dotenv").config();
const server = require("./api/server");

//port 5000
const port = process.env.PORT || 8000;
server.listen(port, () => {
  console.log(`\n***server i s running on http://localhost:${port}\n`);
});
