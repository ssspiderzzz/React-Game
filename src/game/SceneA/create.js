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

  this.selectName = this.add.text()
  iron_man_face.on('pointerdown', () => {
    this.select = 'IronMan'
    this.selectName.destroy()
    this.selectName = this.add
      .text(1024 / 2 - 150, 200, ['Iron Man', '(Tony Stark)'], {
        fontSize: 22,
        align: 'center'
      })
      .setOrigin(0.5)
  })
  captain_america_face.on('pointerdown', () => {
    this.select = 'CaptainAmerica'
    this.selectName.destroy()
    this.selectName = this.add
      .text(1024 / 2, 200, ['Captain America', '(Steve Rogers)'], {
        fontSize: 22,
        align: 'center'
      })
      .setOrigin(0.5)
  })
  thor_face.on('pointerdown', () => {
    this.select = 'Thor'
    this.selectName.destroy()
    this.selectName = this.add
      .text(1024 / 2 + 150, 200, ['Thor', '(God of Thunder)'], {
        fontSize: 22,
        align: 'center'
      })
      .setOrigin(0.5)
  })

  this.money = 0
  this.moneyChange = false
  this.doublejump = false

  // static text
  let playButton = this.add
    .text(1024 / 2, 768 / 2, 'Play', {
      fontSize: 33
    })
    .setOrigin(0.5)
  playButton.setInteractive()
  playButton.on('pointerdown', () => {
    this.scene.start('SceneB', { select: this.select })
  })
}
