AFRAME.registerComponent('headreactive', {
  schema: {},
  init: function () {
    // console.log('reactive head component created')
  },
  update: function () {},
  tick: function () {
    const scaleX = d3.scaleLinear().domain([0, 1000]).range([-2, 2])
    const mappedValueX = scaleX(rx)

    const scaleY = d3.scaleLinear().domain([0, 1000]).range([-0.4, 0.4])
    const mappedValueY = scaleY(ry)

    const zoomZ = d3.scaleLinear().domain([100, 400]).range([0, 4])
    const mappedValueZ = zoomZ(sz)

    // change rotation value of instanced object, y to x, x to y

    const objRotX = (this.el.object3D.rotation.y = -1 * mappedValueX)
    const objRotY = (this.el.object3D.rotation.x = mappedValueY)
    const objZoomZ = (this.el.object3D.position.z = mappedValueZ)
  },
  remove: function () {},
  pause: function () {},
  play: function () {},
})

AFRAME.registerComponent('gltfchoice', {
  schema: {
    model: {
      type: 'string',
      default: '',
    },
  },
  init: function () {
    // console.log('gltfchoice component created')

    this.previousModel = activeModel
  },
  update: function () {},
  tick: function () {
    // console.log(this.model, activeModel)
    this.el.object3D.visible = this.data.model === activeModel
  },
  remove: function () {},
  pause: function () {},
  play: function () {},
})

AFRAME.registerComponent('log', {
  schema: {
    type: 'string',
  },
  init: function () {
    var stringToLog = this.data
    console.log(stringToLog)
  },
})
