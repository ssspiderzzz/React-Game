import Phaser from 'phaser'
import initIronMan from './helpers/initIronMan'
import initCaptainAmerica from './helpers/initCaptainAmerica'
import initThor from './helpers/initThor'
import {
  captainShieldReturn,
  thorHammerReturn,
  knockBack,
  hitEffect,
  drawDamageText
} from './helpers'
import store from '../../store'

export default function create () {
  let name = this.select

  // timmer
  this.timeText = this.add
    .text(512, 35)
    .setDepth(5)
    .setOrigin(0.5)
  this.timer = 0
  this.startTimer = false
  this.triggerOnce = 1

  // background
  this.add.image(0, 0, 'background').setOrigin(0, 0)

  let pause = this.add.image(984, 40, 'pause').setOrigin(0.5)
  pause.setScale(0.5, 0.5)
  pause.setInteractive()
  pause.on('pointerdown', () => {
    this.scene.pause()
    this.scene.launch('SceneC', { currentSelect: this.select })
    transitionBlack.setAlpha(0.5)
  })

  this.events.on('resume', function () {
    transitionBlack.setAlpha(0)
  })

  // transition
  let transitionBlack = this.add.graphics()
  transitionBlack.fillStyle(0x000000)
  transitionBlack.fillRect(0, 0, 1024, 768)
  transitionBlack.setAlpha(1)
  transitionBlack.setDepth(98)
  this.tweens.add({
    targets: transitionBlack,
    alpha: { value: 0, duration: 500, ease: 'Power1' }
  })

  // player
  if (name === 'IronMan') initIronMan(this)
  if (name === 'CaptainAmerica') initCaptainAmerica(this)
  if (name === 'Thor') initThor(this)

  // coins
  this.coins = this.physics.add.group({
    key: 'coin',
    repeat: 9,
    setXY: { x: 20, y: 0, stepX: 110 }
  })
  this.anims.create({
    key: 'coin_spin',
    frames: this.anims.generateFrameNumbers('coin', {
      start: 0,
      end: 5
    }),
    frameRate: 10,
    repeat: -1
  })
  this.coins.children.iterate(coin => {
    coin.body.collideWorldBounds = true
    coin.anims.play('coin_spin', true)
    coin.setScale(0.5, 0.5)
    coin.setBounceY(Phaser.Math.FloatBetween(0.6, 0.6))
    coin.setBounceX(Phaser.Math.FloatBetween(0.6, 0.6))
  })

  // hit effects
  this.hitEffects = this.physics.add.group()
  this.anims.create({
    key: 'hit_effect',
    frames: this.anims.generateFrameNumbers('hit_effect', {
      start: 0,
      end: 7
    }),
    frameRate: 7,
    repeat: 0
  })

  // slimes
  this.slimes = this.physics.add.group({
    key: 'slime_blue',
    repeat: 2,
    setXY: { x: 100, y: 650, stepX: 412 }
  })
  this.slimes.create(160, 450, 'slime_red')
  this.slimes.create(864, 450, 'slime_red')
  this.anims.create({
    key: 'slime_blue',
    frames: this.anims.generateFrameNumbers('slime', {
      start: 0,
      end: 2
    }),
    frameRate: 5,
    repeat: -1,
    yoyo: true
  })
  this.anims.create({
    key: 'slime_red',
    frames: this.anims.generateFrameNumbers('slime', {
      start: 9,
      end: 11
    }),
    frameRate: 5,
    repeat: -1,
    yoyo: true
  })
  this.slimes.children.iterate((slime, index) => {
    slime.bar = this.add.graphics()
    slime.hurtable = true
    slime.hp = 100
    slime.body.collideWorldBounds = true
    slime.setScale(2, 2)
    if (index < 3) {
      slime.anims.play('slime_blue', true)
      slime.slimeType = 'blue'
    }
    if (index === 3 || index === 4) {
      slime.anims.play('slime_red', true)
      slime.slimeType = 'red'
    }
  })

  // red projectile from slime
  this.red_projectiles = this.physics.add.group()
  this.anims.create({
    key: 'red_projectile',
    frames: this.anims.generateFrameNumbers('red_projectile', {
      start: 0,
      end: 5
    }),
    frameRate: 5,
    repeat: 0
  })

  // platforms
  this.platforms = this.physics.add.staticGroup()

  this.platforms
    .create(1024 / 2, 600, 'tiles', 0)
    .setScale(8, 1)
    .refreshBody()
  this.platforms
    .create(160, 500, 'tiles', 0)
    .setScale(10, 1)
    .refreshBody()
  this.platforms
    .create(1024 - 160, 500, 'tiles', 0)
    .setScale(10, 1)
    .refreshBody()

  this.platforms
    .create(1024 / 2, 400, 'tiles', 3)
    .setScale(3, 1)
    .refreshBody()
  this.platforms
    .create((32 * 6) / 2, 300, 'tiles', 3)
    .setScale(6, 1)
    .refreshBody()
  this.platforms
    .create(1024 - (32 * 6) / 2, 300, 'tiles', 3)
    .setScale(6, 1)
    .refreshBody()

  this.platforms
    .create(0, 752, 'tiles', 1)
    .setScale(64, 1)
    .refreshBody()

  // invisible walls
  this.invisibleWalls = this.physics.add.staticGroup()
  this.invisibleWalls
    .create(320, 470, 'tiles', 1)
    .setScale(0.1, 1)
    .setAlpha(0)
    .refreshBody()
  this.invisibleWalls
    .create(704, 470, 'tiles', 1)
    .setScale(0.1, 1)
    .setAlpha(0)
    .refreshBody()
  this.invisibleWalls
    .create(320, 736, 'tiles', 1)
    .setScale(0.1, 1)
    .setAlpha(0)
    .refreshBody()
  this.invisibleWalls
    .create(704, 736, 'tiles', 1)
    .setScale(0.1, 1)
    .setAlpha(0)
    .refreshBody()

  // controls
  this.keyZ = this.input.keyboard.addKey('Z')
  this.keyX = this.input.keyboard.addKey('X')
  this.cursors = this.input.keyboard.createCursorKeys()
  if (store.getState().mobileDevice) {
    // virtual joystick
    let joystick = this.plugins.get('rexvirtualjoystickplugin').add(this, {
      x: 100,
      y: 650,
      radius: 50
      // base: baseGameObject,
      // thumb: thumbGameObject,
      // dir: '8dir',
      // forceMin: 16,
      // fixed: true,
      // enable: true
    })
    this.joystickCursors = joystick.createCursorKeys()
    this.cursors = this.joystickCursors
  }

  this.physics.add.collider(this.player, this.platforms)
  this.physics.add.collider(this.coins, this.platforms)
  this.physics.add.collider(this.player, this.coins, (player, coin) => {
    this.money++
    this.moneyChange = true
    coin.disableBody(true, true)
    coin.destroy()
  })
  this.physics.add.collider(this.slimes, this.platforms)
  this.physics.add.collider(this.slimes, this.invisibleWalls)
  this.physics.add.collider(this.player, this.slimes, (player, slime) => {
    if (!this.player.invincible) {
      let floatSlimeDmg = Math.floor(Math.random() * 10) + 5
      this.player.hp -= floatSlimeDmg
      drawDamageText(this, player, floatSlimeDmg)
    } else {
      slime.hp -= 30
    }
    knockBack(this, player, slime)
  })

  this.physics.add.collider(
    this.player,
    this.red_projectiles,
    (player, red_projectile) => {
      if (!this.player.invincible) {
        let floatProjectileDmg = Math.floor(Math.random() * 15) + 15
        this.player.hp -= floatProjectileDmg
        drawDamageText(this, player, floatProjectileDmg)
        knockBack(this, player, red_projectile)
      }
      hitEffect(this, red_projectile)
      red_projectile.disableBody(true, true)
      red_projectile.destroy()
    }
  )

  if (this.player.name === 'IronMan') {
    this.physics.add.overlap(this.beams, this.slimes, (beam, slime) => {
      hitEffect(this, beam)
      beam.disableBody(true, true)
      slime.hp -= Math.floor(Math.random() * 15) + 15
    })
    this.physics.add.overlap(this.uniBeams, this.slimes, (uniBeam, slime) => {
      slime.hp -= Math.floor(Math.random() * 1) + 1
    })
  }

  if (this.player.name === 'CaptainAmerica') {
    this.physics.world.on(
      'worldbounds',
      () => {
        this.shields.children.iterate(shield => {
          captainShieldReturn(this.player, shield)
          this.slimes.children.iterate(slime => {
            slime.hurtable = true
          })
        })
      },
      this
    )
    this.physics.add.overlap(this.shields, this.slimes, (shield, slime) => {
      if (slime.hurtable) {
        slime.hurtable = false
        hitEffect(this, shield)
        slime.hp -= Math.floor(Math.random() * 20) + 18
        setTimeout(() => {
          slime.hurtable = true
        }, 200)
      }
    })
    this.physics.add.overlap(this.player, this.shields, (player, shield) => {
      shield.damageable = true
      shield.disableBody(true, true)
      this.player.shootable = true
      this.player.shieldOn = true
    })
  }

  if (this.player.name === 'Thor') {
    this.physics.add.overlap(this.hammers, this.slimes, (hammer, slime) => {
      if (hammer.damageable) {
        hammer.damageable = false
        thorHammerReturn(this.player, hammer)
        hitEffect(this, hammer)
        slime.hp -= Math.floor(Math.random() * 20) + 25
      }
    })
    this.physics.add.collider(this.player, this.hammers, (player, hammer) => {
      hammer.damageable = true
      hammer.disableBody(true, true)
      this.player.shootable = true
    })
    this.physics.add.overlap(
      this.slimes,
      this.lightningRods,
      (slime, lightningRod) => {
        if (slime.hurtable) {
          slime.hurtable = false
          slime.hp -= Math.floor(Math.random() * 100) + 30

          let lightning = this.lightnings.create(
            slime.x,
            slime.y - 353,
            'lightning'
          )
          lightning.followObject = slime
          lightning.setScale(1, 2.5)
          lightning.body.collideWorldBounds = false
          lightning.body.allowGravity = false
          lightning.anims.play('lightning', true)

          this.tweens.add({
            targets: lightning,
            alphaTopLeft: {
              value: 0,
              duration: 500,
              ease: 'Linear'
            },
            alphaTopRight: {
              value: 0,
              duration: 500,
              ease: 'Linear'
            },
            alphaBottomLeft: {
              value: 0,
              duration: 2000,
              ease: 'Linear'
            },
            alphaBottomRight: {
              value: 0,
              duration: 2000,
              ease: 'Linear'
            },
            loop: 0
          })

          setTimeout(() => {
            slime.hurtable = true
          }, 200)

          setTimeout(() => {
            lightning.destroy()
          }, 2000)
        }
      }
    )
  }

  if (this.player.name === 'SpiderMan') {
    this.physics.add.collider(this.webs, this.platforms)
    this.physics.add.overlap(this.webs, this.coins)
    this.physics.add.overlap(this.webs, this.slimes, (web, slime) => {
      let newWeb_hit = this.webs_hit.create(web.body.x, web.body.y, 'web_hit')
      newWeb_hit.body.allowGravity = false
      newWeb_hit.body.setSize(15, 15, 5, 5)
      newWeb_hit.setScale(1.5, 1.5)
      newWeb_hit.anims.play('web_hit', true)
      setTimeout(() => {
        newWeb_hit.destroy()
      }, 800)
      web.disableBody(true, true)
      slime.hp -= 1
    })
  }

  this.money = 0
  this.moneyChange = false

  // static text
  this.moneyIcon = this.physics.add.staticGroup()
  this.moneyIcon
    .create(25, 25, 'coin', 0)
    .setScale(0.3, 0.3)
    .refreshBody()
  this.collectionText = this.add.text(60, 7, this.money, {
    fontFamily: '"Roboto Condensed"',
    fontSize: 33
  })
}

// Dr. Stephen Strange : I went forward in time... to view alternate futures.
// To see all the possible outcomes of the coming conflict.

// Peter Quill : How many did you see?

// Dr. Stephen Strange : Fourteen million six hundred and five.

// Tony Stark : How many did we win?

// Dr. Stephen Strange : ...One.
