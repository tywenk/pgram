//menu chooser toggle
document.getElementById("gltf-menu").addEventListener("change", function (e) {
  const newValue = e.target.value;
  activeModel = newValue;
});

// check if a-scene is loaded
document.addEventListener("DOMContentLoaded", function () {
  let scene = document.querySelector("a-scene");
  let splash = document.querySelector("#splash");
  scene.addEventListener("loaded", function (e) {
    console.log("a-scene has been loaded");
  });
});

// check if all entities are loaded
document
  .querySelector("a-entity")
  .addEventListener("model-loaded", function () {
    console.log("a-entities have been loaded");
  });

//check progress of downloading and loading GLTFs and calculates percentage
function checkLoaded() {
  let counter = 0;
  let ents = document.querySelectorAll("#modelid");
  let splashLoading = document.getElementById("percentage");
  let totalGltf = ents.length - 1;
  let percentComplete;

  if (ents.length == 8) {
    for (let i = 0; i <= ents.length; i++) {
      ents[i].addEventListener("model-loaded", () => {
        counter++;
        percentComplete = (counter / totalGltf) * 100;
        let percentString = String(Math.round(percentComplete));
        splashLoading.innerHTML = percentString + "%";

        if (counter >= totalGltf) {
          document.getElementById("splash").style.display = "none";
          // document.getElementById('percentage').style.display = 'none'
          // document.getElementById('instructions').innerHTML =
          //   'Loading camera...'
        }
      });
    }
  } else {
    console.log("ents length != 8");
  }
}

checkLoaded();

function toggleButtonClick() {
  const p = document.getElementById("toggleButton");
  const t = document.getElementById("tooltip");
  const models = document.querySelectorAll("#modelid");
  const cam = document.querySelector("a-entity[camera]");

  if (this.value == "true") {
    this.value = "false";
    p.innerHTML = "Use Face 🥸";
    t.innerHTML = "(Requires camera) Rotate head and move closer to navigate.";

    cam.setAttribute("look-controls", "enabled", "true");
    cam.setAttribute("wasd-controls", "enabled", "true");

    if (models) {
      for (i = 0; i < models.length; i++) {
        let c = models[i].setAttribute("headreactive", "enabled", "false");
      }
    }
  } else {
    this.value = "true";
    p.innerHTML = "Use Cursor 🐭";
    t.innerHTML = "Click and drag to rotate view. WASD to move around scene.";

    cam.setAttribute("look-controls", "enabled", "false");
    cam.setAttribute("wasd-controls", "enabled", "false");
    cam.setAttribute("position", "0 1.2 5");
    cam.setAttribute("rotation", "0 0 0");

    if (models) {
      for (i = 0; i < models.length; i++) {
        let c = models[i].setAttribute("headreactive", "enabled", "true");
      }
    }
  }
}
