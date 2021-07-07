//menu chooser toggle
document.getElementById("gltf-menu").addEventListener("change", function (e) {
  const newValue = e.target.value;
  console.log(newValue);
  activeModel = newValue;
});

// check if a-scene is loaded
document.addEventListener("DOMContentLoaded", function () {
  let scene = document.querySelector("a-scene");
  let splash = document.querySelector("#splash");
  scene.addEventListener("loaded", function (e) {
    // splash.style.display = 'none'
    console.log("a-scene has been loaded");
  });
});

// check if all entities are loaded
document
  .querySelector("a-entity")
  .addEventListener("model-loaded", function () {
    console.log("a-entities have been loaded");
  });

//check progress of downloading and loading GLTFs
function checkLoaded() {
  let counter = 0;
  let ents = document.querySelectorAll("a-entity");
  let splashLoading = document.getElementById("percentage");
  let totalGltf = ents.length - 1;
  let percentComplete;

  if (ents[3]) {
    for (let i = 0; i <= ents.length; i++) {
      ents[i].addEventListener("model-loaded", () => {
        counter++;

        //console.log('counter: ' + counter)
        //console.log('total gltf: ' + totalGltf)

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
  }
}

checkLoaded();
