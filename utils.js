// import { modelLoaded as posenet } from './sketch.js'

//menu chooser toggle
document.getElementById('gltf-menu').addEventListener('change', function (e) {
  const newValue = e.target.value
  console.log(newValue)
  activeModel = newValue
})

// check if a-scene is loaded
document.addEventListener('DOMContentLoaded', function () {
  let scene = document.querySelector('a-scene')
  let splash = document.querySelector('#splash')
  scene.addEventListener('loaded', function (e) {
    // splash.style.display = 'none'
    console.log('a-scene has been loaded')
  })
})

// check if all entities are loaded
document
  .querySelector('a-entity')
  .addEventListener('model-loaded', function () {
    console.log('a-entities have been loaded')
  })

//check if camera is available
navigator.getMedia =
  navigator.getUserMedia || // use the proper vendor prefix
  navigator.webkitGetUserMedia ||
  navigator.mozGetUserMedia ||
  navigator.msGetUserMedia

navigator.getMedia(
  { video: true },
  function () {
    // webcam is available
    console.log('camera is availabe')
  },
  function () {
    // webcam is not available
    console.log('camera is NOT availabe')
  }
)

//check progress of downloading and loading GLTFs
function checkLoaded() {
  let counter = 0
  let ents = document.querySelectorAll('a-entity')
  let splashLoading = document.getElementById('percentage')
  let totalGltf = ents.length - 1
  let percentComplete

  for (let i = 0; i <= ents.length + 1; i++) {
    console.log('total gltf: ' + totalGltf)
    ents[i].addEventListener('model-loaded', () => {
      counter++

      console.log('counter: ' + counter)
      console.log('total gltf: ' + totalGltf)

      percentComplete = (counter / totalGltf) * 100
      let percentString = String(Math.round(percentComplete))
      splashLoading.innerHTML = percentString + '%'

      if (counter >= totalGltf) {
        splash.style.display = 'none'
      }
    })
  }
}

checkLoaded()
