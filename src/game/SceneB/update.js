import drawHealthBar from './helpers/drawHealthBar'
import {
  ironManShooter,
  captainAmericaShooter,
  thorShooter,
  spiderManShooter,
  randomMove,
  shootProjectile
  // thorHammerReturn,
  // knockBack,
  // beamHitEffect,
  // shieldHitEffect,
  // hammerHitEffect
} from './helpers'

export default function update () {
  // player
  if (this.player.alive) {
    drawHealthBar(this, this.player)

    // player runs and stands
    if (!this.knockBack) {
      if (this.player.shootable) {
        if (this.cursors.right.isDown) {
          this.player.anims.play('walk', true)
          this.player.flipX = false
          this.player.body.setVelocityX(300)
          this.player.facing = 'right'
        } else if (this.cursors.left.isDown) {
          this.player.anims.play('walk', true)
          this.player.flipX = true
          this.player.body.setVelocityX(-300)
          this.player.facing = 'left'
        } else {
          if (this.player.facing === 'right') {
            this.player.flipX = false
            this.player.anims.play('idle', true)
          }
          if (this.player.facing === 'left') {
            this.player.flipX = true
            this.player.anims.play('idle', true)
          }
          this.player.body.setVelocityX(0)
        }
      }

      // player jumps
      if (this.cursors.up.isDown && this.player.body.touching.down) {
        this.player.body.setVelocityY(-400)
        this.jumpable = false
      }

      if (
        this.cursors.up.isUp &&
        !this.jumpable &&
        this.cursors.up.duration < 400
      ) {
        this.player.body.velocity.y += 100
        this.jumpable = true
      }

      // player shoots
      if (this.cursors.space.isDown && this.player.shootable) {
        if (this.player.facing === 'right') {
          if (this.player.shootCount === 0) {
            this.player.anims.play('attack', true)
            this.player.shootCount = 1
          } else if (this.player.shootCount === 1) {
            this.player.anims.play('attack2', true)
            this.player.shootCount = 0
          } else {
            this.player.anims.play('attack', true)
          }
          this.player.flipX = false
          if (this.player.name === 'IronMan') ironManShooter(this, 'right')
          if (this.player.name === 'CaptainAmerica')
            setTimeout(() => {
              captainAmericaShooter(this, 'right')
            }, 200)
          if (this.player.name === 'spiderman') spiderManShooter(this, 20, 450)
        }

        if (this.player.facing === 'left') {
          if (this.player.shootCount === 0) {
            this.player.anims.play('attack', true)
            this.player.shootCount = 1
          } else if (this.player.shootCount === 1) {
            this.player.anims.play('attack2', true)
            this.player.shootCount = 0
          } else {
            this.player.anims.play('attack', true)
          }
          this.player.flipX = true
          if (this.player.name === 'IronMan') ironManShooter(this, 'left')
          if (this.player.name === 'CaptainAmerica')
            setTimeout(() => {
              captainAmericaShooter(this, 'left')
            }, 200)
          if (this.player.name === 'spiderman')
            spiderManShooter(this, -20, -450)
        }

        this.player.shootable = false
        this.checkSpaceKeyisUp = true
        this.player.body.setVelocityX(0)
      }

      // Thor's special move, attack after swing
      if (this.cursors.space.isDown && this.player.name === 'Thor') {
        if (this.cursors.space.getDuration() < 2500) {
          this.player.thorSwing = this.cursors.space.getDuration()
        } else {
          this.player.thorSwing = 2500
        }
      }

      if (this.cursors.space.isUp && this.checkSpaceKeyisUp) {
        this.player.shootable = true
        this.checkSpaceKeyisUp = false

        if (this.player.name === 'Thor') {
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
          this.player.shootable = false
        }

        if (this.player.name === 'CaptainAmerica') {
          this.player.shootable = false
        }
      }

      // Iron Man special move, test!!!!!!!!!----------
      if (this.keyX.isDown) {
        this.player.shootable = false
        this.player.body.setVelocityX(0)

        if (this.player.name === 'IronMan') {
          if (this.player.mp <= 151) {
            this.player.mp += 1
            this.player.anims.play('special', true)
          } else {
            this.player.anims.play('special', true)
          }
        }
      }

      if (this.keyX.isUp) {
        if (this.player.name === 'IronMan' && !this.player.shootable) {
          if (this.player.mp >= 150) {
            this.player.mp -= 150
            this.player.anims.play('specialShoot', true)
            this.player.specialShoot = true
            setTimeout(() => {
              this.player.shootable = true
              this.player.specialShoot = false
            }, 500)
          } else if (this.player.specialShoot) {
          } else {
            this.player.shootable = true
            this.player.specialShoot = false
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
        this.player.body.setVelocityX(0)
        this.player.body.setVelocityY(-10)
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

  // slimes
  if (this.slimes.children.size > 0) {
    this.slimes.children.iterate(slime => {
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
          if (fireRate < 0.003) {
            shootProjectile(this, slime, direction)
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

  // Iron Man's Special move, energy regeneration
  if (this.player.name === 'IronMan' && this.player.alive) {
    if (this.player.mp <= 100) {
      this.player.mp += 0.5
    } else if (this.player.mp > 100 && !this.keyX.isDown) {
      this.player.mp -= 0.25
    }

    let x = this.player.x - 40
    let y = this.player.y - 42

    this.player.barMP.clear()

    this.player.barMP.fillStyle(0xffffff)
    this.player.barMP.fillRect(x + 2, y, 76, 6)

    if (this.player.mp < 30) {
      this.player.barMP.fillStyle(0x00ffff)
    } else {
      this.player.barMP.fillStyle(0x00fff0)
    }

    let d = Math.floor((76 / 100) * this.player.mp)
    this.player.barMP.fillRect(x + 2, y, d, 6)
    this.add.existing(this.player.barMP)
  }

  // Captain America's Special move, shield comeback
  if (this.player.name === 'CaptainAmerica') {
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

  // Thor's Special move, shield comeback
  if (this.player.name === 'Thor') {
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
