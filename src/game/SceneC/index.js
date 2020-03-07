import Phaser from 'phaser'
import preload from './preload'
import create from './create'

export default class SceneC extends Phaser.Scene {
  constructor () {
    super('SceneC')
    this.preload = preload
    this.create = create
  }
}
