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
          webShooter(newWeb_right, 450)
        }

        if (this.player.facing === 'left') {
          this.player.anims.play('attack', true)
          this.player.flipX = true
          let newWeb_left = this.webs.create(
            this.player.x - 20,
            this.player.y + 20,
            'web'
          )
          webShooter(newWeb_left, -450)
        }
      }

      // player dies
      // when hp drop to 0, make player immobile
      if (this.player.hp <= 0) {
        this.player.alive = false
        this.player.body.allowGravity = false
        this.player.bar.destroy()
        if (this.player.facing === 'right') {
          this.player.anims.play('gohst', true)
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

  // coins
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
      if (slime.body.enable) {
        drawHealthBar(this, slime)
        randomMove(slime)
        if (slime.hp <= 0) {
          slime.disableBody(true, true)
          slime.bar.destroy()
        }
      }
    })
  }
}

function webShooter (web, shootSpeed) {
  web.body.setSize(15, 15, 5, 5)
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
