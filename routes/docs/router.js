import express from 'express'
import path from 'path'
import apidoc from 'apidoc'

const doc = apidoc.createDoc({
    src: path.resolve(),
    dest: './routes/docs/html',
    //template: "./routes/docs/template",
    excludeFilters: ['node_modules', './routes/docs/html', './routes/docs/template']
})

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