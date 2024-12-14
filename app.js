const { log } = require("console");
const express = require("express");
const app = express();
const port = 3000;
const fs = require("fs");
const path = require('path');

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
  res.render("create")
  });

  app.post('/createhisab',(req,res)=>{
    const currentdate = new Date();
  const day = String(currentdate.getDate()).padStart(2, "0");
  const month = String(currentdate.getMonth() + 1).padStart(2, "0");
  const year = String(currentdate.getFullYear());

   let  file = `${day}-${month}-${year}.txt`;

   const fileName = req.body.fileName

     
    fs.writeFile(`./files/${fileName}`, req.body.fileContent, (err) => {
       if (err)  return res.status(500).send("ERROR IN WRITING")
        res.redirect('/')
       })
  })

app.get("/edit/:filename", (req, res) => {
  const filename = req.params.filename;
  fs.readFile(`./Files/${filename}`, "utf-8", (err, data) => {
    if (err) return res.send("ERROR IN READING");
    res.render("edit", { data, filename });
  });
});

app.post("/update/:filename", (req, res) => {
  const filename = req.params.filename;
  fs.writeFile(`./Files/${filename}`, req.body.updated_text, (err) => {
    if (err) return res.send("ERROR IN READING");
    res.redirect("/");
  });
});

app.get("/delete/:filename", (req, res) => {
  const filename = req.params.filename;
  fs.unlink(`./Files/${filename}`, (err) => {
    if (err) return res.send("ERROR IN DELETING");
    res.redirect("/");
  });
});

app.listen(port, () => {
  console.log(`Server listening at PORT : ${port}`);
});
