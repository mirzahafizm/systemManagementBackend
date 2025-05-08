require("dotenv").config();
const app = require('./config/express');


const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log("Server is listening on port", PORT);
});
