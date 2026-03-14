const dotenv = require('dotenv');
dotenv.config();

const dns = require('dns');
dns.setServers(['8.8.8.8', '8.8.4.4']);

const MongoClient = require('mongodb').MongoClient;

let database;
const initDb = (callback) => {
  if (database) {
    console.warn('Trying to init DB again!!');
    return callback(null, database);
  }
  MongoClient.connect(process.env.URI)
    .then((client) => {
      database = client;
      callback(null, database);
    })
    .catch((err) => {
      callback(err);
    });
};

const getDb = () => {
  if (!database) {
    throw Error('Database not initialized!!');
  }
  return database;
};

module.exports = {
  initDb,
  getDb,
};
