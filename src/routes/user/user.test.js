import supertest from 'supertest'
import should from 'should' // eslint-disable-line no-unused-vars
import { baseURL } from '../../utils/constants.js'
import { randString } from '../../utils/utils.js'

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
        const randLat = Math.floor(Math.random() * 80)
        const randLong = Math.floor(Math.random() * 80)
        api
            .put('/user/profile/me')
            .send({ latitude: `${randLat}`, longitude: `${randLong}` })
            .auth(token, { type: 'bearer' })
            .expect('Content-type', /json/)
            .expect(200)
            .then(res => {
                res.body.name.toLowerCase().should.equal('success')
                api.get('/user/profile/me')
                    .auth(token, { type: 'bearer' })
                    .expect('Content-type', /json/)
                    .expect(200)
                    .then(res => {
                        res.body.location.coordinates.should.eql([randLat, randLong])
                        done()
                    })
                    .catch(err => done(err))
            })
            .catch(err => done(err))
    })

    it('should not allow strings for location floats', done => {
        api
            .put('/user/profile/me')
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
        const randName = randString(15)
        api
            .put('/user/profile/me')
            .send({ name: randName })
            .auth(token, { type: 'bearer' })
            .expect('Content-type', /json/)
            .expect(200)
            .then(res => {
                res.body.name.toLowerCase().should.equal('success')
                api.get('/user/profile/me')
                    .auth(token, { type: 'bearer' })
                    .expect('Content-type', /json/)
                    .expect(200)
                    .then(res => {
                        res.body.name.should.eql(randName)
                        done()
                    })
                    .catch(err => done(err))
            })
            .catch(err => done(err))
    })

    it('should not edit invalid profile field', done => {
        api
            .put('/user/profile/me/invalid_field')
            .send({ value: 'tester' })
            .auth(token, { type: 'bearer' })
            .expect('Content-type', /json/)
            .expect(400)
            .then(() => {
                done()
            })
            .catch(err => done(err))
    })

    it('should list nearby tutors', done => {
        api
            .get('/user/nearby/100000/1')
            .auth(token, { type: 'bearer' })
            .expect('Content-type', /json/)
            .expect(200)
            .then(res => {
                res.body.should.be.instanceof(Object)
                res.body.should.have.property('next')
                res.body.should.have.property('tutors')
                res.body.tutors.should.be.instanceof(Array)
                res.body.tutors.length.should.not.eql(0)
                res.body.tutors[0].should.have.property('distance')
                done()
            })
            .catch(err => done(err))
    })
})
