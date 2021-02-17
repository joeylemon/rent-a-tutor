import Gender from '../../db/models/gender.js'
import Role from '../../db/models/role.js'

export function getGenders () {
    return Gender.findAll()
}

export function getRoles () {
    return Role.findAll()
}
