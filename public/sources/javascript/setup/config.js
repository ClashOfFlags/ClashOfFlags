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
          }
        },
        splatter: {
          lifetime: 5
        },
        player: {
          waitForRespawn: 3
        },
        barrel: {
          range1: {
            value: 300,
            power: 20
          },
          range2: {
            value: 200,
            power: 50
          },
          range3: {
            value: 150,
            power: 100
          }
        }
    }
}
