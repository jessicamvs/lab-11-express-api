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
  //
  describe('testing POST /api/books', function() {
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
    it('should respond with 400 error if no body is provided', function(done) {
      request.post('localhost:3000/api/books')
      .end((err, res) => {
        expect(res.status).to.equal(400);
        expect(res.text).to.equal('bad request');
        done();
      });
    });
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
    it('should return 404 for valid req with an id that was not found', function(done) {
      request.get('localhost:3000/api/books/1')
      .end((err, res) => {
        expect(res.status).to.equal(404);
        done();
      });
    });
    // it('should respond with 400 along with bad request when no id provided', function(done) {
    //   request.get('localhost:3000/api/books')
    //   .end((err, res) => {
    //     expect(res.status).to.equal(400);
    //     expect(res.text).to.equal('bad request');
    //     done();
    //   });
    // });
  });
});
