import React, { useEffect } from 'react'
import Phaser from 'phaser'
import { Router } from 'react-router-dom'
import history from './history'
import './App.css'
import background from './assets/background.png'
import spiderman from './assets/spiderman.png'
import spiderman_reverse from './assets/spiderman_reverse.png'
import tiles from './assets/tiles.png'

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
    // this.load.setBaseURL('http://labs.phaser.io')

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
  }

  function create () {
    // background
    this.add.image(0, 0, 'background').setOrigin(0, 0)

    // player
    this.player = this.physics.add.sprite(300, 300, 'spiderman').setScale(1, 1)
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

    this.doublejump = false
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
      if (this.player.facing === 'right')
        this.player.anims.play('atk_right', true)
      if (this.player.facing === 'left')
        this.player.anims.play('atk_left', true)
    }
  }

  return (
    <div className='App'>
      <Router history={history}></Router>
    </div>
  )
}
