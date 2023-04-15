require("dotenv").config()
const express = require("express")
const app = express()
const PORT = process.env.PORT
const photoRouters = require("./routers/photoRouters")
const userRouters = require("./routers/userRouters")
const authentication = require("./middlewares/authentication")
const env = process.env.NODE_ENV


app.use(express.json())
app.use(express.urlencoded({ extended: true}))


app.use("/users", userRouters)

app.use(authentication)
app.use("/photos", photoRouters) 


if (env !== "test") {
  app.listen(PORT, () => {
    console.log("App running on port: ", PORT);
  })
}

module.exports = app