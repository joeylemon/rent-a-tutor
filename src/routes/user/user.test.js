import supertest from 'supertest'
import should from 'should' // eslint-disable-line no-unused-vars
import { baseURL } from '../../utils/constants.js'

const api = supertest.agent(baseURL)

describe('User Endpoints', () => {
    let token

    // Get an API token before performing tests
    before(done => {
        api
            .post('/auth/login')
            .send({ email: 'test@test.net', password: '12345678' })
            .expect('Content-type', /json/)
            .expect(200)
            .then(res => {
                token = res.body.token
                done()
            })
            .catch(err => done(err))
    })

    it('should return user profile', done => {
        api
            .get('/user/profile/me')
            .auth(token, { type: 'bearer' })
            .expect('Content-type', /json/)
            .expect(200)
            .then(res => {
                res.body.should.be.instanceof(Object)
                res.body.should.have.property('id')
                res.body.should.have.property('email')
                res.body.should.have.property('name')
                res.body.should.have.property('phone')
                done()
            })
            .catch(err => done(err))
    })

    it('should update user location', done => {
        api
            .post('/user/profile/edit/location')
            .send({ latitude: '0', longitude: '0' })
            .auth(token, { type: 'bearer' })
            .expect('Content-type', /json/)
            .expect(200)
            .then(res => {
                res.body.name.toLowerCase().should.equal('success')
                done()
            })
            .catch(err => done(err))
    })

    it('should not allow strings for location floats', done => {
        api
            .post('/user/profile/edit/location')
            .send({ latitude: 'abc', longitude: '0' })
            .auth(token, { type: 'bearer' })
            .expect('Content-type', /json/)
            .expect(400)
            .then(() => {
                done()
            })
            .catch(err => done(err))
    })

    it('should update user name', done => {
        api
            .post('/user/profile/edit/name')
            .send({ value: 'tester' })
            .auth(token, { type: 'bearer' })
            .expect('Content-type', /json/)
            .expect(200)
            .then(res => {
                res.body.name.toLowerCase().should.equal('success')
                res.body.message.should.containEql('tester')
                done()
            })
            .catch(err => done(err))
    })

    it('should not edit invalid profile field', done => {
        api
            .post('/user/profile/edit/invalid_field')
            .send({ value: 'tester' })
            .auth(token, { type: 'bearer' })
            .expect('Content-type', /json/)
            .expect(400)
            .then(() => {
                done()
            })
            .catch(err => done(err))
    })
})
