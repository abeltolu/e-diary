import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';

chai.use(chaiHttp);
chai.should();
const userToken = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJzdWxsaXZhbkBnbWFpbC5jb20iLCJpYXQiOjE1MzI4NzgzOTQsImV4cCI6MTUzMjk2NDc5NH0.1l0w_CsfYnazhhIV7BCZvuI9tKE94LRC5Z78KmBAHDk';
const title = Math.random().toString(36).substring(2, 15);
describe('Authentication', () => {
  describe('Create diary entry', () => {
    it('should create user entry', (done) => {
      const entry = {
        title: `${title}`,
        imageUrl: 'https://dribbble.com/shots/4833222-Consult-Business-Consulting-Landing-Page',
        note: 'Pablo Emilio Escobar Gaviria was a Colombian drug lord and narcoterrorist. His cartel supplied an estimated 80% of the cocaine smuggled into the United States at the height of his career, turning over US$21.9 billion a year in personal income',
      };
      chai.request(app)
        .post('/api/v1/users/entries')
        .set('Authorization', userToken)
        .send(entry)
        .end((error, response) => {
          response.should.have.status(201);
          response.should.be.an('object');
          response.body.should.have.property('message').to.equal('entry created');
          done();
        });
    });
    it('should not create entry if the title already exists', (done) => {
      const entry = {
        title: 'The life of Pablo',
        imageUrl: 'https://dribbble.com/shots/4833222-Consult-Business-Consulting-Landing-Page',
        note: 'Pablo Emilio Escobar Gaviria was a Colombian drug lord.',
      };
      chai.request(app)
        .post('/api/v1/users/entries')
        .set('Authorization', userToken)
        .send(entry)
        .end((error, response) => {
          response.should.have.status(409);
          response.should.be.an('object');
          response.body.should.have.property('message').to.equal('entry already exists');
          done();
        });
    });
    it('should not create entry if the title is empty', (done) => {
      const entry = {
        title: '',
        imageUrl: 'https://dribbble.com/shots/4833222-Consult-Business-Consulting-Landing-Page',
        note: 'Pablo Emilio Escobar Gaviria was a Colombian drug lord.',
      };
      chai.request(app)
        .post('/api/v1/users/entries')
        .set('Authorization', userToken)
        .send(entry)
        .end((error, response) => {
          response.should.have.status(400);
          response.should.be.an('object');
          response.body.should.have.property('message').to.equal('title is required');
          done();
        });
    });
    it('should not create entry if the note is empty', (done) => {
      const entry = {
        title: 'The life of sullivan',
        imageUrl: 'https://dribbble.com/shots/4833222-Consult-Business-Consulting-Landing-Page',
        note: '',
      };
      chai.request(app)
        .post('/api/v1/users/entries')
        .set('Authorization', userToken)
        .send(entry)
        .end((error, response) => {
          response.should.have.status(400);
          response.should.be.an('object');
          response.body.should.have.property('message').to.equal('entry note is required');
          done();
        });
    });
  });
});
