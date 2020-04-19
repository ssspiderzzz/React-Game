import Phaser from 'phaser'
import preload from './preload'
import create from './create'

export default class InitLoaderScene extends Phaser.Scene {
  constructor () {
    super('InitLoader')
    this.preload = preload
    this.create = create
  }
}
