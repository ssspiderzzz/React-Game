import background from '../../assets/background.png'
import spiderman from '../../assets/spiderman.png'
import tiles from '../../assets/tiles.png'
import coin from '../../assets/coin.png'
import slime from '../../assets/slime.png'
import spiderandweb from '../../assets/spiderandweb.png'
import red_projectile from '../../assets/red_projectile.png'
import ironmanJson from '../../assets/characters/spritesheet.json'
import ironman from '../../assets/characters/spritesheet.png'

export default function preload () {
  this.load.crossOrigin = true

  this.load.image('background', background)
  this.load.spritesheet('spiderman', spiderman, {
    frameWidth: 80,
    frameHeight: 80
  })
  this.load.spritesheet('tiles', tiles, {
    frameWidth: 32,
    frameHeight: 32
  })
  this.load.spritesheet('coin', coin, {
    frameWidth: 84,
    frameHeight: 84
  })
  this.load.spritesheet('slime', slime, {
    frameWidth: 32,
    frameHeight: 32
  })
  this.load.spritesheet('web', spiderandweb, {
    frameWidth: 32,
    frameHeight: 33
  })
  this.load.spritesheet('red_projectile', red_projectile, {
    frameWidth: 153,
    frameHeight: 153
  })
  this.load.atlas('ironman', ironman, ironmanJson)
}
