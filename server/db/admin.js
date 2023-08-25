const db = require("../db")
const Device = require("./device")
const DeviceConfig = require("./deviceconfig")

async function setup() {
  const devices = await Device.findAll()
  await devices[0].createDeviceconfig({ label: "Family Room" })
  await devices[1].createDeviceconfig({ label: "Kitchen" })
  await devices[2].createDeviceconfig({ label: "Bedroom" })
}

setup()
