import Phaser from 'phaser'
import InitLoader from './InitLoader'
import Preloader from './Preloader'
import SceneA from './SceneA'
import SceneB from './SceneB'
import SceneC from './SceneC'
import VirtualJoystickPlugin from 'phaser3-rex-plugins/plugins/virtualjoystick-plugin.js'

export let width = 1280
export let height = 720

export let config = {
  type: Phaser.AUTO,
  width: width,
  height: height,
  backgroundColor: 'white',
  dom: {
    createContainer: true
  },
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH
  },
  physics: {
    default: 'arcade',
    arcade: {
      debug: true,
      debugShowBody: true,
      debugShowStaticBody: true,
      debugShowVelocity: true,
      debugVelocityColor: 0xffff00,
      debugBodyColor: 0x0000ff,
      debugStaticBodyColor: 0xffffff,
      gravity: { y: 500 }
    }
  },
  plugins: {
    global: [
      {
        key: 'rexVirtualJoystick',
        plugin: VirtualJoystickPlugin,
        start: true
      }
    ]
  },
  scene: [InitLoader, Preloader, SceneA, SceneB, SceneC]
}
