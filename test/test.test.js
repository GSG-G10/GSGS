const request = require('supertest');
const app = require('../server/app')

test('GET  status 200', (done) => {
  request(app).get('/').expect(200);
  done();
});

test('POST  status 200', (done) => {
  request(app).get('/login').expect(200);
  done();
});

