const express = require("express")
const app = express.Router()
const Event = require("./db/event")
const Device = require("./db/device")
const DeviceConfig = require("./db/deviceconfig")

module.exports = app

app.get("/devices", async (req, res, next) => {
  try {
    const devices = await Device.findAll({ include: [{ model: DeviceConfig }] })
    res.send(devices)
  } catch (err) {
    next(err)
  }
})

app.get("/devices/:id", async (req, res, next) => {
  try {
    // const device = await Device.findByPk(req.params.id, {
    //   include: [
    //     {
    //       model: Event,
    //       as: "events",
    //       attributes: ["id", "deviceId", "event", "property", "floatvalue"],
    //     },
    //   ],
    //   order: [[Event, "time", "DESC"]],
    // })
    const device = await Device.findByPk(req.params.id, {
      include: [
        {
          model: DeviceConfig,
        },
      ],
    })
    const events = await Event.findAll({
      where: { deviceId: req.params.id },
      attributes: ["event", "property", "value", "floatvalue", "time"],
      order: [["time", "DESC"]],
      limit: 100,
    })
    const result = { ...device.dataValues, events }

    res.send(result)
  } catch (err) {
    next(err)
  }
})
