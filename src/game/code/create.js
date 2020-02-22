import Phaser from 'phaser'
import drawDamageText from './drawDamageText'

export default function create () {
  // background
  this.add.image(0, 0, 'background').setOrigin(0, 0)

  // player
  this.player = this.physics.add.sprite(512, 300, 'spiderman').setScale(1, 1)
  this.player.alive = true
  this.player.body.setSize(55, 65, 10, 10)
  this.player.body.collideWorldBounds = true
  this.player.facing = 'right'
  this.player.bar = this.add.graphics()
  this.player.hp = 100
  this.anims.create({
    key: 'right',
    frames: this.anims.generateFrameNumbers('spiderman', {
      start: 1,
      end: 8
    }),
    frameRate: 10,
    repeat: -1
  })
  this.anims.create({
    key: 'left',
    frames: this.anims.generateFrameNumbers('spiderman_reverse', {
      start: 10,
      end: 3
    }),
    frameRate: 10,
    repeat: -1
  })
  this.anims.create({
    key: 'idle_right',
    frames: this.anims.generateFrameNumbers('spiderman', {
      start: 0,
      end: 0
    }),
    frameRate: 10,
    repeat: -1
  })
  this.anims.create({
    key: 'idle_left',
    frames: this.anims.generateFrameNumbers('spiderman_reverse', {
      start: 11,
      end: 11
    }),
    frameRate: 10,
    repeat: -1
  })
  this.anims.create({
    key: 'atk_right',
    frames: this.anims.generateFrameNumbers('spiderman', {
      start: 53,
      end: 53
    }),
    frameRate: 10,
    repeat: -1
  })
  this.anims.create({
    key: 'atk_left',
    frames: this.anims.generateFrameNumbers('spiderman_reverse', {
      start: 54,
      end: 54
    }),
    frameRate: 10,
    repeat: -1
  })
  this.anims.create({
    key: 'ghost_right',
    frames: this.anims.generateFrameNumbers('spiderman', {
      start: 120,
      end: 121
    }),
    frameRate: 5,
    repeat: -1
  })
  this.anims.create({
    key: 'ghost_left',
    frames: this.anims.generateFrameNumbers('spiderman_reverse', {
      start: 131,
      end: 130
    }),
    frameRate: 5,
    repeat: -1
  })

  // coin
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
    }
    if (index === 3 || index === 4) {
      slime.anims.play('slime_red', true)
    }
  })

  // web
  this.webs = this.physics.add.group()
  this.anims.create({
    key: 'web',
    frames: this.anims.generateFrameNumbers('web', {
      start: 63,
      end: 68
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
    .setScale(1, 1)
    .setAlpha(0)
    .refreshBody()
  this.invisibleWalls
    .create(704, 470, 'tiles', 1)
    .setScale(1, 1)
    .setAlpha(0)
    .refreshBody()
  this.invisibleWalls
    .create(320, 736, 'tiles', 1)
    .setScale(1, 1)
    .setAlpha(0)
    .refreshBody()
  this.invisibleWalls
    .create(704, 736, 'tiles', 1)
    .setScale(1, 1)
    .setAlpha(0)
    .refreshBody()

  // controls
  this.cursors = this.input.keyboard.createCursorKeys()

  this.physics.add.collider(this.player, this.platforms)
  this.physics.add.collider(this.coins, this.platforms)
  this.physics.add.collider(this.coins, this.player)
  this.physics.add.collider(this.slimes, this.platforms)
  this.physics.add.collider(this.slimes, this.slimes)
  this.physics.add.collider(this.slimes, this.invisibleWalls)
  this.physics.add.collider(this.webs, this.platforms)
  this.physics.add.overlap(this.webs, this.coins, (web, coin) => {
    this.money++
    this.moneyChange = true
    coin.disableBody(true, true)
  })
  this.physics.add.overlap(this.webs, this.slimes, (web, slime) => {
    if (slime.body.touching.left) slime.body.x += 0.1
    if (slime.body.touching.right) slime.body.x -= 0.1
    slime.hp -= 0.1
  })
  this.physics.add.collider(this.player, this.slimes, (player, slime) => {
    if (player.body.touching.left) {
      this.knockBack = true
      this.knockBackOrient = 'right'
    }
    if (player.body.touching.right) {
      this.knockBack = true
      this.knockBackOrient = 'left'
    }
    let floatSlimeDmg = Math.floor(Math.random() * 10) + 10
    this.player.hp -= floatSlimeDmg
    drawDamageText(this, player, floatSlimeDmg)
  })

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
}
