const { log } = require("console");
const express = require("express");
const app = express();
const port = 3000;
const fs = require("fs");

app.set("view engine", "ejs");
// app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  fs.readdir(`./Files`, (err, files) => {
    // console.log(files, { files });

    res.render("index", { files });
  });
});

app.get("/create", (req, res) => {
  const currentdate = new Date();
  const day = String(currentdate.getDate()).padStart(2, "0");
  const month = String(currentdate.getMonth() + 1).padStart(2, "0");
  const year = String(currentdate.getFullYear());

  const file = `${day}-${month}-${year}.txt`;

  fs.writeFile(`./files/${file}`, "DAL CHINI", (err) => {
    if (err) {
      res.send("ERROR IN WRITING");
    } else {
      res.send("DONE");
    }
  });
});

app.listen(port, () => {
  console.log(`Server listening at PORT : ${port}`);
});
