export default function create () {
  // background
  this.add.image(0, 0, 'background').setOrigin(0, 0)
  this.add
    .image(1024 / 2, 100, 'title')
    .setOrigin(0.5)
    .setScale(0.5, 0.5)

  // face icons
  let iron_man_face = this.add
    .image(1024 / 2 - 150, 400, 'iron_man_face')
    .setScale(2, 2)
  let captain_america_face = this.add
    .image(1024 / 2, 400, 'captain_america_face')
    .setScale(2, 2)
  let thor_face = this.add
    .image(1024 / 2 + 150, 400, 'thor_face')
    .setScale(2, 2)

  iron_man_face.setInteractive()
  captain_america_face.setInteractive()
  thor_face.setInteractive()

  this.selectName = this.add.text()
  iron_man_face.on('pointerdown', () => {
    this.select = 'IronMan'
    this.selectName.destroy()
    this.selectName = this.add
      .text(1024 / 2 - 150, 300, ['Iron Man', '(Tony Stark)'], {
        fontSize: 22,
        align: 'center'
      })
      .setOrigin(0.5)
    this.playButton.setVisible(true)
    this.IronMan.anims.play('IronManMove', true)
    this.CaptainAmerica.anims.play('CaptainAmericaIdle', true)
    this.Thor.anims.play('ThorIdle', true)
  })
  captain_america_face.on('pointerdown', () => {
    this.select = 'CaptainAmerica'
    this.selectName.destroy()
    this.selectName = this.add
      .text(1024 / 2, 300, ['Captain America', '(Steve Rogers)'], {
        fontSize: 22,
        align: 'center'
      })
      .setOrigin(0.5)
    this.playButton.setVisible(true)
    this.IronMan.anims.play('IronManIdle', true)
    this.CaptainAmerica.anims.play('CaptainAmericaMove', true)
    this.Thor.anims.play('ThorIdle', true)
  })
  thor_face.on('pointerdown', () => {
    this.select = 'Thor'
    this.selectName.destroy()
    this.selectName = this.add
      .text(1024 / 2 + 150, 300, ['Thor', '(God of Thunder)'], {
        fontSize: 22,
        align: 'center'
      })
      .setOrigin(0.5)
    this.playButton.setVisible(true)
    this.IronMan.anims.play('IronManIdle', true)
    this.CaptainAmerica.anims.play('CaptainAmericaIdle', true)
    this.Thor.anims.play('ThorMove', true)
  })

  this.IronMan = this.physics.add
    .sprite(1024 / 2 - 150, 500, 'IronMan')
    .setScale(2, 2)
  this.IronMan.setSize(22, 45, 0, 0).setOffset(24, 10)
  this.IronMan.body.allowGravity = false
  this.anims.create({
    key: 'IronManIdle',
    frames: this.anims.generateFrameNumbers('IronMan', {
      start: 0,
      end: 0
    }),
    frameRate: 1,
    repeat: 0
  })
  this.anims.create({
    key: 'IronManMove',
    frames: this.anims.generateFrameNumbers('IronMan', {
      start: 13,
      end: 14
    }),
    frameRate: 5,
    repeat: 0
  })
  this.IronMan.anims.play('IronManIdle', true)
  this.IronMan.flipX = true

  this.CaptainAmerica = this.physics.add
    .sprite(1024 / 2, 500, 'CaptainAmerica')
    .setScale(2, 2)
  this.CaptainAmerica.setSize(22, 45, 0, 0).setOffset(24, 10)
  this.CaptainAmerica.body.allowGravity = false
  this.anims.create({
    key: 'CaptainAmericaIdle',
    frames: this.anims.generateFrameNumbers('CaptainAmerica', {
      start: 16,
      end: 16
    }),
    frameRate: 1,
    repeat: 0
  })
  this.anims.create({
    key: 'CaptainAmericaMove',
    frames: this.anims.generateFrameNumbers('CaptainAmerica', {
      start: 8,
      end: 12
    }),
    frameRate: 7,
    repeat: 0
  })
  this.CaptainAmerica.anims.play('CaptainAmericaIdle', true)

  this.Thor = this.physics.add
    .sprite(1024 / 2 + 150, 500, 'Thor')
    .setScale(2, 2)
  this.Thor.setSize(22, 45, 0, 0).setOffset(24, 10)
  this.Thor.body.allowGravity = false
  this.anims.create({
    key: 'ThorIdle',
    frames: this.anims.generateFrameNumbers('Thor', {
      start: 0,
      end: 0
    }),
    frameRate: 1,
    repeat: 0
  })
  this.anims.create({
    key: 'ThorMove',
    frames: this.anims.generateFrameNumbers('Thor', {
      start: 9,
      end: 13
    }),
    frameRate: 10,
    repeat: -1
  })
  this.Thor.anims.play('ThorIdle', true)

  // static text
  this.playButton = this.add
    .text(1024 / 2, 600, 'Play', {
      fontSize: 33
    })
    .setOrigin(0.5)
  this.playButton.setVisible(false)
  this.playButton.setInteractive()
  this.playButton.on('pointerdown', () => {
    this.scene.start('SceneB', { select: this.select })
  })
}
