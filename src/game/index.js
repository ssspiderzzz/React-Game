import Phaser from 'phaser'
import preload from './code/preload'
import create from './code/create'
import update from './code/update'

export let config = {
  type: Phaser.AUTO,
  width: 1024,
  height: 768,
  backgroundColor: 0x222222,
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH
  },
  physics: {
    default: 'arcade',
    arcade: {
      // debug: true,
      // debugShowBody: true,
      // debugShowStaticBody: true,
      // debugShowVelocity: true,
      // debugVelocityColor: 0xffff00,
      // debugBodyColor: 0x0000ff,
      // debugStaticBodyColor: 0xffffff,
      gravity: { y: 500 }
    }
  },

  scene: {
    preload: preload,
    create: create,
    update: update
  }
}
