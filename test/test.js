import 'babel-polyfill';
import http from 'http';
import assert from 'assert';
import Server from '../src/server/app.js';

describe('Testing Endpoints for Serving', () => {
  before(function(done) {
    let server = new Server({ port: 8080, test: true });
    server.start();
    done();
  });
  it('Testing Main Page', done => {
    http.get('http://localhost:8080', res => {
      assert.equal(200, res.statusCode);
      done();
    });
  });
  it('Testing Groups', done => {
    http.get('http://localhost:8080/group', res => {
      assert.equal(200, res.statusCode);
      done();
    });
  });
  it('Testing Threads', done => {
    http.get('http://localhost:8080/group/thread', res => {
      assert.equal(200, res.statusCode);
      done();
    });
  });
  it('Testing User Settings', done => {
    http.get('http://localhost:8080/user/used', res => {
      assert.equal(200, res.statusCode);
      done();
    });
  });
  it('Testing Search', done => {
    http.get('http://localhost:8080/search/?this=test', res => {
      assert.equal(200, res.statusCode);
      done();
    });
  });
  it('Testing Register page', done => {
    http.get('http://localhost:8080/register', res => {
      assert.equal(200, res.statusCode);
      done();
    });
  });
  it('Testing Login Page', done => {
    http.get('http://localhost:8080/login', res => {
      assert.equal(200, res.statusCode);
      done();
    });
  });
});
