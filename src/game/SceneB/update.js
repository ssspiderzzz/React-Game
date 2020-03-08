import {
  ironManShooter,
  ironManUnibeam,
  captainAmericaShooter,
  thorShooter,
  spiderManShooter,
  randomMove,
  shootProjectile,
  drawHealthBar,
  drawEnergyBar
} from './helpers'

export default function update () {
  // hp and mp bar drawing
  drawHealthBar(this, this.player)
  drawEnergyBar(this, this.player)

  // player
  if (this.player.alive) {
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
      }

      if (this.cursors.up._justUp && this.cursors.up.duration < 400) {
        this.player.body.velocity.y += 100
        this.cursors.up._justUp = false
      }

      // player shoots
      if (this.cursors.space.isDown && this.player.shootable) {
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

      if (this.cursors.space._justUp) {
        this.cursors.space._justUp = false

        if (this.player.name === 'IronMan') {
          this.player.shootable = true
        }

        if (this.player.name === 'CaptainAmerica') {
          this.player.shootable = false
        }

        if (
          this.player.name === 'Thor' &&
          this.player.thorSwing &&
          this.player.mp >= 20
        ) {
          this.player.shootable = false
          if (this.cursors.space.duration < 2500) {
            this.player.thorSwing = this.cursors.space.duration
          } else {
            this.player.thorSwing = 2500
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
          this.player.mp < 20
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
            this.player.mp += 1
          }
          this.player.anims.play('special', true)
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

        if (this.player.name === 'CaptainAmerica') {
          this.player.shootable = true
          this.player.invincible = false
        }

        if (this.player.name === 'Thor') {
          this.player.shootable = true
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
