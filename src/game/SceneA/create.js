export default function create () {
  // background
  this.add.image(0, 0, 'background').setOrigin(0, 0)

  this.money = 0
  this.moneyChange = false
  this.doublejump = false

  // static text
  let playButton = this.add.text(1024 / 2 - 35, 768 / 2, 'Play', {
    fontSize: 33
  })
  playButton.setInteractive()
  playButton.on('pointerdown', () => {
    this.scene.start('SceneB')
  })
}
