AFRAME.registerComponent('headreactive', {
  schema: {},
  init: function () {
    console.log('reactive head component created')
  },
  update: function () {},
  tick: function () {
    // console.log(map())

    // 2100 to 90

    const scaleX = d3.scaleLinear().domain([0, 1000]).range([-1, 1])
    const mappedValueX = scaleX(x)

    const scaleY = d3.scaleLinear().domain([0, 1000]).range([-1, 1])
    const mappedValueY = scaleY(y)

    // console.log(mappedValue)

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
