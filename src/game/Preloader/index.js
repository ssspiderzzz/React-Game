import Phaser from 'phaser'
import preload from './preload'
import create from './create'

export default class PreloaderScene extends Phaser.Scene {
  constructor () {
    super('Preloader')
    this.preload = preload
    this.create = create
  }
}
