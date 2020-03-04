export function ironManShooter (scene, shootDirection) {
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

export function captainAmericaShooter (scene, shootDirection) {
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
  shield.shieldTravelSpeedX = Math.abs(shootSpeed)
  shield.flipX = flipX
  shield.setScale(2, 2)
  setTimeout(() => {
    shield.destroy()
  }, 5000)
}

export function thorShooter (scene, shootDirection, swingDuration) {
  let shootSpeed
  let shootX
  let flipX
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

export function thorHammerReturn (thor, hammer) {
  hammer.return = true
  hammer.hammerTravelSpeedX = Math.abs(hammer.body.velocity.x)
  hammer.hammerTravelTime =
    Math.abs(hammer.body.x - thor.body.x) / hammer.hammerTravelSpeedX
  hammer.hammerTravelSpeedY =
    (Math.abs(hammer.body.y - thor.body.y) + 35) / hammer.hammerTravelTime
}

// in create after this line -----------

export function knockBack (scene, player, dmgObject) {
  if (dmgObject.body.x <= player.body.x) {
    scene.knockBack = true
    scene.knockBackOrient = 'right'
    scene.player.anims.play('hit', true)
    scene.player.flipX = true
  }
  if (dmgObject.body.x > player.body.x) {
    scene.knockBack = true
    scene.knockBackOrient = 'left'
    scene.player.anims.play('hit', true)
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

export function beamHitEffect (scene, beam) {
  let beam_hit = scene.beams_hit.create(
    beam.body.x + 17.5,
    beam.body.y + 7.5,
    'beam_hit'
  )
  beam_hit.body.allowGravity = false
  beam_hit.setScale(1.5, 1.5)
  beam_hit.anims.play('beam_hit', true)
  setTimeout(() => {
    beam_hit.destroy()
  }, 1000)
  beam.disableBody(true, true)
}

export function shieldHitEffect (scene, shield) {
  let shield_hit = scene.shields_hit.create(
    shield.body.x + 17.5,
    shield.body.y + 7.5,
    'shield_hit'
  )
  shield_hit.body.allowGravity = false
  shield_hit.setScale(1.5, 1.5)
  shield_hit.anims.play('shield_hit', true)
  setTimeout(() => {
    shield_hit.destroy()
  }, 1000)
}

export function hammerHitEffect (scene, hammer) {
  let hammer_hit = scene.hammers_hit.create(
    hammer.body.x + 17.5,
    hammer.body.y + 7.5,
    'hammer_hit'
  )
  hammer_hit.body.allowGravity = false
  hammer_hit.setScale(1.5, 1.5)
  hammer_hit.anims.play('hammer_hit', true)
  setTimeout(() => {
    hammer_hit.destroy()
  }, 1000)
}