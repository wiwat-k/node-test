
const MongoClient = require('mongodb').MongoClient;

const mongoUrl = 'mongoUrl';
const dbName = 'dbName';
const mongoOption = { useNewUrlParser: true, useUnifiedTopology: true };

async function connect (collection) {
    try {
    const client = await MongoClient.connect(mongoUrl, mongoOption);
    return client.db(dbName).collection(collection);
    } catch (err) {
        console.log(err)
    }
}

exports.connect = (collection) => connect(collection);