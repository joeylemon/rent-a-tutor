import db from '../../db/db.js'
import { BadRequestError } from '../../objects.js'

import Gender from '../../db/models/gender.js'
import Role from '../../db/models/role.js'

export function getGenders () {
    return Gender.findAll()
}

export function getRoles () {
    return Role.findAll()
}

export async function getStates () {
    const [results] = await db.query('select distinct state from city order by state')
    return results.map(e => e.state)
}

export async function getCities (state) {
    const [results] = await db.query('select city from city where state = ? order by city', { replacements: [state] })

    if (results.length === 0) { throw new BadRequestError('invalid state given') }

    return results.map(e => e.city)
}
