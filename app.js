/** packages */
const express = require("express")
const config = require("config")
const bodyParser = require("body-parser")

/** app configuration */
const app = express()
const port = config.get("server-port")
const jsonParser = bodyParser.json()
const urlEncodeParser = bodyParser.urlencoded({
    extended: true
})

app.use(jsonParser)
app.use(urlEncodeParser)

const ipFn = require("./middleware/getIpAddress")
app.use("*",ipFn)

/** Methods */
app.get("/", (req, res, next) =>{
    res.send("Welcome to academic rest api Perri")
})


// User Routes Loading
const userRoutes = require("./routes/user.route")
userRoutes(app)

// Token middleware
let tkFn = require("./middleware/verifyToken")
app.use(tkFn)

// Student Routes Loading
const studentRoutes = require("./routes/student.route")
studentRoutes(app)

// Teacher Routes Loading
const teacherRoutes = require("./routes/teacher.route")
teacherRoutes(app)

// Period Routes Loading
const periodRoutes = require("./routes/period.route")
periodRoutes(app)

// Course Routes Loading
const courseRoutes = require("./routes/course.route")
courseRoutes(app)


app.listen(port, () =>{
    console.log("Server is running..")
})

