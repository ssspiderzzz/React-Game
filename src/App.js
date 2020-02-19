import React, { useEffect } from 'react'
import Phaser from 'phaser'
import { Router } from 'react-router-dom'
import history from './history'
import './App.css'
import background from './assets/background.png'
import spiderman from './assets/spiderman.png'
import spiderman_reverse from './assets/spiderman_reverse.png'
import tiles from './assets/tiles.png'
import coin from './assets/coin.png'
import slime from './assets/slime.png'
import spiderandweb from './assets/spiderandweb.png'

export default function App (props) {
  useEffect(() => {}, [])
  var config = {
    type: Phaser.AUTO,
    width: 1024,
    height: 768,
    scale: {
      mode: Phaser.Scale.FIT,
      autoCenter: Phaser.Scale.CENTER_BOTH
    },
    physics: {
      default: 'arcade',
      arcade: {
        gravity: { y: 500 }
      }
    },
    scene: {
      preload: preload,
      create: create,
      update: update
    }
  }

  new Phaser.Game(config)

  function preload () {
    this.load.crossOrigin = true

    this.load.image('background', background)
    this.load.spritesheet('spiderman', spiderman, {
      frameWidth: 80,
      frameHeight: 80
    })
    this.load.spritesheet('spiderman_reverse', spiderman_reverse, {
      frameWidth: 80,
      frameHeight: 80
    })
    this.load.spritesheet('tiles', tiles, {
      frameWidth: 32,
      frameHeight: 32
    })
    this.load.spritesheet('coin', coin, {
      frameWidth: 84,
      frameHeight: 84
    })
    this.load.spritesheet('slime', slime, {
      frameWidth: 32,
      frameHeight: 32
    })
    this.load.spritesheet('web', spiderandweb, {
      frameWidth: 32,
      frameHeight: 33
    })
  }

  function create () {
    // background
    this.add.image(0, 0, 'background').setOrigin(0, 0)

    // player
    this.player = this.physics.add.sprite(100, 200, 'spiderman').setScale(1, 1)
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
      repeat: 10,
      setXY: { x: 20, y: 0, stepX: 100 }
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
      repeat: -1
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
      this.slimeHP--
      this.slime.body.x -= 2
    })

    this.slimeHP = 100
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
  }

  function update () {
    if (this.cursors.right.isDown) {
      this.player.anims.play('right', true)
      this.player.body.setVelocityX(300)
      this.player.facing = 'right'
    } else if (this.cursors.left.isDown) {
      this.player.anims.play('left', true)
      this.player.body.setVelocityX(-300)
      this.player.facing = 'left'
    } else {
      if (this.player.facing === 'right')
        this.player.anims.play('idle_right', true)
      if (this.player.facing === 'left')
        this.player.anims.play('idle_left', true)
      this.player.body.setVelocityX(0)
    }

    if (this.cursors.up.isDown && !this.doublejump) {
      this.player.body.setVelocityY(-400)
      this.doublejump = true
    }

    if (this.player.body.touching.down) {
      this.doublejump = false
    }

    if (this.cursors.space.isDown) {
      if (this.player.facing === 'right') {
        this.player.anims.play('atk_right', true)
        let newWeb_right = this.webs.create(
          this.player.x + 20,
          this.player.y + 20,
          'web'
        )
        webShooter(newWeb_right, 350)
      }

      if (this.player.facing === 'left') {
        this.player.anims.play('atk_left', true)
        let newWeb_left = this.webs.create(
          this.player.x - 20,
          this.player.y + 20,
          'web'
        )
        webShooter(newWeb_left, -350)
      }
    }

    if (this.moneyChange) {
      this.moneyChange = false
      this.collectionText.destroy()
      this.collectionText = this.add.text(60, 7, this.money, {
        fontFamily: '"Roboto Condensed"',
        fontSize: 33
      })
    }
  }

  function webShooter (web, shootSpeed) {
    web.body.setSize(15, 15, 5, 5)
    web.body.collideWorldBounds = true
    web.body.allowGravity = false
    web.anims.play('web', true)
    web.body.velocity.x = shootSpeed
    web.setScale(1.5, 1.5)
    setInterval(() => {
      web.destroy()
    }, 1000)
  }

  return (
    <div className='App'>
      <Router history={history}></Router>
    </div>
  )
}
