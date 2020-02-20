export default function drawHealthBar (scene, object) {
  scene.x = object.x - 40
  scene.y = object.y - 50

  scene.bar.clear()

  //  BG
  scene.bar.fillStyle(0x000000)
  scene.bar.fillRect(scene.x, scene.y, 80, 16)

  //  Health

  scene.bar.fillStyle(0xffffff)
  scene.bar.fillRect(scene.x + 2, scene.y + 2, 76, 12)

  if (scene.value < 30) {
    scene.bar.fillStyle(0xff0000)
  } else {
    scene.bar.fillStyle(0x00ff00)
  }

  var d = Math.floor(scene.p * scene.value)

  scene.bar.fillRect(scene.x + 2, scene.y + 2, d, 12)

  scene.add.existing(scene.bar)
}
