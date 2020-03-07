export default function create () {
  let options = this.add.image(1024 / 2, 768 / 2, 'options').setOrigin(0.5)
  options.setDepth(99)
  options.setInteractive()
  options.on('pointerdown', () => {
    this.scene.resume('SceneB')
    options.setVisible(false)
  })
}
