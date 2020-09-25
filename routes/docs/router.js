import express from 'express'
import path from 'path'
import fs from 'fs'
import apidoc from 'apidoc'

/**
 * Automatically generate documentation files from in-line comments in the project
 */
const doc = apidoc.createDoc({
    src: path.resolve(),
    dest: '/tmp/apidoc',
    excludeFilters: ['node_modules', './routes/docs/html']
})

/**
 * Apidoc.js will overwrite all files in the destination folder, removing any custom styles we added to the page.
 * Instead, let's call createDoc() in another folder and write only the data files in our custom html.
 */
fs.writeFileSync('./routes/docs/html/api_data.js', `define({ "api": ${doc.data} });`)
fs.writeFileSync('./routes/docs/html/api_project.js', `define(${doc.project});`)

const router = express.Router()
router.use(express.static('./routes/docs/html'))
export default router
