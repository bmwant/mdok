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

function insertIntoTree(parts, subtree) {
  var current = parts[0];
  if (parts.length === 1) {  // it's a leaf node
    subtree.push({
      name: current,
      path: current
      // no children
    });
    return
  }

  var newNode = true;
  subtree.forEach(elem => {
    if(elem.name === current) {
      newNode = false;
      insertIntoTree(parts.slice(1), elem.children);
    }
  });

  if(newNode) {
    var node = {
      name: current,
      path: current,
      children: []
    }
    insertIntoTree(parts.slice(1), node.children);
    subtree.push(node);
  }
}


app.get('/tree', function (req, res) {
  glob("**/*.md", function (er, files) {
    var tree = [];
    files.forEach(f => {
      // todo: use os path separator
      let parts = f.split('/')
      insertIntoTree(parts, tree)
    });
    res.json(tree)
  })
})

app.get('/source/:id', function (req, res) {
  const pagePath = req.params.id;
  fs.readFile(`./${pagePath}`, (err, data) => {
    if (err) {
      res.status(404).send('Wrong filename provided');
    } else {
      res.send(data);
    }
  });
})

app.listen(3003);
