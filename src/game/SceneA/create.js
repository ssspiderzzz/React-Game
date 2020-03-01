export default function create () {
  // background
  this.add.image(0, 0, 'background').setOrigin(0, 0)

  // face icons
  let iron_man_face = this.add
    .image(1024 / 2 - 150, 300, 'iron_man_face')
    .setScale(2, 2)
  let captain_america_face = this.add
    .image(1024 / 2, 300, 'captain_america_face')
    .setScale(2, 2)
  let thor_face = this.add
    .image(1024 / 2 + 150, 300, 'thor_face')
    .setScale(2, 2)
  iron_man_face.setInteractive()
  captain_america_face.setInteractive()
  thor_face.setInteractive()

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
