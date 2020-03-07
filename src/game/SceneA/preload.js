import background from '../../assets/background.png'
import spiderman from '../../assets/spiderman.png'
import tiles from '../../assets/tiles.png'
import coin from '../../assets/coin.png'
import slime from '../../assets/slime.png'
import spiderandweb from '../../assets/spiderandweb.png'
import red_projectile from '../../assets/red_projectile.png'
import iron_man_face from '../../assets/characters/iron_man_face.jpg'
import captain_america_face from '../../assets/characters/captain_america_face.jpg'
import thor_face from '../../assets/characters/thor_face.jpg'
import iron_man_sprites from '../../assets/characters/iron_man_sprites.png'
import hit_effect from '../../assets/hit_effect.png'
import captain_america_sprites from '../../assets/characters/captain_america_sprites.png'
import thor_sprites from '../../assets/characters/thor_sprites.png'
import title from '../../assets/avengers_title.png'
import play_now_bronze from '../../assets/PlayNowBronze.png'
import play_now_red from '../../assets/PlayNowRed.png'

export default function preload () {
  this.load.crossOrigin = true

  this.load.image('background', background)
  this.load.image('title', title)
  this.load.image('iron_man_face', iron_man_face)
  this.load.image('captain_america_face', captain_america_face)
  this.load.image('thor_face', thor_face)
  this.load.image('play_now_bronze', play_now_bronze)
  this.load.image('play_now_red', play_now_red)

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
  this.load.spritesheet('IronMan', iron_man_sprites, {
    frameWidth: 55,
    frameHeight: 55
  })
  this.load.spritesheet('hit_effect', hit_effect, {
    frameWidth: 50,
    frameHeight: 50
  })
  this.load.spritesheet('CaptainAmerica', captain_america_sprites, {
    frameWidth: 70,
    frameHeight: 55
  })
  this.load.spritesheet('Thor', thor_sprites, {
    frameWidth: 70,
    frameHeight: 55
  })
}
