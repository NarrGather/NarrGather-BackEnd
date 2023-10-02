require("dotenv").config();

const express = require("express");
const port = process.env.PORT;
const app = express();
const router = require("./routes");
const cors = require("cors");

app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: false }));

app.use(cors());

app.use(router);

app.listen(port, () => {
  console.log(`Server running on ${Date(Date.now)}`);
  console.log(`Server listening on PORT: ${port}`);
});
