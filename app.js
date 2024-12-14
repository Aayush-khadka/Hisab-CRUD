const express = require("express");
const app = express();
const port = 3000;

app.set("view engine", "ejs");
// app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("HEYYYYYY");
});

app.listen(port, () => {
  console.log(`Server listening at PORT : ${port}`);
});
