import Phaser from 'phaser'
import drawDamageText from './drawDamageText'

export default function create () {
  // background
  this.add.image(0, 0, 'background').setOrigin(0, 0)

  // player
  this.player = this.physics.add.sprite(512, 300, 'ironman').setScale(2, 2)
  this.player.alive = true
  this.player.body.collideWorldBounds = true
  this.player.facing = 'right'
  this.player.bar = this.add.graphics()
  this.player.hp = 100
  this.anims.create({
    key: 'idle',
    frames: this.anims.generateFrameNumbers('ironman', {
      start: 0,
      end: 1
    }),
    frameRate: 1,
    repeat: -1
  })
  this.anims.create({
    key: 'walk',
    frames: this.anims.generateFrameNumbers('ironman', {
      start: 3,
      end: 3
    }),
    frameRate: 1,
    repeat: -1
  })
  this.anims.create({
    key: 'attack',
    frames: this.anims.generateFrameNumbers('ironman', {
      start: 8,
      end: 9
    }),
    frameRate: 5,
    repeat: -1
  })
  this.anims.create({
    key: 'ghost',
    frames: this.anims.generateFrameNumbers('ironman', {
      start: 21,
      end: 24
    }),
    frameRate: 3,
    repeat: 0
  })

  // spiderman animations and sprits setup
  // this.player = this.physics.add.sprite(512, 300, 'spiderman').setScale(1, 1)
  // this.player.alive = true
  // this.player.body.setSize(55, 65, 10, 10)
  // this.player.body.collideWorldBounds = true
  // this.player.facing = 'right'
  // this.player.bar = this.add.graphics()
  // this.player.hp = 100
  // this.anims.create({
  //   key: 'walk',
  //   frames: this.anims.generateFrameNumbers('spiderman', {
  //     start: 1,
  //     end: 8
  //   }),
  //   frameRate: 10,
  //   repeat: -1
  // })
  // this.anims.create({
  //   key: 'idle',
  //   frames: this.anims.generateFrameNumbers('spiderman', {
  //     start: 0,
  //     end: 0
  //   }),
  //   frameRate: 10,
  //   repeat: -1
  // })
  // this.anims.create({
  //   key: 'attack',
  //   frames: this.anims.generateFrameNumbers('spiderman', {
  //     start: 53,
  //     end: 53
  //   }),
  //   frameRate: 10,
  //   repeat: -1
  // })
  // this.anims.create({
  //   key: 'ghost',
  //   frames: this.anims.generateFrameNumbers('spiderman', {
  //     start: 120,
  //     end: 121
  //   }),
  //   frameRate: 5,
  //   repeat: -1
  // })

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
  this.keyX = this.input.keyboard.addKey('X')
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
    coin.destroy()
  })
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
  this.physics.add.collider(this.player, this.slimes, (player, slime) => {
    let floatSlimeDmg = Math.floor(Math.random() * 10) + 10
    this.player.hp -= floatSlimeDmg
    drawDamageText(this, player, floatSlimeDmg)

    if (slime.body.touching.right) {
      this.knockBack = true
      this.knockBackOrient = 'right'
    }
    if (slime.body.touching.left) {
      this.knockBack = true
      this.knockBackOrient = 'left'
    }
    if (slime.body.touching.up) {
      this.knockBack = true
      if (floatSlimeDmg % 2 === 0) this.knockBackOrient = 'right'
      if (floatSlimeDmg % 2 === 1) this.knockBackOrient = 'left'
    }

    if (this.knockBackOrient === 'right') {
      this.player.body.setVelocityX(200)
      this.player.body.setVelocityY(-200)
    }
    if (this.knockBackOrient === 'left') {
      this.player.body.setVelocityX(-200)
      this.player.body.setVelocityY(-200)
    }
    setTimeout(() => {
      this.knockBack = false
    }, 850)
    this.knockBackOrient = false
  })

  this.physics.add.collider(
    this.player,
    this.red_projectiles,
    (player, red_projectile) => {
      let floatProjectileDmg = Math.floor(Math.random() * 20) + 15
      this.player.hp -= floatProjectileDmg
      drawDamageText(this, player, floatProjectileDmg)

      if (red_projectile.body.touching.right) {
        this.knockBack = true
        this.knockBackOrient = 'right'
      }
      if (red_projectile.body.touching.left) {
        this.knockBack = true
        this.knockBackOrient = 'left'
      }
      if (
        red_projectile.body.touching.up ||
        red_projectile.body.touching.down
      ) {
        this.knockBack = true
        if (floatProjectileDmg % 2 === 0) this.knockBackOrient = 'right'
        if (floatProjectileDmg % 2 === 1) this.knockBackOrient = 'left'
      }

      if (this.knockBackOrient === 'right') {
        this.player.body.setVelocityX(200)
        this.player.body.setVelocityY(-200)
      }
      if (this.knockBackOrient === 'left') {
        this.player.body.setVelocityX(-200)
        this.player.body.setVelocityY(-200)
      }
      setTimeout(() => {
        this.knockBack = false
      }, 850)
      this.knockBackOrient = false
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
  let restartButton = this.add.text(900, 20, 'Restart', { fontSize: 22 })
  restartButton.setInteractive()
  restartButton.on('pointerdown', () => {
    this.scene.restart()
  })
}

// Dr. Stephen Strange : I went forward in time... to view alternate futures.
// To see all the possible outcomes of the coming conflict.

// Peter Quill : How many did you see?

// Dr. Stephen Strange : Fourteen million six hundred and five.

// Tony Stark : How many did we win?

// Dr. Stephen Strange : ...One.
