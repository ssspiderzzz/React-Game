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
        gravity: { y: 300 }
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
    this.player.body.collideWorldBounds = true
    this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers('spiderman_reverse', {
        start: 11,
        end: 4
      }),
      frameRate: 10,
      repeat: -1
    })
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
      key: 'idle',
      frames: this.anims.generateFrameNumbers('spiderman', {
        start: 0,
        end: 0
      }),
      frameRate: 10,
      repeat: -1
    })
    this.anims.create({
      key: 'atk',
      frames: this.anims.generateFrameNumbers('spiderman', {
        start: 53,
        end: 55
      }),
      frameRate: 10,
      repeat: -1
    })

    // platforms
    this.platforms = this.physics.add.staticGroup()

    this.platforms
      .create(200, 400, 'tiles', 13)
      .setScale(1, 1)
      .refreshBody()
    this.platforms
      .create(232, 400, 'tiles', 13)
      .setScale(1, 1)
      .refreshBody()

    this.platforms
      .create(400, 600, 'tiles', 0)
      .setScale(5, 1)
      .refreshBody()

    this.platforms
      .create(600, 300, 'tiles', 3)
      .setScale(7, 1)
      .refreshBody()

    // controls
    this.cursors = this.input.keyboard.createCursorKeys()

    this.physics.add.collider(this.player, this.platforms)

    this.doublejump = 2
  }

  function update () {
    if (this.cursors.right.isDown) {
      this.player.anims.play('right', true)
      this.player.body.setVelocityX(300)
    } else if (this.cursors.left.isDown) {
      this.player.anims.play('left', true)
      this.player.body.setVelocityX(-300)
    } else {
      this.player.anims.play('idle', true)
      this.player.body.setVelocityX(0)
    }

    if (this.cursors.up.isDown) {
      this.player.body.setVelocityY(-300)
      console.log(this.doublejump)
    }
    if (this.cursors.space.isDown) {
      this.player.anims.play('atk', true)
      this.player.body.setVelocityX(0)
    }
  }

  return (
    <div className='App'>
      <Router history={history}></Router>
    </div>
  )
}
