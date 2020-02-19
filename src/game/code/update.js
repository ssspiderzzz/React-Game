export default function update () {
  if (this.cursors.right.isDown) {
    this.player.anims.play('right', true)
    this.player.body.setVelocityX(300)
    this.player.facing = 'right'
  } else if (this.cursors.left.isDown) {
    this.player.anims.play('left', true)
    this.player.body.setVelocityX(-300)
    this.player.facing = 'left'
  } else {
    if (this.player.facing === 'right')
      this.player.anims.play('idle_right', true)
    if (this.player.facing === 'left') this.player.anims.play('idle_left', true)
    this.player.body.setVelocityX(0)
  }

  if (this.cursors.up.isDown && !this.doublejump) {
    this.player.body.setVelocityY(-400)
    this.doublejump = true
  }

  if (this.player.body.touching.down) {
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

  if (this.moneyChange) {
    this.moneyChange = false
    this.collectionText.destroy()
    this.collectionText = this.add.text(60, 7, this.money, {
      fontFamily: '"Roboto Condensed"',
      fontSize: 33
    })
  }

  if (this.slimeHP <= 0) {
    this.slime.disableBody(true, true)
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
