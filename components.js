AFRAME.registerComponent("headreactive", {
  schema: {
    enabled: {
      type: "string",
      default: "true",
    },
  },
  init: function () {
    // console.log('reactive head component created')
  },
  update: function () {},
  tick: function () {
    const scaleX = d3.scaleLinear().domain([0, 1000]).range([-2, 2]);
    const mappedValueX = scaleX(rx);

    const scaleY = d3.scaleLinear().domain([0, 1000]).range([-0.4, 0.4]);
    const mappedValueY = scaleY(ry);

    const zoomZ = d3.scaleLinear().domain([100, 400]).range([4, 1]);
    const mappedValueZ = zoomZ(sz);

    // change rotation value of instanced object, y to x, x to y
    if (this.data.enabled == "true") {
      const objRotX = (this.el.object3D.rotation.y = -1 * mappedValueX);
      const objRotY = (this.el.object3D.rotation.x = mappedValueY);
      const objZoomZ = (document.querySelector(
        "a-entity[camera]"
      ).object3D.position.z = mappedValueZ);
    }

    if (this.data.enabled == "false") {
    }
  },
  remove: function () {},
  pause: function () {},
  play: function () {},
});

AFRAME.registerComponent("gltfchoice", {
  schema: {
    model: {
      type: "string",
      default: "",
    },
  },
  init: function () {
    // console.log('gltfchoice component created')

    this.previousModel = activeModel;
  },
  update: function () {},
  tick: function () {
    // console.log(this.model, activeModel);
    this.el.object3D.visible = this.data.model === activeModel;
  },
  remove: function () {},
  pause: function () {},
  play: function () {},
});

AFRAME.registerComponent("log", {
  schema: {
    type: "string",
  },
  init: function () {
    var stringToLog = this.data;
    console.log(stringToLog);
  },
});
