const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
var cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());

const port = process.env.PORT || 9090;

var data = {}
data.table = []

app.get('/', (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
  fs.readFile('movies.json', (err, data) => {
    if (err) throw err;
    let moives = JSON.parse(data);
    console.log(moives);
    res.send(moives)
  });
});

app.post('/moive/add', (req, res) => {
  var newMoive = req.body;
  fs.readFile('movies.json', (err, data) => {
    if (err) throw err;
    let parseJson = JSON.parse(data);   
    parseJson.push(newMoive);
    res.send(parseJson);
    fs.writeFile('movies.json',JSON.stringify(parseJson),function(err){
      if(err) throw err;
    });
  });
});

app.put('/moive/delete', (req, res) => {
  var moiveName = req.body['name'];
  fs.readFile('movies.json', (err, data) => {
    if (err) throw err;
    let parseJson = JSON.parse(data);   
    const filterParseJson = parseJson.filter((item) => item.title !== moiveName);    
    fs.writeFile('movies.json',JSON.stringify(filterParseJson),function(err){
      if(err) throw err;
    });
  });
})


app.listen(port, () => {
  console.log(`app is runing on ${port}`);
})

