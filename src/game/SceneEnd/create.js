import { width, height } from '../index'

export default function create () {
  let currentSelect = this.scene.settings.data.currentSelect
  let timeRecord = this.scene.settings.data.timeRecord
    ? this.scene.settings.data.timeRecord
    : ''

  let options = this.add
    .image(width / 2, height / 2, 'options_gameover')
    .setOrigin(0.5)
  options.setDepth(99)

  if (timeRecord) {
    this.add
      .text(
        width / 2,
        height / 2 - 70,
        `Your record is ${timeRecord} seconds!`,
        {
          fontSize: 18,
          align: 'center',
          color: 'white',
          stroke: 'black',
          strokeThickness: 4
        }
      )
      .setOrigin(0.5)
      .setDepth(100)
  } else {
    this.add
      .text(
        width / 2,
        height / 2 - 70,
        [
          `Don't give up!`,
          `I went forward in time...`,
          `to view 4,000,605 alternate futures`,
          `There is one way we can win!`
        ],
        {
          fontSize: 18,
          align: 'center',
          color: 'white',
          stroke: 'black',
          strokeThickness: 4
        }
      )
      .setOrigin(0.5)
      .setDepth(100)
  }

  let restart = this.add
    .rectangle(width / 2, height / 2 + 33, 275, 75, 0x00000)
    .setDepth(100)
    .setAlpha(0.001)
  let exit = this.add
    .rectangle(width / 2, height / 2 + 136, 275, 75, 0x00000)
    .setDepth(100)
    .setAlpha(0.001)

  options.setInteractive()
  restart.setInteractive()
  exit.setInteractive()

  restart.on('pointerdown', () => {
    this.scene.stop('SceneEnd')
    this.scene.start('SceneB', { select: currentSelect })
  })

  exit.on('pointerdown', () => {
    this.anims.anims.clear()
    this.scene.stop('SceneEnd')
    this.scene.stop('SceneB')
    this.scene.run('SceneA')
  })
}
