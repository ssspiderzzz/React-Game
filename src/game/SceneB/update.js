import drawHealthBar from './drawHealthBar'

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
        // this.doublejump = true
      }

      if (this.player.body.touching.down && this.doublejump) {
        this.doublejump = false
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

      if (this.cursors.space.isUp && this.checkSpaceKeyisUp) {
        this.player.shootable = true
        this.checkSpaceKeyisUp = false

        // Thor's special move, attack after swing
        if (this.cursors.space.isDown && this.player.name === 'Thor') {
          if (this.cursors.space.getDuration() < 5000) {
            this.player.thorSwing = this.cursors.space.getDuration()
          } else {
            this.player.thorSwing = 5000
          }
        }

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
      }

      if (this.keyX.isDown) {
        //do nothing
      }
    }

    // player dies
    // when hp drop to 0, make player immobile
    if (this.player.hp <= 0) {
      this.player.alive = false
      this.player.body.allowGravity = false
      this.player.bar.destroy()
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

  // Captain America's Special move, shield comeback
  if (this.player.name === 'CaptainAmerica') {
    if (this.shields.children.size > 0) {
      this.shields.children.iterate(shield => {
        if (shield.shieldTravelTime) {
          shield.body.velocity.y =
            (this.player.body.y + 35 - shield.body.y) / shield.shieldTravelTime
        }
      })
    }
  }

  // Thor's Special move, shield comeback
  if (this.player.name === 'Thor') {
    if (this.hammers.children.size > 0) {
      this.hammers.children.iterate(hammer => {
        if (hammer.hammerTravelTime) {
          hammer.body.velocity.y =
            (this.player.body.y + 35 - hammer.body.y) / hammer.hammerTravelTime
        }
      })
    }
  }
}

function ironManShooter (scene, shootDirection) {
  let shootSpeed
  let shootX
  let flipX
  let shootYDifference = 0
  if (scene.player.shootCount === 1) {
    shootYDifference = 5
  }
  if (shootDirection === 'right') {
    shootSpeed = 450
    shootX = 40
    flipX = false
  }
  if (shootDirection === 'left') {
    shootSpeed = -450
    shootX = -40
    flipX = true
  }

  let beam = scene.beams.create(
    scene.player.x + shootX,
    scene.player.y + 10 + shootYDifference,
    'beam'
  )
  beam.body.setSize(35, 15, 0, 0).setOffset(10, 20)
  beam.body.collideWorldBounds = false
  beam.body.allowGravity = false
  beam.anims.play('beam', true)
  beam.body.velocity.x = shootSpeed
  beam.flipX = flipX
  beam.setScale(1.5, 1.5)
  setTimeout(() => {
    beam.destroy()
  }, 2500)
}

function captainAmericaShooter (scene, shootDirection) {
  let shootSpeed
  let shootX
  let flipX
  if (shootDirection === 'right') {
    shootSpeed = 450
    shootX = 50
    flipX = false
  }
  if (shootDirection === 'left') {
    shootSpeed = -450
    shootX = -50
    flipX = true
  }

  let shield = scene.shields.create(
    scene.player.x + shootX,
    scene.player.y + 10,
    'shield'
  )
  shield.body.setSize(15, 15, 0, 0).setOffset(27.5, 20)
  shield.body.collideWorldBounds = false
  shield.body.allowGravity = false
  shield.anims.play('shield', true)
  shield.body.velocity.x = shootSpeed
  shield.flipX = flipX
  shield.setScale(2, 2)
  setTimeout(() => {
    shield.destroy()
  }, 5000)
}

function thorShooter (scene, shootDirection, swingDuration) {
  let shootSpeed
  let shootX
  let flipX
  let swingModifier = swingDuration / 2500
  swingModifier < 0.5
    ? (swingModifier = 1)
    : swingModifier < 1
    ? (swingModifier = 1.5)
    : swingModifier < 1.5
    ? (swingModifier = 1.5)
    : swingModifier < 2
    ? (swingModifier = 2.5)
    : (swingModifier = 3)

  if (shootDirection === 'right') {
    shootSpeed = 450 * swingModifier
    shootX = 50
    flipX = false
  }
  if (shootDirection === 'left') {
    shootSpeed = -450 * swingModifier
    shootX = -50
    flipX = true
  }

  let hammer = scene.hammers.create(
    scene.player.x + shootX,
    scene.player.y + 10,
    'hammer'
  )
  hammer.body.setSize(15, 15, 0, 0).setOffset(27.5, 20)
  hammer.body.collideWorldBounds = false
  hammer.body.allowGravity = false
  hammer.anims.play('hammer', true)
  hammer.body.velocity.x = shootSpeed
  hammer.flipX = flipX
  hammer.setScale(2, 2)
  setTimeout(() => {
    if (hammer.body.x > scene.player.x && hammer.body.velocity.x > 0)
      hammer.body.velocity.x = -hammer.body.velocity.x
    if (hammer.body.x < scene.player.x && hammer.body.velocity.x < 0)
      hammer.body.velocity.x = -hammer.body.velocity.x
  }, 1000)
  setTimeout(() => {
    hammer.destroy()
  }, 5000)
}

function spiderManShooter (scene, shootDirection, shootSpeed) {
  let web = scene.webs.create(
    scene.player.x + shootDirection,
    scene.player.y + 20,
    'web'
  )
  web.body.setSize(30, 15, 5, 5)
  web.body.collideWorldBounds = true
  web.body.allowGravity = false
  web.anims.play('web', true)
  web.body.velocity.x = shootSpeed
  web.setScale(1.5, 1.5)
  setInterval(() => {
    web.destroy()
  }, 800)
}

function randomMove (object) {
  //randomise the movement
  let droidmover = Math.random()
  let turnChance = Math.random()
  //simple if statement to choose if and which way the droid moves
  if (turnChance < 0.03) {
    if (droidmover >= 0.5) {
      object.body.velocity.x = 100
    } else if (droidmover < 0.5) {
      object.body.velocity.x = -100
    } else {
      object.body.velocity.x = 0
    }
  }
}

function shootProjectile (scene, slime, direction) {
  let plusX
  let velocityX
  let flipX
  if (direction === 'right') {
    plusX = 20
    velocityX = 150
    flipX = false
  }
  if (direction === 'left') {
    plusX = -20
    velocityX = -150
    flipX = true
  }
  let newProjectile = scene.red_projectiles.create(
    slime.body.x + plusX,
    slime.body.y + 30,
    'red_projectiles'
  )
  newProjectile.setSize(90, 110, 0, 0).setOffset(35, 25)
  // newProjectile.body.collideWorldBounds = true
  newProjectile.body.allowGravity = false
  newProjectile.flipX = flipX
  newProjectile.anims.play('red_projectile', true)
  newProjectile.body.velocity.x = velocityX
  newProjectile.setScale(0.5, 0.2)
}
