export default function initCaptainAmerica (scene) {
  scene.boss = scene.physics.add
    .sprite(640, 200, 'CaptainAmerica')
    .setScale(2, 2)
  scene.boss.name = 'CaptainAmerica'
  scene.boss.setSize(22, 45, 0, 0).setOffset(24, 10)
  scene.boss.alive = true
  scene.boss.shieldOn = true
  scene.boss.shootable = true
  scene.boss.invincible = false
  scene.boss.body.collideWorldBounds = true
  scene.boss.facing = 'right'
  scene.boss.bar = scene.add.graphics()
  scene.boss.barMP = scene.add.graphics()
  scene.boss.hp = 500
  scene.boss.mp = 100
}
