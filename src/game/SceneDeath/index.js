import Phaser from 'phaser'
import preload from './preload'
import create from './create'

export default class SceneDeath extends Phaser.Scene {
  constructor () {
    super('SceneDeath')
    this.preload = preload
    this.create = create
  }
}
