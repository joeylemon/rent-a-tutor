import fs from 'fs'
import { PAGINATION_PAGE_SIZE, BASE_URL, dirs } from '../../utils/constants.js'
import { validateForm } from '../../utils/utils.js'
import { BadRequestError, SuccessResponse } from '../../utils/errors.js'
import User from '../../db/models/user.js'
import Gender from '../../db/models/gender.js'
import Role from '../../db/models/role.js'
import db from '../../db/db.js'

export async function deleteUser (me) {
    const avatarFilepath = me.getAvatarFilepath()
    if (avatarFilepath) { fs.unlinkSync(avatarFilepath) }

    await me.destroy()

    return new SuccessResponse(`user with id ${me.id} has been deleted`)
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

    user.avatar = BASE_URL + user.getAvatarURL()

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

export function getUserValuesByID (id, attributes) {
    return User.findOne({
        attributes: attributes,
        where: { id: id }
    })
}

export async function getNearbyTutors (me, distance, pageNum) {
    const page = parseInt(pageNum)
    if (isNaN(page) || page <= 0) { throw new BadRequestError('page number is invalid') }

    const limit = PAGINATION_PAGE_SIZE
    const offset = (page - 1) * PAGINATION_PAGE_SIZE

    await me.reload()

    const nearby = await db.query('select u.id, u.name, u.city, u.state, u.dob, null as avatar, g.name as gender, r.name as role, ST_Distance_Sphere(POINT(:latitude, :longitude), u.location) * .000621371192 as distance from user u left join gender g on g.id = u.genderId left join role r on r.id = u.roleId where u.roleId = 2 having distance <= :distance order by distance asc limit :limit offset :offset', {
        model: User,
        mapToModel: true,
        replacements: {
            latitude: me.location.coordinates[0],
            longitude: me.location.coordinates[1],
            distance: distance,
            limit: limit,
            offset: offset
        }
    })

    // Add avatar url to object
    for (const u of nearby) { u.avatar = `${BASE_URL}/user/profile/${u.id}/avatar` }

    // Add the next page's URL if there is another page
    const response = { next: null, tutors: nearby }
    if (nearby.length === limit) { response.next = `${BASE_URL}/user/nearby/${distance}/${page + 1}` }

    return response
}

export async function updateUserProfile (me, form) {
    // Ensure correct formats for values
    validateForm(form, ['email', 'phone'], true)

    await me.reload()

    // Make sure at least something was given
    if (!Object.keys(form).find(key => form[key] !== '')) { throw new BadRequestError('no updated values given') }

    // Update every user value given in the form
    for (const key of Object.keys(form)) { if (form[key]) me[key] = form[key] }

    // Update the user's location if new values were given
    if (form.latitude) { me.setLatitude(form.latitude) }
    if (form.longitude) { me.setLongitude(form.longitude) }

    await me.save()

    return new SuccessResponse('updated user profile')
}

export async function updateAvatar (me, file) {
    if (!file) throw new BadRequestError('missing image file')

    await me.reload()
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
