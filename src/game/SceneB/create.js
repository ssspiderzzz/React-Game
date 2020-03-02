import Phaser from 'phaser'
import drawDamageText from './drawDamageText'
import initIronMan from './initIronMan'
import initCaptainAmerica from './initCaptainAmerica'
import initThor from './initThor'

export default function create () {
  let name = this.select

  // background
  this.add.image(0, 0, 'background').setOrigin(0, 0)

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

  // web
  this.webs = this.physics.add.group()
  this.webs_hit = this.physics.add.group()
  this.anims.create({
    key: 'web',
    frames: this.anims.generateFrameNumbers('web', {
      start: 63,
      end: 68
    }),
    frameRate: 6,
    repeat: 0
  })
  this.anims.create({
    key: 'web_hit',
    frames: this.anims.generateFrameNumbers('web', {
      start: 66,
      end: 68
    }),
    frameRate: 5,
    repeat: 1
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
  this.keyX = this.input.keyboard.addKey('X')
  this.cursors = this.input.keyboard.createCursorKeys()

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
  // this.physics.add.collider(this.webs, this.platforms)
  // this.physics.add.overlap(this.webs, this.coins)
  // this.physics.add.overlap(this.webs, this.slimes, (web, slime) => {
  //   let newWeb_hit = this.webs_hit.create(web.body.x, web.body.y, 'web_hit')
  //   newWeb_hit.body.allowGravity = false
  //   newWeb_hit.body.setSize(15, 15, 5, 5)
  //   newWeb_hit.setScale(1.5, 1.5)
  //   newWeb_hit.anims.play('web_hit', true)
  //   setTimeout(() => {
  //     newWeb_hit.destroy()
  //   }, 800)
  //   web.disableBody(true, true)
  //   slime.hp -= 1
  // })
  if (this.player.name === 'IronMan') {
    this.physics.add.overlap(this.beams, this.slimes, (beam, slime) => {
      beamHitEffect(this, beam)
      slime.hp -= Math.floor(Math.random() * 25) + 10
    })
  }

  if (this.player.name === 'CaptainAmerica') {
    this.physics.add.collider(this.shields, this.slimes, (shield, slime) => {
      shieldHitEffect(this, shield)
      slime.hp -= Math.floor(Math.random() * 35) + 10
    })
    this.physics.add.collider(this.player, this.shields, (player, shield) => {
      shield.disableBody(true, true)
    })
  }

  this.physics.add.collider(this.player, this.slimes, (player, slime) => {
    let floatSlimeDmg = Math.floor(Math.random() * 10) + 10
    this.player.hp -= floatSlimeDmg
    drawDamageText(this, player, floatSlimeDmg)
    knockBack(this, player, slime)
  })

  this.physics.add.collider(
    this.player,
    this.red_projectiles,
    (player, red_projectile) => {
      let floatProjectileDmg = Math.floor(Math.random() * 20) + 15
      this.player.hp -= floatProjectileDmg
      drawDamageText(this, player, floatProjectileDmg)
      knockBack(this, player, red_projectile)
      red_projectile.disableBody(true, true)
      red_projectile.destroy()
    }
  )

  this.money = 0
  this.moneyChange = false
  this.doublejump = false

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
  let restartButton = this.add.text(750, 20, 'Restart', { fontSize: 22 })
  restartButton.setInteractive()
  restartButton.on('pointerdown', () => {
    this.scene.restart()
  })
  let menuButton = this.add.text(880, 20, 'Main Menu', { fontSize: 22 })
  menuButton.setInteractive()
  menuButton.on('pointerdown', () => {
    let animsList = [
      'idle',
      'walk',
      'attack',
      'attack2',
      'hit',
      'dead',
      'beam',
      'beam-hit',
      'shield',
      'shield-hit'
    ]
    animsList.forEach(i => {
      this.anims.remove(i)
    })
    this.scene.start('SceneA')
  })
}

function knockBack (scene, player, dmgObject) {
  if (dmgObject.body.x <= player.body.x) {
    scene.knockBack = true
    scene.knockBackOrient = 'right'
    scene.player.anims.play('hit', true)
    scene.player.flipX = true
  }
  if (dmgObject.body.x > player.body.x) {
    scene.knockBack = true
    scene.knockBackOrient = 'left'
    scene.player.anims.play('hit', true)
    scene.player.flipX = false
  }

  if (scene.knockBackOrient === 'right') {
    scene.player.body.setVelocityX(200)
    scene.player.body.setVelocityY(-200)
  }
  if (scene.knockBackOrient === 'left') {
    scene.player.body.setVelocityX(-200)
    scene.player.body.setVelocityY(-200)
  }
  setTimeout(() => {
    scene.knockBack = false
  }, 850)
  scene.knockBackOrient = false
}

function beamHitEffect (scene, beam) {
  let beam_hit = scene.beams_hit.create(
    beam.body.x + 17.5,
    beam.body.y + 7.5,
    'beam_hit'
  )
  beam_hit.body.allowGravity = false
  beam_hit.setScale(1.5, 1.5)
  beam_hit.anims.play('beam_hit', true)
  setTimeout(() => {
    beam_hit.destroy()
  }, 1000)
  beam.disableBody(true, true)
}

function shieldHitEffect (scene, shield) {
  let shield_hit = scene.shields_hit.create(
    shield.body.x + 17.5,
    shield.body.y + 7.5,
    'shield_hit'
  )
  shield_hit.body.allowGravity = false
  shield_hit.setScale(1.5, 1.5)
  shield_hit.anims.play('shield_hit', true)
  setTimeout(() => {
    shield_hit.destroy()
  }, 1000)

  shield.shieldTravelTime = Math.abs(shield.body.x - scene.player.body.x) / 450
  if (shield.body.x > scene.player.body.x) {
    shield.body.velocity.x = -450
  } else {
    shield.body.velocity.x = 450
  }

  shield.body.velocity.y =
    (scene.player.body.y + 35 - shield.body.y) / shield.shieldTravelTime
}

// Dr. Stephen Strange : I went forward in time... to view alternate futures.
// To see all the possible outcomes of the coming conflict.

// Peter Quill : How many did you see?

// Dr. Stephen Strange : Fourteen million six hundred and five.

// Tony Stark : How many did we win?

// Dr. Stephen Strange : ...One.
