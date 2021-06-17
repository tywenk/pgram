AFRAME.registerComponent('headreactive', {
  schema: {},
  init: function () {
    console.log('reactive head component created')
  },
  update: function () {},
  tick: function () {
    const scaleX = d3.scaleLinear().domain([0, 1000]).range([-2, 2])
    const mappedValueX = scaleX(rx)

    const scaleY = d3.scaleLinear().domain([0, 1000]).range([-2, 2])
    const mappedValueY = scaleY(ry)

    // change rotation value of instanced object, y to x, x to y

    const objRotX = (this.el.object3D.rotation.y = mappedValueX)
    const objRotY = (this.el.object3D.rotation.x = mappedValueY)
  },
  remove: function () {},
  pause: function () {},
  play: function () {},
})

AFRAME.registerComponent('gltfchoice', {
  schema: {
    model: { type: 'string', default: '' },
  },
  init: function () {
    console.log('gltfchoice component created')

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
