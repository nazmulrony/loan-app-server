const express = require('express');
const cors = require('cors');
require('dotenv').config();
const { MongoClient, ServerApiVersion } = require('mongodb');

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Loan app express server running!')

})
//mongoDB Setup


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.cwjhhvi.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        const loanCollection = client.db('LoanApp').collection('loans');

        app.post('/loans', async (req, res) => {
            const loan = req.body;
            const result = await loanCollection.insertOne(loan);
            res.send(result);
        })

        app.get('/loans', async (req, res) => {
            const query = {};
            const loans = await loanCollection.find(query).toArray();
            res.send(loans);
        })
    }
    finally {

    }
}
run().catch(console.dir);

app.listen(port, () => {
    console.log(`Loan app server running on port: ${port}`);
})