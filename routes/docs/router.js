import express from 'express'
import path from 'path'
import fs from 'fs'
import apidoc from 'apidoc'

const doc = apidoc.createDoc({
    src: path.resolve(),
    dest: '/tmp/apidoc',
    //template: "./routes/docs/template",
    excludeFilters: ['node_modules', './routes/docs/html', './routes/docs/template']
})

fs.writeFileSync("./routes/docs/html/api_data.js", `define({ "api": ${doc.data} });`)
fs.writeFileSync("./routes/docs/html/api_project.js", `define(${doc.project});`)

const router = express.Router()

router.use(express.static("./routes/docs/html"))
// router.use(express.static("./routes/docs/html/template"))
// router.get("/api_data.js", (req, res) => {
//     res.sendFile("/home/dustin/rat/routes/docs/html/api_data.js")
// })
// router.get("/api_project.js", (req, res) => {
//     res.sendFile("/home/dustin/rat/routes/docs/html/api_project.js")
// })

export default router