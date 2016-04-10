export default{
    game: {
        size: {
            width: 800,
            height: 600
        },
        teams: {
            'red': [1, 2, 3, 4, 5],
            'blue': [6, 7, 8, 9, 10]
        },
        weapons: {
          'fireball': {
            bulletSpeed: 600,
            lifetime: 2.5,
            shotDelay: 300,
            power: 20
          },
          'fireball_red': {
            bulletSpeed: 1000,
            lifetime: 1,
            shotDelay: 400,
            power: 40
          }
        },
        splatter: {
          lifetime: 10
        },
        player: {
          waitForRespawn: 3,
          invisible: 3
        },
        barrel: {
          maxRange: 300,
          maxDamage: 100
        },
        treasureChest: {
          reloadTreasureMin: 20,
          reloadTreasureMax: 60
        }
    }
}
