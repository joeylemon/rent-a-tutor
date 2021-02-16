import express from 'express'
import path from 'path'
import fs from 'fs'
import apidoc from 'apidoc'
import apidocmd from 'apidoc-markdown'

const PATH = '/home/dustin/rat/src/routes/docs'

/**
 * Automatically generate documentation files from in-line comments in the project
 */
const doc = apidoc.createDoc({
    src: path.resolve(),
    dest: '/tmp/apidoc',
    excludeFilters: ['node_modules', `${PATH}/html`]
})

/**
 * Apidoc.js will overwrite all files in the destination folder, removing any custom styles we added to the page.
 * Instead, let's call createDoc() in another folder and write only the data files in our custom html.
 */
fs.writeFileSync(`${PATH}/html/api_data.js`, `define({ "api": ${doc.data} });`)
fs.writeFileSync(`${PATH}/html/api_project.js`, `define(${doc.project});`)

/**
 * Automatically generate markdown file
 */
apidocmd.generateMarkdown({
    apiDocProjectData: JSON.parse(doc.project),
    apiDocApiData: JSON.parse(doc.data)
}).then(md => {
    fs.writeFileSync('./src/routes/README.md', md[0].content)
}).catch(err => console.error(err))

const router = express.Router()
router.use(express.static(`${PATH}/html`))
export default router
