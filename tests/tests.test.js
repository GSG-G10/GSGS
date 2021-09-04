const request = require('supertest');
const app = require('../server/app')

test('GET image status 200', (done) => {
  request(app).get('/getusers').expect(200);
  done();
});

test('POST image status 200', (done) => {
  request(app).get('/add-post').expect(200);
  done();
});

