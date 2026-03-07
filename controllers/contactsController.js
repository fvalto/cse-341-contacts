const mongoDb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAllContacts = async (req, res) => {
    const userId = new ObjectId(req.params.id);
    result = await mongoDb.getDb().db().collection('contacts').find();
    result.toArray().then((contacts) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(contacts);
    })
};

const getSingleContact = async (req, res) => {
    const userId = new ObjectId(req.params.id);
    result = await mongoDb.getDb().db().collection('contacts').find( { _id: userId } );
    result.toArray().then((contacts) => {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).json(contacts[0]);
    })
};

module.exports = {
    getAllContacts,
    getSingleContact
};