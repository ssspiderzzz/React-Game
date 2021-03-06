import { API, graphqlOperation } from 'aws-amplify'
import * as queries from '../../graphql/queries'
import store from '../../store'
import {
  TOGGLE_UI,
  SET_PLAYER_NAME_WITHOUT_TOGGLE
} from '../../store/gameReducer.js'
import { leaderboardToggle } from './helpers'
import { width, height } from '../index'

export default async function create () {
  this.rotation = 0

  // background
  this.add
    .image(0, 0, 'background')
    .setOrigin(0, 0)
    .setScale(0.66)

  // transition
  let transitionBlack = this.add.graphics()
  transitionBlack.fillStyle(0x000000)
  transitionBlack.fillRect(0, 0, width, height)
  transitionBlack.setAlpha(1)
  transitionBlack.setDepth(99)
  this.tweens.add({
    targets: transitionBlack,
    alpha: { value: 0, duration: 350, ease: 'Power1' }
  })

  // save the player name that show in scene for UI component to call
  this.enterName = this.add
    .text(width / 2, 590, 'Please Enter Your Name Here', {
      align: 'center',
      color: 'white',
      stroke: 'black',
      strokeThickness: 5,
      fontSize: 22
    })
    .setOrigin(0.5)
  if (store.getState().playerName) {
    this.enterName.setText(store.getState().playerName)
    this.enterName.setColor('gold')
  }

  this.enterName.setInteractive({ useHandCursor: true })

  this.enterName.on('pointerup', () => {
    store.dispatch({ type: TOGGLE_UI })
  })

  // leaderboard
  let leftBoard = { x: width / 2 - 480, y: 400 }
  this.add.image(leftBoard.x, leftBoard.y, 'announcement_board').setScale(0.85)
  this.add
    .text(leftBoard.x, 250, 'Rank   Player   Time     ', {
      align: 'center',
      color: 'gold'
    })
    .setOrigin(0.5)

  let sortTextButton = this.add
    .text(265, 250, 'Sort', {
      align: 'center',
      color: 'white',
      stroke: 'gold',
      strokeThickness: 2
    })
    .setOrigin(0.5)
    .setInteractive()

  // announcement board
  let rightBoard = { x: width / 2 + 480, y: 400 }
  this.add
    .image(rightBoard.x, rightBoard.y, 'announcement_board')
    .setScale(0.85)
  this.add
    .text(
      rightBoard.x,
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
    .image(rightBoard.x, 450, 'iron_man_passive')
    .setVisible(false)
  let captain_america_passive = this.add
    .image(rightBoard.x, 450, 'captain_america_passive')
    .setVisible(false)
  let thor_passive = this.add
    .image(rightBoard.x, 450, 'thor_passive')
    .setVisible(false)
  let iron_man_passive_text = this.add
    .text(
      rightBoard.x - 90,
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
      rightBoard.x - 90,
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
      rightBoard.x - 90,
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
  let playButtonBronze = this.add.image(width / 2, 650, 'play_now_bronze')
  playButtonBronze
    .setVisible(true)
    .setInteractive()
    .setScale(0.8)

  let playButtonRed = this.add.image(width / 2, 650, 'play_now_red')
  playButtonRed
    .setVisible(false)
    .setInteractive()
    .setScale(0.8)

  // title
  let title = this.add
    .image(width / 2, 100, 'title')
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

  // select your champion text
  this.selectYourChampion = this.add
    .text(width / 2, 250, ['Select your champion below'], {
      fontSize: 22,
      align: 'center',
      color: 'white',
      stroke: 'black',
      strokeThickness: 5
    })
    .setOrigin(0.5)

  // face icons
  let iron_man_face = this.add
    .image(width / 2 - 150, 400, 'iron_man_face')
    .setScale(2, 2)
  let captain_america_face = this.add
    .image(width / 2, 400, 'captain_america_face')
    .setScale(2, 2)
  let thor_face = this.add
    .image(width / 2 + 150, 400, 'thor_face')
    .setScale(2, 2)

  iron_man_face.setInteractive()
  captain_america_face.setInteractive()
  thor_face.setInteractive()

  this.selectName = this.add.text()
  iron_man_face.on('pointerdown', () => {
    this.select = 'IronMan'
    this.selectYourChampion.destroy()
    this.selectName.destroy()
    this.selectName = this.add
      .text(width / 2 - 150, 300, ['Iron Man'], {
        fontSize: 22,
        align: 'center',
        color: 'red',
        stroke: 'black',
        strokeThickness: 5
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
    this.selectYourChampion.destroy()
    this.selectName.destroy()
    this.selectName = this.add
      .text(width / 2, 300, ['Captain America'], {
        fontSize: 22,
        align: 'center',
        color: 'CornflowerBlue',
        stroke: 'black',
        strokeThickness: 5
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
    this.selectYourChampion.destroy()
    this.selectName.destroy()
    this.selectName = this.add
      .text(width / 2 + 150, 300, ['Thor'], {
        fontSize: 22,
        align: 'center',
        color: 'yellow',
        stroke: 'black',
        strokeThickness: 5
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
    .sprite(width / 2 - 150, 500, 'IronMan')
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
    .sprite(width / 2, 500, 'CaptainAmerica')
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
    .sprite(width / 2 + 150, 500, 'Thor')
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
  playButtonBronze.on('pointerdown', () => {
    if (this.select) {
      playButtonBronze.setVisible(false)
      playButtonRed.setVisible(true)
    }
  })

  playButtonRed.on('pointerup', () => {
    playButtonBronze.setVisible(true)
    playButtonRed.setVisible(false)
    if (!store.getState().playerName) {
      const guestNum = Math.floor(Math.random() * (10000 - 1000) + 1000)
      store.dispatch({
        type: SET_PLAYER_NAME_WITHOUT_TOGGLE,
        playerName: `Guest ${guestNum}`
      })
      this.enterName.setText(store.getState().playerName)
      this.enterName.setColor('gold')
    } else {
      this.tweens.add({
        targets: transitionBlack,
        alpha: { value: 1, duration: 500, ease: 'Power1' }
      })
      setTimeout(() => {
        this.scene.start('SceneB', { select: this.select })
      }, 500)
    }
  })

  // fetch leaderboard data (async) from server
  const fetchAllData = await API.graphql(
    graphqlOperation(queries.listTodos, {
      limit: 1000
    })
  )
  let leaderboard = fetchAllData.data.listTodos.items
  leaderboard.sort((a, b) =>
    a.timeRecord > b.timeRecord ? 1 : b.timeRecord > a.timeRecord ? -1 : 0
  )

  sortTextButton.on('pointerdown', () => {
    this.leaderboardTexts.forEach(item => {
      item.destroy()
    })
    leaderboardToggle(leaderboard, this)
  })

  this.leaderboardTexts = []
  leaderboard.forEach((i, index) => {
    if (index <= 9) {
      let icon
      if (i.character === 'IronMan') icon = 'iron_man_icon'
      if (i.character === 'CaptainAmerica') icon = 'captain_america_icon'
      if (i.character === 'Thor') icon = 'thor_icon'
      let nameShow = i.name
      if (nameShow.length >= 11) {
        nameShow = nameShow.substring(0, 8) + '..'
      }

      let rank_text = this.add
        .text(55, 280 + 33 * index, index + 1, {
          fontSize: 15,
          align: 'center'
        })
        .setOrigin(0.5)
      let name_text = this.add
        .text(130, 280 + 33 * index, nameShow, {
          fontSize: 15,
          color: 'yellow',
          align: 'center'
        })
        .setOrigin(0.5)
      let time_text = this.add
        .text(215, 280 + 33 * index, i.timeRecord.toFixed(2) + 's ', {
          fontSize: 15,
          align: 'center'
        })
        .setOrigin(0.5)
      let role_icon = this.add
        .image(265, 280 + 33 * index, icon)
        .setOrigin(0.5)
        .setScale(0.6)

      this.leaderboardTexts.push(rank_text, name_text, time_text, role_icon)
    }
  })
}
