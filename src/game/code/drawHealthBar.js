export default function drawHealthBar (scene, object) {
  if (object.hp < 100) {
    let x = object.x - 40
    let y = object.y - 50

    object.bar.clear()

    //  BG
    object.bar.fillStyle(0x000000)
    object.bar.fillRect(x, y, 80, 16)

    //  Health

    object.bar.fillStyle(0xffffff)
    object.bar.fillRect(x + 2, y + 2, 76, 12)

    if (object.hp < 30) {
      object.bar.fillStyle(0xff0000)
    } else {
      object.bar.fillStyle(0x00ff00)
    }

    var d = Math.floor((76 / 100) * object.hp)

    object.bar.fillRect(x + 2, y + 2, d, 12)

    scene.add.existing(object.bar)
  }
}
