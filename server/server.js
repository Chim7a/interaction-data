const express = require('express');
const cors = require('cors')
const path = "interactions.csv";
const csv = require("csvtojson");

const app = express();
app.use(cors())

const getInteractions = async () => {
    return new Promise(resolve => {
      csv()
        .fromFile(path)
        .then(result => resolve(result));
    });
  };

app.get('/interactions', async (req, res) => {
    try {const interactions = await getInteractions()
        if (!interactions) 
        res.status(400).send("No Interaction")
        res.status(200).send(interactions)
    }
    catch(err){res.status(500).send(err)}
})

let port = 8080;
    app.listen(port, () => {
      console.log(`Running at localhost:${port}`);
    });