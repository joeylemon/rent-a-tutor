import supertest from 'supertest'

import should from 'should' // eslint-disable-line no-unused-vars

const api = supertest.agent('https://jlemon.org/rat/api/v1')

describe('Auth Endpoints', () => {
    it('should log in', done => {
        api
            .post('/auth/login')
            .send({ email: 'test@test.net', password: '12345678' })
            .expect('Content-type', /json/)
            .expect(200)
            .then(res => {
                res.body.should.be.instanceof(Object)
                res.body.should.have.property('api')
                res.body.should.have.property('refresh')
                done()
            })
            .catch(err => done(err))
    })

    it('should refresh token', done => {
        api
            .post('/auth/login')
            .send({ email: 'test@test.net', password: '12345678' })
            .expect('Content-type', /json/)
            .expect(200)
            .then(res => {
                res.body.should.be.instanceof(Object)
                res.body.should.have.property('api')
                res.body.should.have.property('refresh')
                return api
                    .post('/auth/refresh')
                    .send({ refresh_token: res.body.refresh.token })
                    .expect('Content-type', /json/)
                    .expect(200)
            })
            .then(res => {
                res.body.should.be.instanceof(Object)
                res.body.should.have.property('token')
                res.body.should.have.property('expiration')
                done()
            })
            .catch(err => done(err))
    })
})
