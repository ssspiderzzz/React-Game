import React, { useState, useEffect } from 'react'
import Phaser from 'phaser'
import { Router } from 'react-router-dom'
import history from './history'
import './App.css'

export default function App (props) {
  useEffect(() => {}, [])
  var config = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
      default: 'arcade',
      arcade: {
        gravity: { y: 200 }
      }
    },
    scene: {
      preload: preload,
      create: create
    }
  }

  var Game = new Phaser.Game(config)

  function preload () {
    this.load.setBaseURL('http://labs.phaser.io')

    this.load.image('sky', 'assets/skies/space3.png')
    this.load.image('logo', 'assets/sprites/phaser3-logo.png')
    this.load.image('red', 'assets/particles/red.png')
    this.load.image('starBig', 'assets/games/starstruck/star2.png')
  }

  function create () {
    this.add.image(400, 300, 'sky')

    var particles = this.add.particles('red')

    var emitter = particles.createEmitter({
      speed: 100,
      scale: { start: 1, end: 0 },
      blendMode: 'ADD'
    })

    var logo = this.physics.add.image(400, 100, 'starBig')

    logo.setVelocity(100, 200)
    logo.setBounce(1, 0.9)
    logo.setCollideWorldBounds(true)

    emitter.startFollow(logo)
  }

  return (
    <div className='App'>
      <Router history={history}></Router>
    </div>
  )
}
