export function leaderboardToggle (leaderboard, scene) {
  let leaderboard_filtered = leaderboard.filter(i => {
    if (scene.rotation === 0) return i.character === 'IronMan'
    if (scene.rotation === 1) return i.character === 'CaptainAmerica'
    if (scene.rotation === 2) return i.character === 'Thor'
    return true
  })

  leaderboard_filtered.forEach((i, index) => {
    if (index <= 9) {
      let icon
      if (i.character === 'IronMan') icon = 'iron_man_icon'
      if (i.character === 'CaptainAmerica') icon = 'captain_america_icon'
      if (i.character === 'Thor') icon = 'thor_icon'
      let nameShow = i.name
      if (nameShow.length >= 10) {
        nameShow = nameShow.substring(0, 8) + '..'
      }

      let rank_text = scene.add
        .text(55, 280 + 33 * index, index + 1, {
          fontSize: 15,
          align: 'center'
        })
        .setOrigin(0.5)
      let name_text = scene.add
        .text(130, 280 + 33 * index, nameShow, {
          fontSize: 15,
          color: 'yellow',
          align: 'center'
        })
        .setOrigin(0.5)
      let time_text = scene.add
        .text(215, 280 + 33 * index, i.timeRecord.toFixed(2) + 's ', {
          fontSize: 15,
          align: 'center'
        })
        .setOrigin(0.5)
      let role_icon = scene.add
        .image(265, 280 + 33 * index, icon)
        .setOrigin(0.5)
        .setScale(0.6)

      scene.leaderboardTexts.push(rank_text, name_text, time_text, role_icon)
    }
  })

  if (scene.rotation === 0) {
    scene.rotation++
  } else if (scene.rotation === 1) {
    scene.rotation++
  } else if (scene.rotation === 2) {
    scene.rotation++
  } else if (scene.rotation === 3) {
    scene.rotation = 0
  }
}
