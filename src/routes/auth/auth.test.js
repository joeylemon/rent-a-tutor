import supertest from 'supertest'
import should from 'should' // eslint-disable-line no-unused-vars
import { baseURL } from '../../constants.js'

const api = supertest.agent(baseURL)

describe('Auth Endpoints', () => {
    it('should log in', done => {
        api
            .post('/auth/login')
            .send({ email: 'test@test.net', password: '12345678' })
            .expect('Content-type', /json/)
            .expect(200)
            .then(res => {
                res.body.should.be.instanceof(Object)
                res.body.should.have.property('token')
                res.body.should.have.property('expiration')
                done()
            })
            .catch(err => done(err))
    })

    it('should not allow registration', done => {
        api
            .post('/auth/register')
            .send({ email: 'test@test.net', password: '12345678' })
            .expect('Content-type', /json/)
            .expect(400)
            .then(res => {
                res.body.should.be.instanceof(Object)
                res.body.should.have.property('message')
                res.body.message.should.containEql('missing')
                done()
            })
            .catch(err => done(err))
    })

    it('should return unauthorized', done => {
        api
            .get('/user/profile/me')
            .auth('bad_token', { type: 'bearer' })
            .expect('Content-type', /json/)
            .expect(401)
            .end((err, res) => {
                if (err) return done(err)

                res.status.should.equal(401)
                res.body.should.be.instanceof(Object)
                res.body.should.have.property('code')
                res.body.should.have.property('message')
                done()
            })
    })

    it('should not allow malformed api tokens', done => {
        api
            .post('/auth/login')
            .send({ email: 'test@test.net', password: '12345678' })
            .expect('Content-type', /json/)
            .expect(200)
            .then(res => {
                return api
                    .get('/user/profile/me')
                    .auth('1' + res.body.token + '1', { type: 'bearer' })
                    .expect('Content-type', /json/)
                    .expect(401)
            })
            .then(res => {
                res.body.should.be.instanceof(Object)
                res.body.should.have.property('code')
                res.body.should.have.property('message')
                done()
            })
            .catch(err => done(err))
    })
})
