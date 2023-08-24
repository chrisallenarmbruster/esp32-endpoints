const conn = require("./conn")
const Device = require("./device")
const Event = require("./event")

Event.belongsTo(Device)
Device.hasMany(Event)

module.exports = {
  conn,
  Device,
  Event,
}
