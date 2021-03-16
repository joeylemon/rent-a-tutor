import supertest from 'supertest'
import should from 'should' // eslint-disable-line no-unused-vars
import axios from 'axios'
import faker from 'faker'
import { BASE_URL } from '../../utils/constants.js'
import { randString } from '../../utils/utils.js'

const api = supertest.agent(BASE_URL)

describe('User Endpoints', () => {
    let token
    let userID

    it('should register a new user', done => {
        api
            .post('/auth/register')
            .send({
                email: faker.internet.email(),
                password: faker.internet.password(12),
                name: faker.name.findName(),
                city: faker.address.city(),
                state: faker.address.state(),
                phone: faker.phone.phoneNumberFormat(0),
                dob: faker.date.past().toISOString().split('T')[0],
                genderId: Math.floor(Math.random() * 2) + 1,
                roleId: Math.floor(Math.random() * 2) + 1
            })
            .expect('Content-type', /json/)
            .expect(200)
            .then(res => {
                res.body.should.have.property('token')
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
                userID = res.body.id
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
                return api.get('/user/profile/me')
                    .auth(token, { type: 'bearer' })
                    .expect('Content-type', /json/)
                    .expect(200)
            })
            .then(res => {
                res.body.location.coordinates.should.eql([randLat, randLong])
                done()
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
                return api.get('/user/profile/me')
                    .auth(token, { type: 'bearer' })
                    .expect('Content-type', /json/)
                    .expect(200)
            })
            .then(res => {
                res.body.name.should.eql(randName)
                done()
            })
            .catch(err => done(err))
    })

    it('should update user avatar', done => {
        let randImgBuffer

        axios
            // download random image
            .get('https://picsum.photos/50', { responseType: 'arraybuffer' })

            // upload the random image as the user avatar
            .then(res => {
                randImgBuffer = Buffer.from(res.data, 'binary')

                return api
                    .put('/user/profile/me/avatar')
                    .attach('image', randImgBuffer, 'default_avatar.png')
                    .auth(token, { type: 'bearer' })
                    .expect('Content-type', /json/)
                    .expect(200)
            })

            // download the newly uploaded avatar
            .then(res => {
                res.body.name.toLowerCase().should.equal('success')

                return api
                    .get(`/user/profile/${userID}/avatar`)
                    .expect(200)
            })

            // ensure the random image is the same as the avatar
            .then(res => {
                Buffer.compare(randImgBuffer, Buffer.from(res.body, 'binary')).should.equal(0)
                done()
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

    it('should delete the user', done => {
        api
            .delete('/user/profile/me')
            .auth(token, { type: 'bearer' })
            .expect('Content-type', /json/)
            .expect(200)
            .then(res => {
                res.body.name.toLowerCase().should.equal('success')
                done()
            })
            .catch(err => done(err))
    })
})
