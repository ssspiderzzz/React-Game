import {
  ironManShooter,
  ironManUnibeam,
  captainAmericaShooter,
  thorShooter,
  thorThunder,
  spiderManShooter,
  randomMove,
  shootProjectile,
  drawHealthBar,
  drawEnergyBar,
  thanos_skill_A_shootAOE
} from './helpers'
import { API, graphqlOperation } from 'aws-amplify'
import * as mutations from '../../graphql/mutations'
import store from '../../store'
import bossThanos from './helpers/bossThanos'

export default async function update (time, delta) {
  // timer
  if (
    this.triggerOnce === 1 &&
    (this.cursors.right.isDown ||
      this.cursors.left.isDown ||
      this.cursors.up.isDown)
  ) {
    this.startTimer = true
    this.triggerOnce--
    // thanos' portal
    let portal = this.add.image(640, 400, 'portal').setScale(0)
    this.tweens.add({
      targets: portal,
      scale: { value: 1, duration: 2000, ease: 'Power1' },
      angle: { value: 360, ease: 'linear', repeat: -1 }
    })
    // init thanos
    setTimeout(() => {
      bossThanos(this)
      this.tweens.add({
        targets: portal,
        scale: { value: 0, duration: 2000, ease: 'Power1' }
      })
      setTimeout(() => {
        portal.destroy()
      }, 2500)
    }, 1500)
  }
  if (this.startTimer) {
    this.timer += delta
    this.timeText.setText('Time: ' + (this.timer / 1000).toFixed(2) + 's')
  }

  if (
    this.boss.alive === false &&
    this.villains.children.size === 0 &&
    this.triggerOnce === 0
  ) {
    this.triggerOnce--
  }

  if (this.triggerOnce === -1) {
    this.triggerOnce--
    this.startTimer = false
    this.timeText.setText('Time: ' + (this.timer / 1000).toFixed(2) + 's')

    const character = this.player.name
    const timeRecord = (this.timer / 1000).toFixed(2)
    const score = timeRecord * 100 + this.player.hp * 10 + this.money * 100
    API.graphql(
      graphqlOperation(mutations.createTodo, {
        input: {
          name: store.getState().playerName,
          character: character,
          timeRecord: timeRecord,
          score: score
        }
      })
    )
    setTimeout(() => {
      this.scene.pause()
      this.scene.launch('SceneEnd', {
        currentSelect: this.select,
        timeRecord: timeRecord
      })
    }, 3000)
  }

  // player
  if (this.player.alive) {
    // hp and mp bar drawing
    drawHealthBar(this, this.player)
    drawEnergyBar(this, this.player)
    // player runs and stands
    if (!this.knockBack) {
      if (this.cursors.right.isDown) {
        if (this.player.shootable) this.player.anims.play('walk', true)
        this.player.flipX = false
        this.player.body.setVelocityX(300)
        this.player.facing = 'right'
      } else if (this.cursors.left.isDown) {
        if (this.player.shootable) this.player.anims.play('walk', true)
        this.player.flipX = true
        this.player.body.setVelocityX(-300)
        this.player.facing = 'left'
      } else {
        if (this.player.facing === 'right') {
          this.player.flipX = false
          if (this.player.shootable) this.player.anims.play('idle', true)
        }
        if (this.player.facing === 'left') {
          this.player.flipX = true
          if (this.player.shootable) this.player.anims.play('idle', true)
        }
        this.player.body.setVelocityX(0)
      }

      // player jumps
      if (this.cursors.up.isDown && this.player.body.touching.down) {
        this.player.body.setVelocityY(-400)
      }

      if (this.cursors.up._justUp && this.cursors.up.duration < 400) {
        this.player.body.velocity.y += 100
        this.cursors.up._justUp = false
      }

      // player shoots
      if (this.keyZ.isDown && this.player.shootable) {
        if (this.player.facing === 'right') {
          this.player.flipX = false
        } else if (this.player.facing === 'left') {
          this.player.flipX = true
        }

        if (this.player.shootCount === 0) {
          this.player.anims.play('attack', true)
          this.player.shootCount = 1
        } else if (this.player.shootCount === 1) {
          this.player.anims.play('attack2', true)
          this.player.shootCount = 0
        } else {
          this.player.anims.play('attack', true)
        }

        if (this.player.name === 'IronMan') {
          ironManShooter(this, this.player.facing)
        }
        if (this.player.name === 'CaptainAmerica') {
          captainAmericaShooter(this, this.player.facing)
        }
        if (this.player.name === 'Thor') {
          this.player.thorSwing = true
        }
        if (this.player.name === 'spiderman') {
          spiderManShooter(this, 20, 450)
        }

        this.player.shootable = false
        this.player.body.setVelocityX(0)
      }

      if (this.keyZ._justUp) {
        this.keyZ._justUp = false

        if (this.player.name === 'IronMan') {
          this.player.shootable = true
        }

        if (this.player.name === 'CaptainAmerica') {
          // this.player.shootable = false
        }

        if (
          this.player.name === 'Thor' &&
          this.player.thorSwing &&
          this.player.mp >= 10
        ) {
          // this.player.shootable = false
          if (this.keyZ.duration < 1000) {
            this.player.thorSwing = this.keyZ.duration
          } else {
            this.player.thorSwing = 1000
          }
          if (this.player.facing === 'right') {
            thorShooter(this, 'right', this.player.thorSwing)
            this.player.anims.play('throw', true)
            this.player.flipX = false
          }
          if (this.player.facing === 'left') {
            thorShooter(this, 'left', this.player.thorSwing)
            this.player.anims.play('throw', true)
            this.player.flipX = true
          }
          this.player.thorSwing = false
        } else if (
          this.player.name === 'Thor' &&
          this.player.thorSwing &&
          this.player.mp < 10
        ) {
          this.player.shootable = true
          this.player.thorSwing = false
        }
      }

      // Special moves, Unibeam, Shield Dash
      if (this.keyX.isDown) {
        // Iron Man
        if (this.player.name === 'IronMan') {
          this.player.shootable = false
          this.player.body.setVelocityX(0)
          if (this.cursors.right.isDown) {
            this.player.facing = 'right'
            this.player.flipX = false
          } else if (this.cursors.left.isDown) {
            this.player.facing = 'left'
            this.player.flipX = true
          }
          if (this.player.mp <= 151) {
            this.player.mp += 1
          }
          this.player.anims.play('special', true)
        }
        // Captain Ameirca
        if (
          this.player.name === 'CaptainAmerica' &&
          this.player.mp > 1 &&
          this.player.shieldOn
        ) {
          if (this.cursors.right.isDown) {
            this.player.flipX = false
            this.player.body.setVelocityX(150)
            this.player.facing = 'right'
          } else if (this.cursors.left.isDown) {
            this.player.flipX = true
            this.player.body.setVelocityX(-150)
            this.player.facing = 'left'
          } else {
            this.player.body.setVelocityX(0)
          }
          this.player.mp -= 0.5
          this.player.shootable = false
          this.player.invincible = true
          this.player.anims.play('block', true)
        } else if (
          this.player.name === 'CaptainAmerica' &&
          this.player.mp <= 1 &&
          this.player.shieldOn
        ) {
          this.player.shootable = true
          this.player.invincible = false
        }
        // Thor
        if (this.player.name === 'Thor') {
          this.player.shootable = false
          this.player.body.setVelocityX(0)
          if (this.cursors.right.isDown) {
            this.player.facing = 'right'
            this.player.flipX = false
          } else if (this.cursors.left.isDown) {
            this.player.facing = 'left'
            this.player.flipX = true
          }
          if (this.player.mp < 99) {
            this.player.mp += 0.1
          }
          this.player.anims.play('charging', true)
        }
      }

      if (this.keyX._justUp) {
        this.keyX._justUp = false

        if (this.player.name === 'IronMan') {
          if (this.player.mp >= 150) {
            this.player.mp -= 150
            this.player.anims.play('specialShoot', true)
            ironManUnibeam(this, this.player.facing)

            setTimeout(() => {
              this.player.shootable = true
            }, 1000)
          } else {
            this.player.shootable = true
          }
        }

        if (this.player.name === 'CaptainAmerica' && this.player.shieldOn) {
          this.player.shootable = true
          this.player.invincible = false
        }

        if (this.player.name === 'Thor') {
          if (this.player.mp >= 50) {
            this.player.anims.play('specialShoot', true)
            thorThunder(this, this.player.facing)

            setTimeout(() => {
              this.player.shootable = true
            }, 1500)
          } else {
            this.player.shootable = true
          }
        }
      }
    }

    // player dies
    // when hp drop to 0, make player immobile
    if (this.player.hp <= 0) {
      this.player.alive = false
      this.player.body.allowGravity = false
      this.player.bar.destroy()
      this.player.barMP.destroy()
      if (this.player.facing === 'right') {
        this.player.anims.play('dead', true)
        this.player.flipX = false
      }
      if (this.player.facing === 'left') {
        this.player.anims.play('dead', true)
        this.player.flipX = true
      }
      setTimeout(() => {
        this.scene.pause()
        this.scene.launch('SceneEnd', { currentSelect: this.select })
      }, 500)
    }
  }

  // collecting coins
  if (this.moneyChange) {
    this.moneyChange = false
    this.collectionText.destroy()
    this.collectionText = this.add.text(60, 7, this.money, {
      fontFamily: '"Roboto Condensed"',
      fontSize: 33
    })
  }

  // villains
  if (this.villains.children.size > 0) {
    this.villains.children.iterate(slime => {
      if (slime) {
        drawHealthBar(this, slime)
        randomMove(slime)
        // red slime can fire projectile
        if (slime.slimeType === 'red') {
          let direction
          let fireRate = Math.random()
          if (slime.body.x < this.player.body.x) {
            direction = 'right'
          } else {
            direction = 'left'
          }
          if (fireRate < 0.003 && !slime.skillCoolDown) {
            shootProjectile(this, slime, direction)
            slime.skillCoolDown = true
            setTimeout(() => {
              slime.skillCoolDown = false
            }, 1000)
          }
        }
        if (slime.hp <= 0) {
          // let dieXY = { x: slime.body.x, y: slime.body.y }
          slime.disableBody(true, true)
          slime.bar.destroy()
          slime.destroy()
        }
      }
    })
  }

  // thanos
  if (this.boss.alive) {
    drawHealthBar(this, this.boss)
    if (!this.boss.snapping) {
      randomMove(this.boss)
      if (this.boss.body.velocity.x !== 0) {
        this.boss.anims.play('Thanos_walk', true)
        if (this.boss.body.velocity.x > 0) {
          this.boss.facing = 'right'
        } else {
          this.boss.facing = 'left'
        }

        if (this.boss.facing === 'right') {
          this.boss.flipX = false
        } else if (this.boss.facing === 'left') {
          this.boss.flipX = true
        }

        if (Math.random() < 0.01 && !this.boss.skillCoolDown) {
          this.boss.body.velocity.x = 0
          this.boss.snapping = true
          this.boss.skillCoolDown = true
          this.boss.anims.play('Thanos_snap', true)
          thanos_skill_A_shootAOE(this, this.boss, this.boss.facing)

          setTimeout(() => {
            this.boss.snapping = false
          }, 1200)
          setTimeout(() => {
            this.boss.skillCoolDown = false
          }, 2000)
        }

        if (Math.random() < 0.01 && !this.boss.skillCoolDown) {
          // thanos tele
          let randomIndex = Math.floor(
            Math.random() * this.thanos_teleport_coords.length
          )
          // thanos teleport skill
          this.boss.snapping = true
          this.boss.skillCoolDown = true
          this.boss.anims.play('Thanos_snap', true)

          // portal in
          let portal_in = this.add
            .image(this.boss.body.x, this.boss.body.y + 100, 'portal')
            .setScale(0)
          this.tweens.add({
            targets: portal_in,
            scale: { value: 1, duration: 800, ease: 'Power1' },
            angle: { value: 360, ease: 'linear', repeat: -1 }
          })
          setTimeout(() => {
            this.tweens.add({
              targets: portal_in,
              scale: { value: 0, duration: 1600, ease: 'Power1' }
            })
            setTimeout(() => {
              portal_in.destroy()
            }, 3200)
          }, 800)

          this.boss.body.x = this.thanos_teleport_coords[randomIndex].x
          this.boss.body.y = this.thanos_teleport_coords[randomIndex].y

          //portal out
          let portal_out = this.add
            .image(
              this.thanos_teleport_coords[randomIndex].x,
              this.thanos_teleport_coords[randomIndex].y + 100,
              'portal'
            )
            .setScale(0)
          this.tweens.add({
            targets: portal_out,
            scale: { value: 1, duration: 800, ease: 'Power1' },
            angle: { value: 360, ease: 'linear', repeat: -1 }
          })

          setTimeout(() => {
            this.tweens.add({
              targets: portal_out,
              scale: { value: 0, duration: 800, ease: 'Power1' }
            })
            setTimeout(() => {
              portal_out.destroy()
            }, 2400)
          }, 800)

          setTimeout(() => {
            this.boss.snapping = false
          }, 1200)

          setTimeout(() => {
            this.boss.skillCoolDown = false
          }, 2000)
        }
      } else {
        this.boss.anims.play('Thanos_idle', true)
      }
    }

    if (this.boss.hp < 0) {
      // boss death anmiations
      if (this.boss.facing === 'right') {
        this.boss.flipX = false
      } else if (this.boss.facing === 'left') {
        this.boss.flipX = true
      }
      this.boss.alive = false
      this.boss.body.setEnable(false)
      this.boss.anims.play('Thanos_die', true)
      this.boss.bar.destroy()
      this.tweens.add({
        targets: this.boss,
        alpha: { value: 0, duration: 3000, ease: 'Power1' }
      })
      setTimeout(() => {
        this.boss.disableBody(true, true)
        this.boss.destroy()
      }, 3000)
    }
  }

  // Iron Man's Special move, energy regeneration
  if (this.player.name === 'IronMan' && this.player.alive) {
    if (this.player.mp <= 100) {
      this.player.mp += 0.5
    } else if (this.player.mp > 100 && !this.keyX.isDown) {
      this.player.mp -= 0.25
    }
  }

  // Captain America's Special move, shield comeback, health regeneration
  if (this.player.name === 'CaptainAmerica' && this.player.alive) {
    if (this.player.hp < 98) {
      if (Math.random() < 0.01) this.player.hp += 1
    }
    if (this.player.mp <= 100) {
      this.player.mp += 0.1
    }
    if (this.shields.children.size > 0) {
      this.shields.children.iterate(shield => {
        if (shield.return) {
          if (Math.abs(this.player.body.x - shield.body.x) < 10) {
            shield.body.velocity.x = 0
          } else if (shield.body.x > this.player.body.x) {
            shield.body.velocity.x = -shield.shieldTravelSpeedX
          } else {
            shield.body.velocity.x = shield.shieldTravelSpeedX
          }

          if (Math.abs(this.player.body.y + 35 - shield.body.y) < 10) {
            shield.body.velocity.y = 0
          } else if (shield.body.y > this.player.body.y + 35) {
            shield.body.velocity.y = -shield.shieldTravelSpeedY
          } else {
            shield.body.velocity.y = shield.shieldTravelSpeedY
          }
        }
      })
    }
  }

  // Thor's Special move, hammer comeback
  if (this.player.name === 'Thor') {
    if (this.player.mp <= 100) {
      this.player.mp += 0.1
    }
    if (this.hammers.children.size > 0) {
      this.hammers.children.iterate(hammer => {
        if (hammer.return) {
          if (Math.abs(this.player.body.x - hammer.body.x) < 10) {
            hammer.body.velocity.x = 0
          } else if (hammer.body.x > this.player.body.x) {
            hammer.body.velocity.x = -hammer.hammerTravelSpeedX
          } else {
            hammer.body.velocity.x = hammer.hammerTravelSpeedX
          }

          if (Math.abs(this.player.body.y + 35 - hammer.body.y) < 10) {
            hammer.body.velocity.y = 0
          } else if (hammer.body.y > this.player.body.y + 35) {
            hammer.body.velocity.y = -hammer.hammerTravelSpeedY
          } else {
            hammer.body.velocity.y = hammer.hammerTravelSpeedY
          }
        }
      })
    }
  }
}
