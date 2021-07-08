// console.log('ml5 version:', ml5.version)

let video;
let poseNet;
let pose;
let easing = 0.007;
const yGap = -40;
const sensY = -1;
const sensX = 1;

function setup() {
  var myCanvas = createCanvas(1280, 720);
  myCanvas.parent("video-container");

  video = createCapture(
    {
      video: {
        mandatory: {
          minWidth: 1280,
          minHeight: 720,
        },
        optional: [
          {
            maxFrameRate: 30,
          },
        ],
      },
      audio: false,
    },
    VIDEO
  );

  video.hide();
  poseNet = ml5.poseNet(
    video,
    {
      architecture: "MobileNetV1",
      imageScaleFactor: 0.3,
      outputStride: 16,
      flipHorizontal: false,
      minConfidence: 0.7,
      maxPoseDetections: 1,
      scoreThreshold: 0.7,
      nmsRadius: 200,
      detectionType: "single",
      inputResolution: 193,
      multiplier: 0.5,
      quantBytes: 2,
    },
    modelLoaded
  );
  poseNet.on("pose", gotPoses);
}

function gotPoses(poses) {
  // console.group(poses)

  if (poses.length > 0) {
    pose = poses[0].pose;
  }
}

function modelLoaded() {
  console.log("poseNet loaded");
  poseModelLoaded = true;
}

function draw() {
  clear();

  // image(video, 0, 0)

  if (pose) {
    stroke(255, 0, 0);
    fill(255, 0, 0);

    //track nose and both ears
    let nose = createVector(pose.nose.x, pose.nose.y);
    let lEar = createVector(pose.leftEar.x, pose.leftEar.y);
    let rEar = createVector(pose.rightEar.x, pose.rightEar.y);

    //use distance between nose and ears to estimate face orientation
    distEarsX = lEar.x - rEar.x;
    distX = ((nose.x - rEar.x) / distEarsX) * sensX;
    posX = map(distX, 0, 1, 0, width, [0, width]);

    //distance for y rotation
    distNoseY = (lEar.y + rEar.y) / 2 - nose.y + yGap;
    distY = (distNoseY / distEarsX) * sensY;
    posY = map(distY, -1, 1, 0, height, [0, height]);

    //ease jittery-ness
    let targetX = posX;
    let dx = targetX - rx;
    rx += dx * easing;

    let targetY = posY;
    let dy = targetY - ry;
    ry += dy * easing;

    let targetZ = distEarsX;
    let dz = targetZ - sz;
    sz += dz * easing;

    // draw ellipse
    strokeWeight(1);
    // ellipse(rx, ry, 40, 40);

    strokeWeight(24);
    for (let i = 0; i < 5; i++) {
      point(pose.keypoints[i].position.x, pose.keypoints[i].position.y);
    }
  }
}
