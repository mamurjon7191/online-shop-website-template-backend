const dotenv = require("dotenv").config("");
const app = require("./middleware/app");

const port = process.env.PORT;

require("./config/db");

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
