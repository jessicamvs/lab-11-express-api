'use strict';

const request = require('superagent');
const expect = require('chai').expect;

require('../index.js');

describe('testing book routes', function() {
  var book = null;

  describe('testing unregistered routes', function() {
    it('should return 404 for unregistered get route', function(done) {
      request.get('localhost:3000/blah')
      .end((err, res) => {
        expect(res.status).to.equal(404);
        done();
      });
    });
  });

  describe('testing POST /api/books', function() {
    // * `POST` - test 200, response body like  `{<data>}` for a post request with a valid body
    it('should return a book', function(done) {
      request.post('localhost:3000/api/books')
      .send({title: 'BOOK NAME', author: 'AUTHOR NAME'})
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).to.equal(200);
        expect(res.body.title).to.equal('BOOK NAME');
        expect(res.body.author).to.equal('AUTHOR NAME');
        book = res.body;
        done();
      });
    });
    // * `POST` - test 400, responds with 'bad request' for if no `body provided` or `invalid body`
    it('should respond with 400 error if no body is provided', function(done) {
      request.post('localhost:3000/api/books')
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.text).to.equal('bad request');
        done();
      });
    });
    // * `POST` - test 400, responds with 'bad request' for if no `body provided` or `invalid body`
    it('should respond with 404 error if invalid body is provided', function(done) {
      request.post('localhost:3000/api/books')
      .send('lolololololol')
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.text).to.equal('bad request');
        done();
      });
    });
  });

  describe('testing GET /api/books', function() {
    // * `GET` - test 200, response body like `{<data>}` for a request made with a valid id
    it('should return a book given an id', function(done) {
      request.get(`localhost:3000/api/books/${book.id}`)
      .end((err, res) => {
        if (err) return done(err);
        expect(res.status).to.equal(200);
        expect(res.body.title).to.equal('BOOK NAME');
        expect(res.body.author).to.equal('AUTHOR NAME');
        done();
      });
    });
    // * `GET` - test 404, responds with 'not found' for valid request made with an id that was not found
    it('should return 404 for valid req with an id that was not found', function(done) {
      request.get('localhost:3000/api/books/1')
      .end((err, res) => {
        expect(res.status).to.equal(404);
        done();
      });
    });


    // * `GET` - test 400, responds with 'bad request' if no id was provided in the request
    it('should respond with 400 along with bad request when no id provided', function(done) {
      request.get('localhost:3000/api/books')
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.text).to.equal('bad request');
        done();
      });
    });
  });

  describe('testing PUT /api/books', function() {
    // * `PUT` - test 200, response body like  `{<data>}` for a post request with a valid body
    it('should respond with 200 for a put with a valid body and should change storage', function(done) {
      request.put(`localhost:3000/api/books/${book.id}`)
      .send({title: 'CHANGED TITLE', author: 'CHANGED AUTHOR'})
      .end((err, res) => {
        expect(res.status).to.equal(200);
        expect(res.body.title).to.equal('CHANGED TITLE');
        expect(res.body.author).to.equal('CHANGED AUTHOR');
        done();
      });
    });

    // * `PUT` - test 400, responds with 'bad request' for if no `body provided` or `invalid body`
    it('should respond with 400 along with \'bad request\' if no body provided', function(done) {
      request.put(`localhost:3000/api/books/${book.id}`)
      .end((err, res) => {
        console.log('this is the RES BODY JESSICA',res.body);
        expect(res.status).to.equal(400);
        expect(res.text).to.equal('bad request');
        done();
      });
    });

  });

  // router.delete('/api/books/:id', function(req, res) {
  //   if (req.params.id) {
  //     storage.deleteItem('book', req.params.id)
  //     .then(() => {
  //       res.status(204);
  //     })
  //     .catch(err => {
  //       console.error(err);
  //       res.status(404).send('could not delete a file that does not exist');
  //     });
  //   }
  // });

//   describe('testing DELETE /api/books', function() {
//     it('should respond with 204 when no content in the body')
//     Pass an ?id=<uuid> in the query string to delete a specific book
// Should return 204 status with no content in the body
//     * pass the id of a resource though the query string to delete a simple-resource
//
//   });

});
