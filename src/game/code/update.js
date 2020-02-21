import drawHealthBar from './drawHealthBar'

export default function update () {
  drawHealthBar(this, this.player)

  if (this.knockBack && this.knockBackOrient) {
    if (this.knockBackOrient === 'right') {
      this.player.body.setVelocityX(200)
      this.player.body.setVelocityY(-200)
    }
    if (this.knockBackOrient === 'left') {
      this.player.body.setVelocityX(-200)
      this.player.body.setVelocityY(-200)
    }
    setTimeout(() => {
      this.knockBack = false
    }, 900)
    this.knockBackOrient = false
  }

  if (!this.knockBack && this.player.alive) {
    if (this.cursors.right.isDown) {
      this.player.anims.play('right', true)
      this.player.body.setVelocityX(300)
      this.player.facing = 'right'
    } else if (this.cursors.left.isDown) {
      this.player.anims.play('left', true)
      this.player.body.setVelocityX(-300)
      this.player.facing = 'left'
    } else {
      if (this.player.facing === 'right') {
        this.player.anims.play('idle_right', true)
      }
      if (this.player.facing === 'left') {
        this.player.anims.play('idle_left', true)
      }
      this.player.body.setVelocityX(0)
    }

    if (this.cursors.up.isDown && !this.doublejump) {
      this.player.body.setVelocityY(-400)
      this.doublejump = true
    }

    if (this.player.body.touching.down && this.doublejump) {
      this.doublejump = false
    }

    if (this.cursors.space.isDown) {
      if (this.player.facing === 'right') {
        this.player.anims.play('atk_right', true)
        let newWeb_right = this.webs.create(
          this.player.x + 20,
          this.player.y + 20,
          'web'
        )
        webShooter(newWeb_right, 350)
      }

      if (this.player.facing === 'left') {
        this.player.anims.play('atk_left', true)
        let newWeb_left = this.webs.create(
          this.player.x - 20,
          this.player.y + 20,
          'web'
        )
        webShooter(newWeb_left, -350)
      }
    }
  }

  if (this.moneyChange) {
    this.moneyChange = false
    this.collectionText.destroy()
    this.collectionText = this.add.text(60, 7, this.money, {
      fontFamily: '"Roboto Condensed"',
      fontSize: 33
    })
  }

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

  if (this.player.hp <= 0 && this.player.alive) {
    // when hp drop to 0, make player immobile
    this.player.alive = false
    this.player.body.allowGravity = false
    this.player.bar.destroy()
    if (this.player.facing === 'right') {
      this.player.anims.play('ghost_right', true)
    }
    if (this.player.facing === 'left') {
      this.player.anims.play('ghost_left', true)
    }
    setTimeout(() => {
      this.player.body.setVelocityX(0)
      this.player.body.setVelocityY(-10)
    }, 100)
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
  }, 1000)
}

function randomMove (object) {
  //randomise the movement
  let droidmover = Math.random()
  let changeChance = Math.random()
  //simple if statement to choose if and which way the droid moves
  if (changeChance < 0.04) {
    if (droidmover >= 0.5) {
      object.body.velocity.x = 100
    } else if (droidmover < 0.5) {
      object.body.velocity.x = -100
    } else {
      object.body.velocity.x = 0
    }
  }
}
