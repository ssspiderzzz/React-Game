export default function initCaptainAmerica (scene) {
  scene.player = scene.physics.add
    .sprite(640, 200, 'CaptainAmerica')
    .setScale(2, 2)
  scene.player.name = 'CaptainAmerica'
  scene.player.setSize(22, 45, 0, 0).setOffset(24, 10)
  scene.player.alive = true
  scene.player.meleeAttack = false
  scene.player.shieldOn = true
  scene.player.shootable = true
  scene.player.invincible = false
  scene.player.body.collideWorldBounds = true
  scene.player.facing = 'right'
  scene.player.bar = scene.add.graphics()
  scene.player.barMP = scene.add.graphics()
  scene.player.hp = 100
  scene.player.mp = 100
  // CaptainAmerica throws shield
  scene.shields = scene.physics.add.group()
  // CaptainAmerica animations

  scene.anims.create({
    key: 'idle',
    frames: scene.anims.generateFrameNumbers('CaptainAmerica', {
      start: 0,
      end: 0
    }),
    frameRate: 1,
    repeat: -1
  })
  scene.anims.create({
    key: 'walk',
    frames: scene.anims.generateFrameNumbers('CaptainAmerica', {
      start: 5,
      end: 7
    }),
    frameRate: 7,
    yoyo: true,
    repeat: -1
  })
  scene.anims.create({
    key: 'attack',
    frames: scene.anims.generateFrameNumbers('CaptainAmerica', {
      start: 10,
      end: 12
    }),
    frameRate: 20,
    repeat: 0
  })
  scene.anims.create({
    key: 'melee',
    frames: scene.anims.generateFrameNumbers('CaptainAmerica', {
      start: 12,
      end: 12
    }),
    frameRate: 7,
    repeat: 0
  })
  scene.anims.create({
    key: 'throw',
    frames: scene.anims.generateFrameNumbers('CaptainAmerica', {
      start: 12,
      end: 12
    }),
    frameRate: 1,
    repeat: 0
  })
  scene.anims.create({
    key: 'block',
    frames: scene.anims.generateFrameNumbers('CaptainAmerica', {
      start: 17,
      end: 17
    }),
    frameRate: 1,
    repeat: 0
  })
  scene.anims.create({
    key: 'hit',
    frames: scene.anims.generateFrameNumbers('CaptainAmerica', {
      start: 19,
      end: 20
    }),
    frameRate: 3,
    repeat: 0
  })
  scene.anims.create({
    key: 'dead',
    frames: scene.anims.generateFrameNumbers('CaptainAmerica', {
      start: 24,
      end: 26
    }),
    frameRate: 3,
    repeat: 0
  })
  scene.anims.create({
    key: 'shield',
    frames: scene.anims.generateFrameNumbers('CaptainAmerica', {
      start: 28,
      end: 28
    }),
    frameRate: 1,
    repeat: 0
  })
}
