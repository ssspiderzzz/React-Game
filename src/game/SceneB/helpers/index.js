// update functions

export function ironManShooter (scene, shootDirection) {
  if (scene.player.mp > 25) {
    let shootSpeed
    let shootX
    let flipX
    let shootYDifference = 0
    // energy cost for normal shoot
    scene.player.mp -= 25

    if (scene.player.shootCount === 1) {
      shootYDifference = 5
    }
    if (shootDirection === 'right') {
      shootSpeed = 550
      shootX = 40
      flipX = false
    }
    if (shootDirection === 'left') {
      shootSpeed = -550
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
}

export function ironManUnibeam (scene, shootDirection) {
  let shootSpeed
  let shootX
  let flipX
  // energy cost for Unibeam shoot

  if (shootDirection === 'right') {
    shootSpeed = 800
    shootX = 500
    flipX = false
  }
  if (shootDirection === 'left') {
    shootSpeed = -800
    shootX = -500
    flipX = true
  }

  let uniBeam = scene.uniBeams.create(
    scene.player.x + shootX,
    scene.player.y + 10,
    'uniBeam'
  )
  uniBeam.body.setSize(8, 5, 0, 0).setOffset(23.5, 25)
  uniBeam.body.collideWorldBounds = false
  uniBeam.body.allowGravity = false
  uniBeam.anims.play('uniBeam', true)
  uniBeam.flipX = flipX
  uniBeam.setScale(130, 0.5)
  setTimeout(() => {
    uniBeam.setScale(130, 1)
  }, 250)
  setTimeout(() => {
    uniBeam.setScale(130, 1.5)
  }, 500)
  setTimeout(() => {
    uniBeam.setScale(130, 2)
  }, 750)
  setTimeout(() => {
    uniBeam.setScale(130, 2.5)
    uniBeam.body.velocity.x = shootSpeed
  }, 1000)
  setTimeout(() => {
    uniBeam.destroy()
  }, 3000)
}

export function captainAmericaShooter (scene, shootDirection) {
  let shootSpeed
  let shootX
  let flipX
  // throw out shield
  scene.player.shieldOn = false

  if (shootDirection === 'right') {
    shootSpeed = 600
    shootX = 50
    flipX = false
  }
  if (shootDirection === 'left') {
    shootSpeed = -600
    shootX = -50
    flipX = true
  }

  let shield = scene.shields.create(
    scene.player.x + shootX,
    scene.player.y + 10,
    'shield'
  )
  shield.body.setSize(15, 15, 0, 0).setOffset(27.5, 20)
  shield.setCollideWorldBounds(true)
  shield.damageable = true
  shield.body.onWorldBounds = true
  shield.body.allowGravity = false
  shield.anims.play('shield', true)
  shield.shieldTravelSpeedX = Math.abs(shootSpeed)
  shield.flipX = flipX
  shield.setScale(2, 2)
  shield.setVisible(false)

  setTimeout(() => {
    shield.body.velocity.x = shootSpeed
    shield.setVisible(true)
  }, 100)

  setTimeout(() => {
    shield.destroy()
  }, 5000)
}

export function thorShooter (scene, shootDirection, swingDuration) {
  let shootSpeed
  let shootX
  let flipX
  // energy cost for normal attack
  scene.player.mp -= 20

  let swingModifier = swingDuration / 2500
  swingModifier < 0.25
    ? (swingModifier = 1)
    : swingModifier < 0.5
    ? (swingModifier = 1.5)
    : swingModifier < 0.75
    ? (swingModifier = 1.5)
    : swingModifier < 1
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
  hammer.damageable = true
  hammer.body.collideWorldBounds = false
  hammer.body.allowGravity = false
  hammer.anims.play('hammer', true)
  hammer.body.velocity.x = shootSpeed
  hammer.hammerTravelSpeedX = Math.abs(shootSpeed)
  hammer.flipX = flipX
  hammer.setScale(2, 2)
  setTimeout(() => {
    thorHammerReturn(scene.player, hammer)
  }, 1000)
  setTimeout(() => {
    hammer.destroy()
  }, 3000)
}

export function spiderManShooter (scene, shootDirection, shootSpeed) {
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

export function randomMove (object) {
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

export function shootProjectile (scene, slime, direction) {
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

export function drawHealthBar (scene, object) {
  if (object.hp > 0 && object.hp < 100) {
    let x = object.x - 40
    let y = object.y - 50

    object.bar.clear()

    //  Black Stroke Background
    object.bar.fillStyle(0x000000)
    object.bar.fillRect(x, y, 80, 16)

    //  White Background
    object.bar.fillStyle(0xffffff)
    object.bar.fillRect(x + 2, y + 2, 76, 12)

    if (object.hp < 30) {
      object.bar.fillStyle(0xff0000)
    } else {
      object.bar.fillStyle(0x00ff00)
    }

    let d = Math.floor((76 / 100) * object.hp)

    object.bar.fillRect(x + 2, y + 2, d, 12)

    scene.add.existing(object.bar)
  }
}

export function drawEnergyBar (scene, object) {
  let x = object.x - 40
  let y = object.y - 42

  object.barMP.clear()

  object.barMP.fillStyle(0xffffff)
  object.barMP.fillRect(x + 2, y, 76, 6)

  if (object.mp < 30) {
    object.barMP.fillStyle(0x00ffff)
  } else if (object.mp < 150) {
    object.barMP.fillStyle(0x00bbff)
  } else {
    object.barMP.fillStyle(0xffff00)
  }

  let d = Math.floor((76 / 100) * object.mp)
  object.barMP.fillRect(x + 2, y, d, 6)
  scene.add.existing(object.barMP)
}

// create functions

export function captainShieldReturn (captain, shield) {
  shield.return = true
  shield.damageable = true
  shield.shieldTravelSpeedX = 700
  shield.shieldTravelTime =
    Math.abs(shield.body.x - captain.body.x) / shield.shieldTravelSpeedX
  shield.shieldTravelSpeedY =
    (Math.abs(shield.body.y - captain.body.y) + 35) / shield.shieldTravelTime
}

export function thorHammerReturn (thor, hammer) {
  hammer.return = true
  hammer.hammerTravelSpeedX = Math.abs(hammer.body.velocity.x)
  hammer.hammerTravelTime =
    Math.abs(hammer.body.x - thor.body.x) / hammer.hammerTravelSpeedX
  hammer.hammerTravelSpeedY =
    (Math.abs(hammer.body.y - thor.body.y) + 35) / hammer.hammerTravelTime
}

export function drawDamageText (scene, object, dmg) {
  let dmgText
  dmgText = scene.add.text(object.body.x, object.body.y, '-' + dmg, {
    fontFamily: '"Roboto Condensed"',
    fontSize: 20,
    color: 'red',
    align: 'center'
  })
  setInterval(() => {
    dmgText.y = dmgText.y - 0.75
  }, 25)
  setTimeout(() => {
    dmgText.destroy()
  }, 1000)
}

export function knockBack (scene, player, dmgObject) {
  if (dmgObject.body.x <= player.body.x) {
    scene.knockBack = true
    scene.knockBackOrient = 'right'
    if (player.shootable) scene.player.anims.play('hit', true)
    scene.player.flipX = true
  }
  if (dmgObject.body.x > player.body.x) {
    scene.knockBack = true
    scene.knockBackOrient = 'left'
    if (player.shootable) scene.player.anims.play('hit', true)
    scene.player.flipX = false
  }

  if (scene.knockBackOrient === 'right') {
    scene.player.body.setVelocityX(200)
    scene.player.body.setVelocityY(-200)
  }
  if (scene.knockBackOrient === 'left') {
    scene.player.body.setVelocityX(-200)
    scene.player.body.setVelocityY(-200)
  }
  setTimeout(() => {
    scene.knockBack = false
  }, 850)
  scene.knockBackOrient = false
}

export function hitEffect (scene, object) {
  let hit_effect = scene.hitEffects.create(
    object.body.x + 17.5,
    object.body.y + 7.5,
    'hit_effect'
  )
  hit_effect.body.allowGravity = false
  hit_effect.setScale(1.5, 1.5)
  hit_effect.anims.play('hit_effect', true)
  setTimeout(() => {
    hit_effect.destroy()
  }, 1000)
}
