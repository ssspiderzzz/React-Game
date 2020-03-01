export default function create () {
  // background
  this.add.image(0, 0, 'background').setOrigin(0, 0)

  // face icons
  this.face = this.add.image(1024 / 2 - 300, 200, 'ironman_icon')

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
