export default function initSpiderMan (scene) {
  // spiderman animations and sprits setup
  scene.player = scene.physics.add.sprite(512, 300, 'spiderman').setScale(1, 1)
  scene.player.name = 'spiderman'
  scene.player.alive = true
  scene.player.body.setSize(55, 65, 10, 10)
  scene.player.body.collideWorldBounds = true
  scene.player.facing = 'right'
  scene.player.bar = scene.add.graphics()
  scene.player.hp = 100
  scene.anims.create({
    key: 'walk',
    frames: scene.anims.generateFrameNumbers('spiderman', {
      start: 1,
      end: 8
    }),
    frameRate: 10,
    repeat: -1
  })
  scene.anims.create({
    key: 'idle',
    frames: scene.anims.generateFrameNumbers('spiderman', {
      start: 0,
      end: 0
    }),
    frameRate: 10,
    repeat: -1
  })
  scene.anims.create({
    key: 'attack',
    frames: scene.anims.generateFrameNumbers('spiderman', {
      start: 53,
      end: 53
    }),
    frameRate: 10,
    repeat: -1
  })
  scene.anims.create({
    key: 'dead',
    frames: scene.anims.generateFrameNumbers('spiderman', {
      start: 120,
      end: 121
    }),
    frameRate: 5,
    repeat: -1
  })
}
