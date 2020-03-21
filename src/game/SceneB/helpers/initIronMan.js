export default function initIronMan (scene) {
  scene.player = scene.physics.add.sprite(512, 300, 'IronMan').setScale(2, 2)
  scene.player.name = 'IronMan'
  scene.player.setSize(21, 45, 0, 0).setOffset(17, 10)
  scene.player.alive = true
  scene.player.shootable = true
  scene.player.shootCount = 0
  scene.player.body.collideWorldBounds = true
  scene.player.facing = 'right'
  scene.player.bar = scene.add.graphics()
  scene.player.barMP = scene.add.graphics()
  scene.player.hp = 100
  scene.player.mp = 100

  // main core power laser: when power reach 150%,
  //      Iron Man can fire out a powerful laser from the main chest reactor
  // arc reactor (passive): regenerates energy faster

  // IronMan shoots beams
  scene.beams = scene.physics.add.group()
  scene.uniBeams = scene.physics.add.group()
  // IronMan animations
  scene.anims.create({
    key: 'idle',
    frames: scene.anims.generateFrameNumbers('IronMan', {
      start: 0,
      end: 0
    }),
    frameRate: 1,
    repeat: -1
  })
  scene.anims.create({
    key: 'walk',
    frames: scene.anims.generateFrameNumbers('IronMan', {
      start: 3,
      end: 3
    }),
    frameRate: 1,
    repeat: -1
  })
  scene.anims.create({
    key: 'attack',
    frames: scene.anims.generateFrameNumbers('IronMan', {
      start: 8,
      end: 8
    }),
    frameRate: 5,
    repeat: -1
  })
  scene.anims.create({
    key: 'attack2',
    frames: scene.anims.generateFrameNumbers('IronMan', {
      start: 9,
      end: 9
    }),
    frameRate: 5,
    repeat: -1
  })
  scene.anims.create({
    key: 'hit',
    frames: scene.anims.generateFrameNumbers('IronMan', {
      start: 16,
      end: 17
    }),
    frameRate: 3,
    repeat: 0
  })
  scene.anims.create({
    key: 'dead',
    frames: scene.anims.generateFrameNumbers('IronMan', {
      start: 21,
      end: 23
    }),
    frameRate: 3,
    repeat: 0
  })
  scene.anims.create({
    key: 'beam',
    frames: scene.anims.generateFrameNumbers('IronMan', {
      start: 25,
      end: 26
    }),
    frameRate: 3,
    repeat: 0
  })
  scene.anims.create({
    key: 'special',
    frames: scene.anims.generateFrameNumbers('IronMan', {
      start: 13,
      end: 13
    }),
    frameRate: 1,
    repeat: 0
  })
  scene.anims.create({
    key: 'specialShoot',
    frames: scene.anims.generateFrameNumbers('IronMan', {
      start: 14,
      end: 14
    }),
    frameRate: 1,
    repeat: 0
  })
  scene.anims.create({
    key: 'uniBeam',
    frames: scene.anims.generateFrameNumbers('IronMan', {
      start: 27,
      end: 28
    }),
    frameRate: 6,
    repeat: -1
  })
}
