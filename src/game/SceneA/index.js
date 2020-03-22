import Phaser from 'phaser'
import preload from './preload'
import create from './create'

export default class SceneA extends Phaser.Scene {
  constructor () {
    super('SceneA')
    this.preload = preload
    this.create = create
  }
  init () {}
}
