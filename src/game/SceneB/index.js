import Phaser from 'phaser'
import preload from './preload'
import create from './create'
import update from './update'

export default class SceneB extends Phaser.Scene {
  constructor () {
    super('SceneB')
    this.preload = preload
    this.create = create
    this.update = update
  }
}
