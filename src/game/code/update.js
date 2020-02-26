import drawHealthBar from './drawHealthBar'

export default function update () {
  // player
  if (this.player.alive) {
    drawHealthBar(this, this.player)

    // player runs and stands
    if (!this.knockBack) {
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

      // player jumps
      if (this.cursors.up.isDown && !this.doublejump) {
        this.player.body.setVelocityY(-400)
        this.doublejump = true
      }

      if (this.player.body.touching.down && this.doublejump) {
        this.doublejump = false
      }

      // player shoots
      if (this.cursors.space.isDown) {
        if (this.player.facing === 'right') {
          this.player.anims.play('attack', true)
          this.player.flipX = false
          let newWeb_right = this.webs.create(
            this.player.x + 20,
            this.player.y + 20,
            'web'
          )
          shootWeb(newWeb_right, 450)
        }

        if (this.player.facing === 'left') {
          this.player.anims.play('attack', true)
          this.player.flipX = true
          let newWeb_left = this.webs.create(
            this.player.x - 20,
            this.player.y + 20,
            'web'
          )
          shootWeb(newWeb_left, -450)
        }
      }

      if (this.keyX.isDown) {
        //do nothing
      }

      // player dies
      // when hp drop to 0, make player immobile
      if (this.player.hp <= 0) {
        this.player.alive = false
        this.player.body.allowGravity = false
        this.player.bar.destroy()
        if (this.player.facing === 'right') {
          this.player.anims.play('ghost', true)
          this.player.flipX = false
        }
        if (this.player.facing === 'left') {
          this.player.anims.play('ghost', true)
          this.player.flipX = true
        }
        setTimeout(() => {
          this.player.body.setVelocityX(0)
          this.player.body.setVelocityY(-10)
        }, 500)
      }
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
}

function shootWeb (web, shootSpeed) {
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
