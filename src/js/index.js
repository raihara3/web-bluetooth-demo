/*
  RSSI = TxPower - 20 * lg(d)
  d = 10 ^ ((TxPower - RSSI) / 20)
*/

const bluetooth = window.navigator.bluetooth
let deviceName
const pairing = async() => {
  if(!bluetooth) {
    alert('not supported!')
    return
  }

  try {
    const device = await bluetooth.requestDevice({
      acceptAllDevices: true
    })
    deviceName = device.name
    distanceButton.disabled = false
  } catch (error) {
    console.error(error)
  }
}
const pairingButton = document.getElementById('pairing')
pairingButton.addEventListener('click', () => pairing())


const getDistance = async() => {
  try {
    await bluetooth.requestLEScan({
      acceptAllAdvertisements: true
    })
    bluetooth.addEventListener('advertisementreceived', event => {
      if(event.device.name !== deviceName) return
      const distance = Math.pow(10.0, (event.txPower - (event.rssi)) / 17.0)
      document.getElementById('result').innerText = `${event.device.name}までの距離は${Math.round(distance / 100)}cm`
    })
  } catch (error) {
    console.error(error)
  }
}
const distanceButton = document.getElementById('distance')
distanceButton.addEventListener('click', () => getDistance())
