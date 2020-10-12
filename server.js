const express = require('express')
const cors = require('cors')
const glob = require('glob')
const fs = require('fs')

const app = express()
app.use(cors())

app.get('/', function (req, res) {
  res.json({
    header: 'Site name',
    index: 'README.md'
  });
})

app.get('/tree', function (req, res) {
  glob("**/*.md", function (er, files) {
    res.json(files)
    // files.forEach(f => {
    //   console.log(f);
    // });
  })
})

app.get('/source/:id', function (req, res) {
  const pagePath = req.params.id;
  fs.readFile(`./${pagePath}`, (err, data) => {
    if (err) throw err;
      res.send(data);
  });
})

app.listen(3003);
