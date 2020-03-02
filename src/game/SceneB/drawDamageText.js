export default function drawDamageText (scene, object, dmg) {
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
