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
import iron_man_passive from '../../assets/characters/iron_man_passive.png'
import captain_america_passive from '../../assets/characters/captain_america_passive.png'
import thor_passive from '../../assets/characters/thor_passive.png'
import iron_man_icon from '../../assets/characters/iron_man_icon.png'
import captain_america_icon from '../../assets/characters/captain_america_icon.png'
import thor_icon from '../../assets/characters/thor_icon.png'

export default function preload () {
  let progressBar = this.add.graphics()
  let progressBox = this.add.graphics()
  progressBox.fillStyle(0x222222, 0.8)
  progressBox.fillRect(240, 270, 320, 50)

  let width = this.cameras.main.width
  let height = this.cameras.main.height
  let loadingText = this.make.text({
    x: width / 2,
    y: height / 2 - 50,
    text: 'Loading...',
    style: {
      font: '20px monospace',
      fill: '#ffffff'
    }
  })
  loadingText.setOrigin(0.5, 0.5)

  let percentText = this.make.text({
    x: width / 2,
    y: height / 2 - 5,
    text: '0%',
    style: {
      font: '18px monospace',
      fill: '#ffffff'
    }
  })
  percentText.setOrigin(0.5, 0.5)

  let assetText = this.make.text({
    x: width / 2,
    y: height / 2 + 50,
    text: '',
    style: {
      font: '18px monospace',
      fill: '#ffffff'
    }
  })

  assetText.setOrigin(0.5, 0.5)

  this.load.on('progress', function (value) {
    percentText.setText(parseInt(value * 100) + '%')
    progressBar.clear()
    progressBar.fillStyle(0xffffff, 1)
    progressBar.fillRect(250, 280, 300 * value, 30)
  })

  this.load.on('fileprogress', function (file) {
    assetText.setText('Loading asset: ' + file.key)
  })

  this.load.on('complete', function () {
    progressBar.destroy()
    progressBox.destroy()
    loadingText.destroy()
    percentText.destroy()
    assetText.destroy()
  })

  this.load.image('background', background)
  this.load.image('title', title)
  this.load.image('iron_man_face', iron_man_face)
  this.load.image('captain_america_face', captain_america_face)
  this.load.image('thor_face', thor_face)
  this.load.image('play_now_bronze', play_now_bronze)
  this.load.image('play_now_red', play_now_red)
  this.load.image('announcement_board', announcement_board)
  this.load.image('iron_man_passive', iron_man_passive)
  this.load.image('captain_america_passive', captain_america_passive)
  this.load.image('thor_passive', thor_passive)
  this.load.image('iron_man_icon', iron_man_icon)
  this.load.image('captain_america_icon', captain_america_icon)
  this.load.image('thor_icon', thor_icon)

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
