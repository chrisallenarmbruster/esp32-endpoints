const express = require("express")
const app = express()
const path = require("path")
const volleyball = require("volleyball")
const { Device, Event } = require("./db")

app.use(volleyball)
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use("/dist", express.static(path.join(__dirname, "../dist")))
app.use(express.static(path.join(__dirname, "../static")))

app.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "../static/index.html"))
)

app.use("/api", require("./api"))

app.post("/", async (req, res, next) => {
  try {
    console.log("Received Payload:\n", req.body)
    await Event.create({ ...req.body })
    res.status(201).send("OK")
  } catch (err) {
    next(err)
  }
})

app.get("*", (req, res) => {
  res.redirect("/")
})

app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(err.status || 500).send(err.message || "Internal server error")
})

module.exports = app
