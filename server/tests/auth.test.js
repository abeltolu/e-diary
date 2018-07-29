import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../app';

chai.use(chaiHttp);
chai.should();
const email = Math.random().toString(36).substring(2, 15);
describe('Authentication', () => {
  describe('Create user account', () => {
    it('should create user account', (done) => {
      const user = {
        firstname: 'ricky',
        lastname: 'ezechi',
        email: `${email}@gmail.com`,
        password: 'lastdays66',
      };
      chai.request(app)
        .post('/api/v1/auth/signup')
        .send(user)
        .end((error, response) => {
          response.should.have.status(201);
          response.should.be.an('object');
          done();
        });
    });
    it('should not create user account if user already exists', (done) => {
      const user = {
        firstname: 'sullivan',
        lastname: 'wisdom',
        email: 'sullivan@gmail.com',
        password: 'lastdays',
      };
      chai.request(app)
        .post('/api/v1/auth/signup')
        .send(user)
        .end((error, response) => {
          response.should.have.status(409);
          response.body.should.have.property('message').to.equal('user with this email already exists');
          done();
        });
    });
    it('should not create user account if firstname is empty', (done) => {
      const user = {
        firstname: '',
        lastname: 'wisdom',
        email: 'wiztemple7@gmail.com',
        password: 'lastdays66788',
      };
      chai.request(app)
        .post('/api/v1/auth/signup')
        .send(user)
        .end((error, response) => {
          response.should.have.status(400);
          response.body.should.have.property('message').to.equal('firstname is required');
          done();
        });
    });
    it('should not create user account if firstname contains special character', (done) => {
      const user = {
        firstname: 'last###&*',
        lastname: 'wisdom',
        email: 'wiztemple7@gmail.com',
        password: 'lastdays66788',
      };
      chai.request(app)
        .post('/api/v1/auth/signup')
        .send(user)
        .end((error, response) => {
          response.should.have.status(400);
          response.body.should.have.property('message').to.equal('firstname cannot contain special character');
          done();
        });
    });
    it('should not create user account if lastname is empty', (done) => {
      const user = {
        firstname: 'last',
        lastname: '',
        email: 'wiztemple7@gmail.com',
        password: 'lastdays66788',
      };
      chai.request(app)
        .post('/api/v1/auth/signup')
        .send(user)
        .end((error, response) => {
          response.should.have.status(400);
          response.body.should.have.property('message').to.equal('lastname is required');
          done();
        });
    });
    it('should not create user account if lastname contains special character', (done) => {
      const user = {
        firstname: 'last',
        lastname: 'wisdom&&&&',
        email: 'wiztemple7@gmail.com',
        password: 'lastdays66788',
      };
      chai.request(app)
        .post('/api/v1/auth/signup')
        .send(user)
        .end((error, response) => {
          response.should.have.status(400);
          response.body.should.have.property('message').to.equal('lastname cannot contain special character');
          done();
        });
    });
    it('should not create user account if the email is not provided', (done) => {
      const user = {
        firstname: 'last',
        lastname: 'homely',
        email: '',
        password: 'lastdays66788',
      };
      chai.request(app)
        .post('/api/v1/auth/signup')
        .send(user)
        .end((error, response) => {
          response.should.have.status(400);
          response.body.should.have.property('message').to.equal('email is required');
          done();
        });
    });
    it('should not create user account if the email format is incorrect', (done) => {
      const user = {
        firstname: 'last',
        lastname: 'homely',
        email: 'wiztemplegmail.com',
        password: 'lastdays66788',
      };
      chai.request(app)
        .post('/api/v1/auth/signup')
        .send(user)
        .end((error, response) => {
          response.should.have.status(400);
          response.body.should.have.property('message').to.equal('email is invalid');
          done();
        });
    });
    it('should not create user account if the password is missing', (done) => {
      const user = {
        firstname: 'last',
        lastname: 'homely',
        email: 'wiztemple@gmail.com',
        password: '',
      };
      chai.request(app)
        .post('/api/v1/auth/signup')
        .send(user)
        .end((error, response) => {
          response.should.have.status(400);
          response.body.should.have.property('message').to.equal('password is required');
          done();
        });
    });
    it('should not create user account if the password is less than 6 characters', (done) => {
      const user = {
        firstname: 'last',
        lastname: 'homely',
        email: 'wiztemple@gmail.com',
        password: 'last',
      };
      chai.request(app)
        .post('/api/v1/auth/signup')
        .send(user)
        .end((error, response) => {
          response.should.have.status(400);
          response.body.should.have.property('message').to.equal('password must be greater than six');
          done();
        });
    });
  });
  describe('user login', () => {
    it('should login a registered user', (done) => {
      const user = {
        email: 'sullivan@gmail.com',
        password: 'lastdays',
      };
      chai.request(app)
        .post('/api/v1/auth/login')
        .send(user)
        .end((error, response) => {
          response.should.have.status(200);
          response.should.be.an('object');
          response.body.should.have.property('message').to.equal('successfully signed in');
          done();
        });
    });
    it('should not login a user with incorrect password', (done) => {
      const user = {
        email: 'sullivan@gmail.com',
        password: 'lastdays66',
      };
      chai.request(app)
        .post('/api/v1/auth/login')
        .send(user)
        .end((error, response) => {
          response.should.have.status(404);
          response.body.should.have.property('message').to.equal('password or email is incorrect');
          done();
        });
    });
  });
  describe('get all users', () => {
    it('should return all registered users', (done) => {
      chai.request(app)
        .get('/api/v1/auth')
        .send()
        .end((error, response) => {
          response.should.have.status(200);
          response.should.be.an('object');
          response.body.should.have.property('message').to.equal('all users');
          done();
        });
    });
  });
  describe('get all users', () => {
    it('should return a single user by id', (done) => {
      const id = 3;
      chai.request(app)
        .get(`/api/v1/auth/${id}`)
        .send()
        .end((error, response) => {
          response.should.have.status(200);
          response.should.be.an('object');
          response.body.should.have.property('message').to.equal('user details successfully returned');
          done();
        });
    });
    it('should return a user if the id does not exist', (done) => {
      const id = 300;
      chai.request(app)
        .get(`/api/v1/auth/${id}`)
        .send()
        .end((error, response) => {
          response.should.have.status(404);
          response.should.be.an('object');
          response.body.should.have.property('message').to.equal('user not found');
          done();
        });
    });
  });
});
