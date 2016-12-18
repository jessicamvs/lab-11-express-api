'use strict';

const storage = require('../lib/storage.js');
const Book = require('../model/book.js');

module.exports = function(router){

  router.get('/api/books/:id', function(req, res) {
    if (req.params.id) {
      storage.fetchItem('book', req.params.id)
      .then(book => {
        res.json(book);
      })
      .catch( err => {
        console.error(err);
        res.status(404).send('not found');
      });
      return;
    }
    console.log('WE DONT HAVE A BOOK ID!');
    res.status(400).send('bad request');
  });

  router.post('/api/books', function(req, res) {
    try {
      var book = new Book(req.body.title, req.body.author);
      storage.createItem('book', book);
      res.json(book);
    } catch (err) {
      console.error(err);
      res.status(400).send('bad request');
    }
  });

  router.delete('/api/books', function(req, res) {
    if (req.params.id) {
      storage.deleteItem('book', req.params.id)
      .then(() => {
        res.status(204).send('no content in body after a delete');
      })
      .catch(err => {
        console.error(err);
        res.status(404).send('could not delete a file that does not exist');
      });
    }
  });
};
