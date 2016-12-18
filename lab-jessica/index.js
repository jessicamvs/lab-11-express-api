'use strict';
// node modules
const express = require('express');
const morgan = require('morgan');
const jsonParser = require('body-parser').json();

const createError = require('http-errors');

const app = express();
const router = express.Router();

app.use(morgan('dev'));
app.use(jsonParser);

app.use((err, req, res, next) => {
  console.error(err.message);

  err = createError(500, err.message);
  res.status(err.status).send(err.name);
  next();
});

require('./routes/book-routes')(router);
app.use(router);
const PORT = process.env.PORT || 3000;

app.listen(PORT, function() {
  console.log('server listening on port', PORT);
});
