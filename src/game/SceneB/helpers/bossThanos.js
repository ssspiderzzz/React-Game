import {
  thorHammerReturn,
  knockBack,
  hitEffect,
  hitEffectLightning,
  drawDamageText
} from '../helpers'

export default function bossThanos (scene) {
  scene.boss = scene.physics.add.sprite(640, 400, 'Thanos').setScale(2, 2)
  scene.boss.name = 'Thanos'
  scene.boss
    .setSize(60, 90, 0, 0)
    .setOffset(25, 20)
    .setDepth(5)
    .setOrigin(0.5)
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
  scene.boss.hurtable = true
  scene.boss.body.collideWorldBounds = true
  scene.boss.facing = 'right'
  scene.boss.bar = scene.add.graphics()
  scene.boss.hp = 99

  scene.physics.add.collider(scene.boss, scene.platforms)
  scene.physics.add.collider(scene.boss, scene.invisibleWalls)
  scene.physics.add.collider(scene.player, scene.boss, (player, boss) => {
    if (!scene.player.invincible) {
      let floatbossDmg = Math.floor(Math.random() * 15) + 5
      scene.player.hp -= floatbossDmg
      drawDamageText(scene, player, floatbossDmg)
    } else {
      boss.hp -= 10
    }
    knockBack(scene, player, boss)
  })

  if (scene.player.name === 'IronMan') {
    scene.physics.add.overlap(scene.beams, scene.boss, (thanos, beam) => {
      hitEffect(scene, beam)
      beam.disableBody(true, true)
      thanos.hp -= (Math.floor(Math.random() * 15) + 15) / 6
    })
    scene.physics.add.overlap(scene.uniBeams, scene.boss, (thanos, uniBeam) => {
      thanos.hp -= (Math.floor(Math.random() * 1) + 1) / 6
    })
  }

  if (scene.player.name === 'CaptainAmerica') {
    scene.physics.world.on(
      'worldbounds',
      () => {
        scene.boss.hurtable = true
      },
      scene
    )
    scene.physics.add.overlap(scene.shields, scene.boss, (thanos, shield) => {
      if (thanos.hurtable) {
        thanos.hurtable = false
        hitEffect(scene, shield)
        thanos.hp -= (Math.floor(Math.random() * 20) + 18) / 6
        setTimeout(() => {
          thanos.hurtable = true
        }, 200)
      }
    })
  }

  if (scene.player.name === 'Thor') {
    scene.physics.add.overlap(scene.hammers, scene.boss, (thanos, hammer) => {
      if (hammer.damageable) {
        hammer.damageable = false
        thorHammerReturn(scene.player, hammer)
        hitEffect(scene, hammer)
        thanos.hp -= (Math.floor(Math.random() * 20) + 25) / 6
      }
    })
    scene.physics.add.overlap(
      scene.boss,
      scene.lightningRods,
      (thanos, lightningRod) => {
        if (thanos.hurtable) {
          thanos.hp -= (Math.floor(Math.random() * 50) + 30) / 6
          thanos.hurtable = false
          setTimeout(() => {
            thanos.hurtable = true
          }, 300)
          hitEffectLightning(scene, thanos)
        }
      }
    )
  }

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
  scene.anims.create({
    key: 'Thanos_die',
    frames: scene.anims.generateFrameNumbers('Thanos', {
      start: 13,
      end: 17
    }),
    frameRate: 3,
    repeat: 0
  })
}
