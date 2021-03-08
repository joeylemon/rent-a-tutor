import bcrypt from 'bcrypt'
import fs from 'fs'
import { baseURL, dirs } from '../../constants.js'
import { validateForm } from '../../utils.js'
import { BadRequestError, SuccessResponse } from '../../objects.js'
import User from '../../db/models/user.js'
import Gender from '../../db/models/gender.js'
import Role from '../../db/models/role.js'
import db from '../../db/db.js'

export async function registerUser (form) {
    validateForm(form, ['email', 'password', 'name', 'city', 'state', 'phone', 'dob', 'genderId', 'roleId'])

    const existingUser = await getUserByEmail(form.email)
    if (existingUser) { throw new BadRequestError('email already exists') }

    form.password = await bcrypt.hash(form.password, 10)

    return User.create(form)
}

export async function getUserByID (id) {
    const user = await User.findOne({
        include: [{
            model: Gender,
            as: 'gender'
        }, {
            model: Role,
            as: 'role'
        }],
        where: { id: id }
    })

    if (!user) { throw new BadRequestError(`user with id ${id} doesn't exist`) }

    user.avatar = baseURL + user.getAvatarURL()

    return user
}

export function getUserByEmail (email) {
    return User.findOne({
        include: [{
            model: Gender,
            as: 'gender'
        }, {
            model: Role,
            as: 'role'
        }],
        where: { email: email }
    })
}

export function getNearbyTutors (me, distance) {
    return db.query('select u.id, u.name, u.city, u.state, u.dob, g.name as gender, r.name as role, ST_Distance_Sphere(POINT(?, ?), u.location) * .000621371192 as distance from user u left join gender g on g.id = u.genderId left join role r on r.id = u.roleId where u.roleId = 2 having distance <= ? order by distance asc', {
        model: User,
        mapToModel: true,
        replacements: [me.location.coordinates[0], me.location.coordinates[1], distance]
    })
}

export async function updateUserProfile (me, field, value) {
    if (!value) { throw new BadRequestError('missing value') }

    me = await User.findOne({
        where: { id: me.id }
    })

    if (!(field in me)) { throw new BadRequestError(`profile field ${field} does not exist`) }

    me[field] = value
    await me.save()

    return new SuccessResponse(`updated user ${field} to ${value}`)
}

export async function updateUserLocation (me, form) {
    validateForm(form, ['latitude', 'longitude'])
    const latitude = parseFloat(form.latitude)
    const longitude = parseFloat(form.longitude)

    if (isNaN(latitude) || isNaN(longitude)) { throw new BadRequestError(`(${form.latitude},${form.longitude}) is not a valid location`) }

    const point = { type: 'Point', coordinates: [latitude, longitude] }

    me = await User.findOne({
        where: { id: me.id }
    })

    me.location = point
    await me.save()

    return new SuccessResponse(`updated user location to (${latitude},${longitude})`)
}

export async function updateAvatar (me, file) {
    if (!file) throw new BadRequestError('missing image file')

    me = await User.findOne({
        where: { id: me.id }
    })
    const oldFilepath = me.getAvatarFilepath()

    me.avatar = file.filename
    await me.save()

    // Delete the previous avatar if the user had one
    if (oldFilepath) {
        fs.unlinkSync(oldFilepath)
    }

    return new SuccessResponse('updated user avatar')
}

export async function getAvatarPath (id) {
    const user = await User.findOne({
        where: { id: id }
    })

    if (!user) { throw new BadRequestError(`user with id ${id} doesn't exist`) }
    if (!user.avatar) { return `${dirs.images}/default_avatar.png` }

    return user.getAvatarFilepath()
}
