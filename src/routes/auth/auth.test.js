import supertest from 'supertest'
import should from 'should' // eslint-disable-line no-unused-vars
import { BASE_URL } from '../../utils/constants.js'

const api = supertest.agent(BASE_URL)

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

    it('should not allow registration without all values', done => {
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

    it('should return unauthorized with a bad token', done => {
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
})
