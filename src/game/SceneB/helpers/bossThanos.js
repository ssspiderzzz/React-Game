export default function bossThanos (scene) {
  scene.boss = scene.physics.add.sprite(640, 400, 'Thanos').setScale(2, 2)
  scene.boss.name = 'Thanos'
  scene.boss
    .setSize(60, 90, 0, 0)
    .setOffset(25, 20)
    .setDepth(5)
  scene.boss.alive = true
  scene.boss.snapping = false
  scene.boss.infinityStones = {
    soul: false,
    time: false,
    space: false,
    mind: false,
    reality: false,
    power: false
  }
  scene.boss.invincible = false
  scene.boss.body.collideWorldBounds = true
  scene.boss.facing = 'right'
  scene.boss.bar = scene.add.graphics()
  scene.boss.hp = 99

  scene.physics.add.collider(scene.boss, scene.platforms)
  scene.physics.add.collider(scene.boss, scene.invisibleWalls)

  scene.anims.create({
    key: 'Thanos_idle',
    frames: scene.anims.generateFrameNumbers('Thanos', {
      start: 0,
      end: 0
    }),
    frameRate: 1,
    repeat: -1
  })
  scene.anims.create({
    key: 'Thanos_walk',
    frames: scene.anims.generateFrameNumbers('Thanos', {
      start: 1,
      end: 4
    }),
    frameRate: 5,
    repeat: -1
  })
  scene.anims.create({
    key: 'Thanos_snap',
    frames: scene.anims.generateFrameNumbers('Thanos', {
      start: 5,
      end: 8
    }),
    frameRate: 4,
    repeat: 0
  })
  scene.anims.create({
    key: 'Thanos_attack',
    frames: scene.anims.generateFrameNumbers('Thanos', {
      start: 9,
      end: 12
    }),
    frameRate: 4,
    repeat: 0
  })
}
