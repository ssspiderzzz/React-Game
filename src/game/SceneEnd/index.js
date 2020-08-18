import Phaser from 'phaser'
import preload from './preload'
import create from './create'

export default class SceneEnd extends Phaser.Scene {
  constructor () {
    super('SceneEnd')
    this.preload = preload
    this.create = create
  }
}
