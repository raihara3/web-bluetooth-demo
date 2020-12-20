/*
  RSSI = TxPower - 20 * lg(d)
  d = 10 ^ ((TxPower - RSSI) / 20)
*/

class WebBluetooth {
  deviceName: string
  bluetooth: Bluetooth
  dom: HTMLElement | null

  constructor() {
    this.deviceName = ''
    this.bluetooth = window.navigator.bluetooth
    this.dom = document.getElementById('web-bluetooth')
  }

  isSupported() {
    if(!this.dom) {
      alert('There is no web-bluetooth dom.')
      return false
    }

    if(!this.bluetooth) {
      this.dom.innerText = 'not supported.'
      return false
    }

    const button = document.createElement('button')
    button.innerText = 'Pairing'
    button.addEventListener('click', () => this.pairing())
    this.dom.appendChild(button)
    return true
  }

  async pairing() {
    const device = await this.bluetooth.requestDevice({
      acceptAllDevices: true
    })
    if(!device) return

    if(device.name) this.deviceName = device.name

    const button = document.createElement('button')
    button.innerText = 'Get Distance'
    button.addEventListener('click', () => this.getDistance())
    if(this.dom) this.dom.appendChild(button)

    console.debug(`name: ${device.name} , id: ${device.id}`)
  }

  async getDistance() {
    await this.bluetooth.requestLEScan({
      acceptAllAdvertisements: true
    })

    const div = document.createElement('div')
    if(this.dom) this.dom.appendChild(div)

    this.bluetooth.addEventListener('advertisementreceived', event => {
      if(this.deviceName !== event.device.name) return

      const distance = Math.pow(10.0, (event.txPower - (event.rssi)) / 17.0)
      div.innerText = `${event.device.name}までの距離は${Math.round(distance / 100)}cm`
    })
  }
}

const webBluetooth = new WebBluetooth()
const isSupported = webBluetooth.isSupported()
