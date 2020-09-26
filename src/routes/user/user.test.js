import supertest from 'supertest'

import should from 'should' // eslint-disable-line no-unused-vars

const api = supertest.agent('https://jlemon.org/rat/api/v1')

describe('User Endpoints', () => {
    it('should return unauthorized', done => {
        api
            .get('/user/list')
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

    // it('should return list of users', done => {
    //     api
    //         .post('/auth/login')
    //         .send({ email: 'test@test.net', password: '12345678' })
    //         .expect('Content-type', /json/)
    //         .expect(200)
    //         .then(res => {
    //             return api
    //                 .get('/user/list')
    //                 .auth(res.body.token, { type: 'bearer' })
    //                 .expect('Content-type', /json/)
    //                 .expect(200)
    //         })
    //         .then(res => {
    //             res.body.should.be.instanceof(Array)
    //             done()
    //         })
    //         .catch(err => done(err))
    // })

    it("shouldn't allow malformed api tokens", done => {
        api
            .post('/auth/login')
            .send({ email: 'test@test.net', password: '12345678' })
            .expect('Content-type', /json/)
            .expect(200)
            .then(res => {
                return api
                    .get('/user/list')
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
