const mongoose = require("mongoose")
const express = require("express")
const cors = require("cors")
const path = require("path")
const cookieParser = require("cookie-parser")

require("dotenv").config({ path: "./.env" })

const app = express()
app.use(cookieParser())
app.use(express.json())
app.use(express.static("uploads"))
app.use(express.static("dist"))

app.use(cors({
    origin: true,
    credentials: true
}))



app.use("/api/auth", require("./routes/auth.routes"))
app.use("/api/founder", require("./routes/founder.routes"))
app.use("/api/mentor", require("./routes/mentor.routes"))
app.use("/api/admin", require("./routes/admin.routes"))
app.use("/api/application", require("./routes/application.routes"))
app.use("/api/mentorworkshop", require("./routes/mentorworkshop.routes"))
app.use("/api/workshop", require("./routes/bookworkshop.routes"))
app.use("/api/cofounder", require("./routes/cofounder.routes"))
app.use("/api/blogs", require("./routes/blog.routes"))

app.use("*", (req, res) => {
    res.sendFile(path.join(__dirname, "dist", "index.html"))
})

app.use((err, req, res, next) => {
    console.log(err);
    res.status(500).json({ message: "something went wrong" || err.message })
})
mongoose.connect(process.env.MONGO_URL)
mongoose.connection.once("open", () => {
    console.log("mongo Conntected");
    app.listen(process.env.PORT, console.log("Server Runninng"))

})