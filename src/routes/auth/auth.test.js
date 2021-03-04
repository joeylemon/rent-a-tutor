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
})
