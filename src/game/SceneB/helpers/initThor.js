export default function initThor (scene) {
  scene.player = scene.physics.add.sprite(512, 300, 'Thor').setScale(2, 2)
  scene.player.name = 'Thor'
  scene.player.setSize(22, 45, 0, 0).setOffset(24, 10)
  scene.player.alive = true
  scene.player.shootable = true
  scene.player.body.collideWorldBounds = true
  scene.player.facing = 'right'
  scene.player.bar = scene.add.graphics()
  scene.player.barMP = scene.add.graphics()
  scene.player.hp = 100
  scene.player.mp = 100
  scene.player.thorSwing = 0
  // Thor throws hammer
  scene.hammers = scene.physics.add.group()
  // Thor animations

  scene.anims.create({
    key: 'idle',
    frames: scene.anims.generateFrameNumbers('Thor', {
      start: 0,
      end: 0
    }),
    frameRate: 1,
    repeat: 0
  })
  scene.anims.create({
    key: 'walk',
    frames: scene.anims.generateFrameNumbers('Thor', {
      start: 2,
      end: 3
    }),
    frameRate: 4,
    yoyo: true,
    repeat: -1
  })
  scene.anims.create({
    key: 'attack',
    frames: scene.anims.generateFrameNumbers('Thor', {
      start: 9,
      end: 13
    }),
    frameRate: 10,
    repeat: -1
  })
  scene.anims.create({
    key: 'throw',
    frames: scene.anims.generateFrameNumbers('Thor', {
      start: 15,
      end: 15
    }),
    frameRate: 1,
    repeat: 0
  })
  scene.anims.create({
    key: 'hit',
    frames: scene.anims.generateFrameNumbers('Thor', {
      start: 24,
      end: 25
    }),
    frameRate: 3,
    repeat: 0
  })
  scene.anims.create({
    key: 'dead',
    frames: scene.anims.generateFrameNumbers('Thor', {
      start: 33,
      end: 35
    }),
    frameRate: 3,
    repeat: 0
  })
  scene.anims.create({
    key: 'hammer',
    frames: scene.anims.generateFrameNumbers('Thor', {
      start: 30,
      end: 30
    }),
    frameRate: 1,
    repeat: 0
  })
}
