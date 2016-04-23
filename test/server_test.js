const chai = require('chai');
const chaiHttp = require('chai-http');
const mongoose = require('mongoose');
chai.use(chaiHttp);
const expect = chai.expect;
const request = chai.request;

var port = process.env.PORT = 5050;
process.env.MONGODB_URI = 'mongodb://localhost/slothTestDB';
var server = require(__dirname + '/../server');

var Sloth = require(__dirname + '/../models/sloth');

describe('sloths server', () => {
  after(() => {
    server.close();
  });

  describe('Sloth POST method', () => {
    after((done) => {
      mongoose.connection.db.dropDatabase(() => {
        done();
      });
    });

    it('should POST a new sloth', (done) => {
      request('localhost:' + port)
        .post('/sloths')
        .send({ name: 'Rick', toes: 2, strength: 8000 })
        .end((err, res) => {
          expect(err).to.eql(null);
          expect(res.body.name).to.eql('Rick');
          expect(res.body.toes).to.eql(2);
          expect(res.body.strength).to.eql(8000);
          done();
        });
    });
  });

  describe('Sloth GET method', () => {
    it('should GET all the sloths', (done) => {
      request('localhost:' + port)
        .get('/sloths')
        .end((err, res) => {
          expect(err).to.eql(null);
          expect(Array.isArray(res.body)).to.eql(true);
          expect(res.body.length).to.eql(0);
          done();
        });
    });
  });

  describe('routes that need a sloth for testing', () => {
    beforeEach((done) => {
      var newSloth = new Sloth({ name: 'Rick', toes: 2, strength: 8000 });

      newSloth.save((err, data) => {
        if (err) return console.log('error');
        this.sloth = data;
        done();
      });
    });

    afterEach((done) => {
      this.sloth.remove((err) => {
        if (err) return console.log('error');
        done();
      });
    });

    after((done) => {
      mongoose.connection.db.dropDatabase(() => {
        done();
      });
    });

    it('should GET a sloth', (done) => {
      request('localhost:' + port)
        .get('/sloths/' + this.sloth._id)
        .end((err, res) => {
          expect(err).to.eql(null);
          expect(res.body.name).to.eql('Rick');
          expect(res.body.toes).to.eql(2);
          expect(res.body.strength).to.eql(8000);
          done();
        });
    });

    it('should update a sloth using PUT', (done) => {
      request('localhost:' + port)
        .put('/sloths/' + this.sloth._id)
        .send({ name: 'John Cena', toes: 3, strength: 7000 })
        .end((err, res) => {
          expect(err).to.eql(null);
          expect(res.body.msg).to.eql('sloth updated');
          done();
        });
    });

    it('should DELETE a sloth', (done) => {
      request('localhost:' + port)
        .delete('/sloths/' + this.sloth._id)
        .end((err, res) => {
          expect(err).to.eql(null);
          expect(res.body.msg).to.eql('sloth removed');
          done();
        });
    });
  });
});
