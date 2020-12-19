let deviceName = ''

const pairing = async () => {
  const bluetooth = window.navigator.bluetooth
  const device = await bluetooth.requestDevice({
    acceptAllDevices: true
  })
  console.debug(`name: ${device.name} ,id: ${device.id}`)
  deviceName = device.name ? device.name : ''
}

const main = async () => {
  const bluetooth = window.navigator.bluetooth

  await bluetooth.requestLEScan({
    acceptAllAdvertisements: true
  })

  bluetooth.addEventListener('advertisementreceived', event => {
    if(deviceName === event.device.name) {
      const d = Math.pow(10.0, (event.txPower - (event.rssi)) / 17.0)

      const distance = document.getElementById('distance')
      if(distance) {
        distance.innerText = `${event.device.name}までの距離は${Math.round(d / 100)}cm`
      }
    }
  })
}

const pairingButton = document.getElementById('pairing')
const button = document.getElementById('bluetooth')
if(pairingButton && button) {
  pairingButton.addEventListener('click', pairing)
  button.addEventListener('click', main)
}
