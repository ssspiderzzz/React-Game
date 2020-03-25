import Phaser from 'phaser'
import preload from './preload'
import create from './create'

export default class Loading extends Phaser.Scene {
  constructor () {
    super('Loading')
    this.preload = preload
    this.create = create
  }
}
