export default function initThor (scene) {
  scene.player = scene.physics.add.sprite(512, 300, 'Thor').setScale(2, 2)
  scene.player.name = 'Thor'
  scene.player.setSize(22, 45, 0, 0).setOffset(24, 10)
  scene.player.alive = true
  scene.player.shootable = true
  scene.player.body.collideWorldBounds = true
  scene.player.facing = 'right'
  scene.player.bar = scene.add.graphics()
  scene.player.hp = 100
  // Thor throws hammer
  scene.hammers = scene.physics.add.group()
  scene.hammers_hit = scene.physics.add.group()
  // Thor animations

  scene.anims.create({
    key: 'idle',
    frames: scene.anims.generateFrameNumbers('Thor', {
      start: 0,
      end: 0
    }),
    frameRate: 1,
    repeat: -1
  })
  scene.anims.create({
    key: 'walk',
    frames: scene.anims.generateFrameNumbers('Thor', {
      start: 5,
      end: 7
    }),
    frameRate: 7,
    yoyo: true,
    repeat: -1
  })
  scene.anims.create({
    key: 'attack',
    frames: scene.anims.generateFrameNumbers('Thor', {
      start: 10,
      end: 12
    }),
    frameRate: 10,
    repeat: 0
  })
  scene.anims.create({
    key: 'hit',
    frames: scene.anims.generateFrameNumbers('Thor', {
      start: 19,
      end: 20
    }),
    frameRate: 3,
    repeat: 0
  })
  scene.anims.create({
    key: 'dead',
    frames: scene.anims.generateFrameNumbers('Thor', {
      start: 24,
      end: 26
    }),
    frameRate: 3,
    repeat: 0
  })
  scene.anims.create({
    key: 'shield',
    frames: scene.anims.generateFrameNumbers('Thor', {
      start: 28,
      end: 28
    }),
    frameRate: 1,
    repeat: 0
  })
  scene.anims.create({
    key: 'shield_hit',
    frames: scene.anims.generateFrameNumbers('hit_effect', {
      start: 0,
      end: 7
    }),
    frameRate: 7,
    repeat: 0
  })
}
