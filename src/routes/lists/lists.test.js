import supertest from 'supertest'
import should from 'should' // eslint-disable-line no-unused-vars
import { baseURL } from '../../constants.js'

const api = supertest.agent(baseURL)

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
