import supertest from 'supertest'

import should from 'should' // eslint-disable-line no-unused-vars

const api = supertest.agent('https://jlemon.org/rat/api/v1')

describe('Lists Endpoints', () => {
    it('should return an array', done => {
        api
            .get('/lists/genders')
            .expect('Content-type', /json/)
            .expect(200)
            .end((err, res) => {
                if (err) return done(err)

                res.body.should.be.Array()
                done()
            })
    })
})
