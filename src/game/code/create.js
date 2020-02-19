import Phaser from 'phaser'

export default function create () {
  // background
  this.add.image(0, 0, 'background').setOrigin(0, 0)

  // player
  this.player = this.physics.add.sprite(100, 400, 'spiderman').setScale(1, 1)
  this.player.body.setSize(55, 65, 10, 10)
  this.player.body.collideWorldBounds = true
  this.player.facing = 'right'
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
    coin.setBounceY(Phaser.Math.FloatBetween(0.9, 1))
    coin.setBounceX(Phaser.Math.FloatBetween(0.9, 1))
  })

  // slime
  this.slime = this.physics.add.sprite(500, 600, 'slime').setScale(2, 2)
  this.slime.body.collideWorldBounds = true
  this.anims.create({
    key: 'slime',
    frames: this.anims.generateFrameNumbers('slime', {
      start: 0,
      end: 2
    }),
    frameRate: 5,
    repeat: -1,
    yoyo: true
  })
  this.slime.anims.play('slime', true)

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

  // controls
  this.cursors = this.input.keyboard.createCursorKeys()

  this.physics.add.collider(this.player, this.platforms)
  this.physics.add.collider(this.coins, this.platforms)
  this.physics.add.collider(this.coins, this.player)
  this.physics.add.collider(this.slime, this.platforms)
  this.physics.add.collider(this.slime, this.player)
  this.physics.add.collider(this.webs, this.platforms)
  this.physics.add.overlap(this.webs, this.coins, (web, coin) => {
    this.money++
    this.moneyChange = true
    coin.disableBody(true, true)
  })
  this.physics.add.overlap(this.webs, this.slime, (web, slime) => {
    if (slime.body.touching.left) this.slime.body.x -= 1
    if (slime.body.touching.right) this.slime.body.x += 1
    this.value -= 0.1
    draw(this)
  })

  this.money = 0
  this.moneyChange = false
  this.doublejump = false

  // static text
  this.collection = this.physics.add.staticGroup()
  this.collection
    .create(25, 25, 'coin', 0)
    .setScale(0.3, 0.3)
    .refreshBody()
  this.collectionText = this.add.text(60, 7, this.money, {
    fontFamily: '"Roboto Condensed"',
    fontSize: 33
  })

  this.bar = this.add.graphics()
  this.value = 100
  this.p = 76 / 100
}

function draw (scene) {
  scene.x = scene.slime.x - 32
  scene.y = scene.slime.y - 50

  scene.bar.clear()

  //  BG
  scene.bar.fillStyle(0x000000)
  scene.bar.fillRect(scene.x, scene.y, 80, 16)

  //  Health

  scene.bar.fillStyle(0xffffff)
  scene.bar.fillRect(scene.x + 2, scene.y + 2, 76, 12)

  if (scene.value < 30) {
    scene.bar.fillStyle(0xff0000)
  } else {
    scene.bar.fillStyle(0x00ff00)
  }

  var d = Math.floor(scene.p * scene.value)

  scene.bar.fillRect(scene.x + 2, scene.y + 2, d, 12)

  scene.add.existing(scene.bar)
}
