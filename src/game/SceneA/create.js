import { API, graphqlOperation } from 'aws-amplify'
import * as queries from '../../graphql/queries'

export default async function create () {
  // leaderboard
  const allTodos = await API.graphql(graphqlOperation(queries.listTodos))
  let leaderboard = allTodos.data.listTodos.items
  console.log(allTodos.data.listTodos.items)

  // background
  this.add.image(0, 0, 'background').setOrigin(0, 0)

  // leaderboard
  this.add.image(159, 400, 'announcement_board').setScale(0.85)
  leaderboard.sort((a, b) =>
    a.timeRecord > b.timeRecord ? 1 : b.timeRecord > a.timeRecord ? -1 : 0
  )
  leaderboard.forEach((i, index) => {
    if (index <= 10) {
      let icon
      if (i.character === 'IronMan') icon = 'iron_man_icon'
      if (i.character === 'CaptainAmerica') icon = 'captain_america_icon'
      if (i.character === 'Thor') icon = 'thor_icon'

      this.add
        .text(60, 280 + 33 * index, [index + 1], {
          fontSize: 15,
          align: 'Center'
        })
        .setOrigin(0.5)
      this.add
        .image(120, 280 + 33 * index, icon)
        .setOrigin(0.5)
        .setScale(0.2)
      this.add
        .text(
          220,
          280 + 33 * index,
          [i.timeRecord.toFixed(2) + 's  ' + i.score],
          {
            fontSize: 15,
            align: 'Center'
          }
        )
        .setOrigin(0.5)
    }
  })

  // announcement board
  this.add.image(865, 400, 'announcement_board').setScale(0.85)
  this.add
    .text(
      860,
      330,
      [
        'Press or Hold "Z":',
        '   Normal Attacts',
        '',
        'Press or Hold "X":',
        '   Signature Skills',
        '',
        'Arrow Keys:',
        '   Movements'
      ],
      {
        fontSize: 15,
        align: 'Left'
      }
    )
    .setOrigin(0.5)
  let iron_man_passive = this.add
    .image(865, 450, 'iron_man_passive')
    .setVisible(false)
  let captain_america_passive = this.add
    .image(865, 450, 'captain_america_passive')
    .setVisible(false)
  let thor_passive = this.add.image(865, 450, 'thor_passive').setVisible(false)
  let iron_man_passive_text = this.add
    .text(
      775,
      480,
      ['Arc Reactor (Passive)', '   Increases energy', '   regeneration rate'],
      {
        fontSize: 14,
        align: 'Left'
      }
    )
    .setVisible(false)
  let captain_america_passive_text = this.add
    .text(
      775,
      480,
      [
        'Super-Soldier (Passive)',
        "   Captain's health",
        '   regenerates slowly'
      ],
      {
        fontSize: 14,
        align: 'Left'
      }
    )
    .setVisible(false)
  let thor_passive_text = this.add
    .text(
      775,
      480,
      [
        'God of Thunder (Passive)',
        '   Lightning attacks have',
        '   chance to instantly',
        '   kill the target'
      ],
      {
        fontSize: 14,
        align: 'Left'
      }
    )
    .setVisible(false)

  // play button
  let playButtonBronze = this.add.image(1024 / 2, 650, 'play_now_bronze')
  playButtonBronze.setVisible(true).setInteractive()

  let playButtonRed = this.add.image(1024 / 2, 650, 'play_now_red')
  playButtonRed.setVisible(false).setInteractive()

  let transitionBlack = this.add.graphics()
  transitionBlack.fillStyle(0x000000)
  transitionBlack.fillRect(0, 0, 1024, 768)
  transitionBlack.setAlpha(0)
  transitionBlack.setDepth(99)

  let title = this.add
    .image(1024 / 2, 100, 'title')
    .setOrigin(0.5)
    .setAlpha(0)

  this.tweens.add({
    targets: title,
    alphaTopLeft: { value: 1, duration: 1000, ease: 'Power1' },
    alphaBottomLeft: { value: 1, duration: 1000, ease: 'Power1' },
    alphaBottomRight: { value: 1, duration: 4000, ease: 'Power1' },
    alphaTopRight: { value: 1, duration: 4000, ease: 'Power1' },
    loop: 0
  })

  // face icons
  let iron_man_face = this.add
    .image(1024 / 2 - 150, 400, 'iron_man_face')
    .setScale(2, 2)
  let captain_america_face = this.add
    .image(1024 / 2, 400, 'captain_america_face')
    .setScale(2, 2)
  let thor_face = this.add
    .image(1024 / 2 + 150, 400, 'thor_face')
    .setScale(2, 2)

  iron_man_face.setInteractive()
  captain_america_face.setInteractive()
  thor_face.setInteractive()

  this.selectName = this.add.text()
  iron_man_face.on('pointerdown', () => {
    this.select = 'IronMan'
    this.selectName.destroy()
    this.selectName = this.add
      .text(1024 / 2 - 150, 300, ['Iron Man'], {
        fontSize: 22,
        align: 'center'
      })
      .setOrigin(0.5)
    playButtonBronze.setVisible(true)
    this.IronMan.anims.play('IronManMove', true)
    this.CaptainAmerica.anims.play('CaptainAmericaIdle', true)
    this.Thor.anims.play('ThorIdle', true)
    iron_man_passive.setVisible(true)
    iron_man_passive_text.setVisible(true)
    captain_america_passive.setVisible(false)
    captain_america_passive_text.setVisible(false)
    thor_passive.setVisible(false)
    thor_passive_text.setVisible(false)
  })
  captain_america_face.on('pointerdown', () => {
    this.select = 'CaptainAmerica'
    this.selectName.destroy()
    this.selectName = this.add
      .text(1024 / 2, 300, ['Captain America'], {
        fontSize: 22,
        align: 'center'
      })
      .setOrigin(0.5)
    playButtonBronze.setVisible(true)
    this.IronMan.anims.play('IronManIdle', true)
    this.CaptainAmerica.anims.play('CaptainAmericaMove', true)
    this.Thor.anims.play('ThorIdle', true)
    iron_man_passive.setVisible(false)
    iron_man_passive_text.setVisible(false)
    captain_america_passive.setVisible(true)
    captain_america_passive_text.setVisible(true)
    thor_passive.setVisible(false)
    thor_passive_text.setVisible(false)
  })
  thor_face.on('pointerdown', () => {
    this.select = 'Thor'
    this.selectName.destroy()
    this.selectName = this.add
      .text(1024 / 2 + 150, 300, ['Thor'], {
        fontSize: 22,
        align: 'center'
      })
      .setOrigin(0.5)
    playButtonBronze.setVisible(true)
    this.IronMan.anims.play('IronManIdle', true)
    this.CaptainAmerica.anims.play('CaptainAmericaIdle', true)
    this.Thor.anims.play('ThorMove', true)
    iron_man_passive.setVisible(false)
    iron_man_passive_text.setVisible(false)
    captain_america_passive.setVisible(false)
    captain_america_passive_text.setVisible(false)
    thor_passive.setVisible(true)
    thor_passive_text.setVisible(true)
  })

  this.IronMan = this.physics.add
    .sprite(1024 / 2 - 150, 500, 'IronMan')
    .setScale(2, 2)
  this.IronMan.setSize(23, 45, 0, 0).setOffset(16, 10)
  this.IronMan.body.allowGravity = false
  this.anims.create({
    key: 'IronManIdle',
    frames: this.anims.generateFrameNumbers('IronMan', {
      start: 0,
      end: 0
    }),
    frameRate: 1,
    repeat: 0
  })
  this.anims.create({
    key: 'IronManMove',
    frames: this.anims.generateFrameNumbers('IronMan', {
      start: 13,
      end: 14
    }),
    frameRate: 5,
    repeat: 0
  })
  this.IronMan.anims.play('IronManIdle', true)
  this.IronMan.flipX = true

  this.CaptainAmerica = this.physics.add
    .sprite(1024 / 2, 500, 'CaptainAmerica')
    .setScale(2, 2)
  this.CaptainAmerica.setSize(22, 45, 0, 0).setOffset(24, 10)
  this.CaptainAmerica.body.allowGravity = false
  this.anims.create({
    key: 'CaptainAmericaIdle',
    frames: this.anims.generateFrameNumbers('CaptainAmerica', {
      start: 16,
      end: 16
    }),
    frameRate: 1,
    repeat: 0
  })
  this.anims.create({
    key: 'CaptainAmericaMove',
    frames: this.anims.generateFrameNumbers('CaptainAmerica', {
      start: 8,
      end: 12
    }),
    frameRate: 7,
    repeat: 0
  })
  this.CaptainAmerica.anims.play('CaptainAmericaIdle', true)

  this.Thor = this.physics.add
    .sprite(1024 / 2 + 150, 500, 'Thor')
    .setScale(2, 2)
  this.Thor.setSize(22, 45, 0, 0).setOffset(24, 10)
  this.Thor.body.allowGravity = false
  this.anims.create({
    key: 'ThorIdle',
    frames: this.anims.generateFrameNumbers('Thor', {
      start: 0,
      end: 0
    }),
    frameRate: 1,
    repeat: 0
  })
  this.anims.create({
    key: 'ThorMove',
    frames: this.anims.generateFrameNumbers('Thor', {
      start: 9,
      end: 13
    }),
    frameRate: 10,
    repeat: -1
  })
  this.Thor.anims.play('ThorIdle', true)

  // pointer interactive events
  playButtonBronze.on('pointerover', () => {
    if (this.select) {
      playButtonBronze.setVisible(false)
      playButtonRed.setVisible(true)
    }
  })

  playButtonRed.on('pointerout', () => {
    playButtonBronze.setVisible(true)
    playButtonRed.setVisible(false)
  })

  playButtonRed.on('pointerdown', () => {
    this.tweens.add({
      targets: transitionBlack,
      alpha: { value: 1, duration: 500, ease: 'Power1' }
    })
    setTimeout(() => {
      this.scene.start('SceneB', { select: this.select })
    }, 500)
  })
}
