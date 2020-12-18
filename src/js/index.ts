const main = async () => {
  const bluetooth = window.navigator.bluetooth;
  const device = await bluetooth.requestDevice({
    acceptAllDevices: true
  })
  console.log(device)
}

const button = document.getElementById('bluetooth')
if(button) {
  button.addEventListener('click', main)
}
