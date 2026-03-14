const mongoDb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;

const getAllContacts = async (req, res) => {
  //swagger.tags = ['Contacts']
  const userId = new ObjectId(req.params.id);
  result = await mongoDb.getDb().db().collection('contacts').find();
  result.toArray().then((contacts) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(contacts);
  });
};

const getSingleContact = async (req, res) => {
  //swagger.tags = ['Contacts']
  const userId = new ObjectId(req.params.id);
  result = await mongoDb
    .getDb()
    .db()
    .collection('contacts')
    .find({ _id: userId });
  result.toArray().then((contacts) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(contacts[0]);
  });
};

const createContact = async (req, res) => {
  //swagger.tags = ['Contacts']
  const newUser = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday,
  };
  const response = await mongoDb
    .getDb()
    .db()
    .collection('contacts')
    .insertOne(newUser);
  if (response.acknowledged) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(
        response.error || 'Some error occurred while creating the contact.',
      );
  }
};

const updateContact = async (req, res) => {
  //swagger.tags = ['Contacts']
  const userId = new ObjectId(req.params.id);
  const updatedUser = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    favoriteColor: req.body.favoriteColor,
    birthday: req.body.birthday,
  };
  const response = await mongoDb
    .getDb()
    .db()
    .collection('contacts')
    .replaceOne({ _id: userId }, updatedUser);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(
        response.error || 'Some error occurred while updating the contact.',
      );
  }
};

const deleteContact = async (req, res) => {
  //swagger.tags = ['Contacts']
  const userId = new ObjectId(req.params.id);
  const response = await mongoDb
    .getDb()
    .db()
    .collection('contacts')
    .deleteOne({ _id: userId });
  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(
        response.error || 'Some error occurred while deleting the contact.',
      );
  }
};

module.exports = {
  getAllContacts,
  getSingleContact,
  createContact,
  updateContact,
  deleteContact,
};
