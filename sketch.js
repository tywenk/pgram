// Your code will go here

// Open up your console - if everything loaded properly you should see the version number
// corresponding to the latest version of ml5 printed to the console and in the p5.js canvas.
console.log('ml5 version:', ml5.version)

let video
let poseNet
let pose
let easing = 0.08
const sensY = -2.5
const sensX = 1

function setup() {
  var myCanvas = createCanvas(1280, 720)
  myCanvas.parent('video-container')

  video = createCapture(
    {
      video: {
        mandatory: {
          minWidth: 1280,
          minHeight: 720,
        },
        optional: [{ maxFrameRate: 30 }],
      },
      audio: false,
    },
    VIDEO
  )

  video.hide()
  poseNet = ml5.poseNet(video, modelLoaded)
  poseNet.on('pose', gotPoses)
}

function gotPoses(poses) {
  // console.log(poses)

  if (poses.length > 0) {
    pose = poses[0].pose
    skeleton = poses[0].skeleton
  }
}

function modelLoaded() {
  console.log('poseNet ready')
}

function draw() {
  background(200)
  image(video, 0, 0)

  if (pose) {
    stroke(255, 0, 0)
    fill(255, 0, 0)

    //track nose and both ears
    let nose = createVector(pose.nose.x, pose.nose.y)
    let lEar = createVector(pose.leftEar.x, pose.leftEar.y)
    let rEar = createVector(pose.rightEar.x, pose.rightEar.y)

    //use distance between nose and ears to estimate face orientation
    distEarsX = lEar.x - rEar.x
    distX = ((nose.x - rEar.x) / distEarsX) * sensX
    posX = map(distX, 0, 1, 0, width)

    distNoseY = (lEar.y + rEar.y) / 2 - nose.y
    distY = (distNoseY / distEarsX) * sensY
    posY = map(distY, -1, 1, 0, height)
    // console.log(`posy is ${posY}`)

    //ease jittery-ness
    let targetX = posX
    let dx = targetX - rx
    rx += dx * easing

    let targetY = posY
    let dy = targetY - ry
    ry += dy * easing
    //draw ellipse

    strokeWeight(1)
    ellipse(rx, ry, 100, 100)

    strokeWeight(24)
    for (let i = 0; i < 5; i++) {
      point(pose.keypoints[i].position.x, pose.keypoints[i].position.y)
    }
  }
}
