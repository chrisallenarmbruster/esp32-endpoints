const express = require("express")
const app = express.Router()
const Event = require("./db/event")
const Device = require("./db/device")

module.exports = app

app.get("/devices", async (req, res, next) => {
  try {
    const devices = await Device.findAll()
    res.send(devices)
  } catch (err) {
    next(err)
  }
})

app.get("/devices/:id", async (req, res, next) => {
  try {
    const device = await Device.findByPk(req.params.id, {
      include: [{ model: Event }],
      order: [[Event, "time", "DESC"]],
    })

    res.send(device)
  } catch (err) {
    next(err)
  }
})
