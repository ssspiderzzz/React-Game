import background from '../../assets/background.png'
import iron_man_face from '../../assets/characters/iron_man_face.jpg'
import captain_america_face from '../../assets/characters/captain_america_face.jpg'
import thor_face from '../../assets/characters/thor_face.jpg'
import iron_man_sprites from '../../assets/characters/iron_man_sprites.png'
import captain_america_sprites from '../../assets/characters/captain_america_sprites.png'
import thor_sprites from '../../assets/characters/thor_sprites.png'
import title from '../../assets/avengers_title.png'
import play_now_bronze from '../../assets/PlayNowBronze.png'
import play_now_red from '../../assets/PlayNowRed.png'
import announcement_board from '../../assets/announcement_board.png'

export default function preload () {
  this.load.crossOrigin = true

  this.load.image('background', background)
  this.load.image('title', title)
  this.load.image('iron_man_face', iron_man_face)
  this.load.image('captain_america_face', captain_america_face)
  this.load.image('thor_face', thor_face)
  this.load.image('play_now_bronze', play_now_bronze)
  this.load.image('play_now_red', play_now_red)
  this.load.image('announcement_board', announcement_board)

  this.load.spritesheet('IronMan', iron_man_sprites, {
    frameWidth: 55,
    frameHeight: 55
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
