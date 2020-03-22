export default function create () {
  let currentSelect = this.scene.settings.data.currentSelect

  let options = this.add.image(1024 / 2, 768 / 2, 'options').setOrigin(0.5)
  options.setDepth(99)

  let resume = this.add
    .rectangle(1024 / 2, 768 / 2 - 70, 275, 75, 0x00000)
    .setDepth(100)
    .setAlpha(0.001)
  let restart = this.add
    .rectangle(1024 / 2, 768 / 2 + 33, 275, 75, 0x00000)
    .setDepth(100)
    .setAlpha(0.001)
  let exit = this.add
    .rectangle(1024 / 2, 768 / 2 + 136, 275, 75, 0x00000)
    .setDepth(100)
    .setAlpha(0.001)

  options.setInteractive()
  resume.setInteractive()
  restart.setInteractive()
  exit.setInteractive()

  resume.on('pointerdown', () => {
    this.scene.stop('SceneC')
    this.scene.run('SceneB')
  })

  restart.on('pointerdown', () => {
    this.scene.stop('SceneC')
    this.scene.start('SceneB', { select: currentSelect })
  })

  exit.on('pointerdown', () => {
    this.anims.anims.clear()
    this.scene.stop('SceneC')
    this.scene.stop('SceneB')
    this.scene.run('SceneA')
  })
}
