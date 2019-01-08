// Card Information
// Important information about the cards specific to this game is stored here.
// This initialises the settings database from which the app will look at from now on.

function evilcalc (players, optionalCards = []) {
  // This function manages how many of this type of card is in the game at a time.
  // It accepts the number of players (total) as an integer, and outputs the number
  // of cards that will be of this type.
  //
  // it also takes in the "optional" cards - this is used in the calculation where
  // optional cards replace this one.

  // Count optional cards on our team
  let optionalCardsOnTeam = 0
  for (var i = optionalCards.length - 1; i >= 0; i--) {
    if (optionalCards[i].team === 'M') { // Only consider cards on our team
      optionalCardsOnTeam += optionalCards[i].calculate_cards(players, optionalCards)
    }
  }

  switch (players) {
    case 5:
      return 2 - optionalCardsOnTeam
    case 6:
      return 2 - optionalCardsOnTeam
    case 7:
      return 3 - optionalCardsOnTeam
    case 8:
      return 3 - optionalCardsOnTeam
    case 9:
      return 3 - optionalCardsOnTeam
    case 10:
      return 4 - optionalCardsOnTeam
    default:
      return players > 10 ? 4 - optionalCardsOnTeam : 2 - optionalCardsOnTeam
  }
}

function goodcalc (players, optionalCards = []) {
  // This function manages how many of this type of card is in the game at a time.
  // It accepts the number of players (total) as an integer, and outputs the number
  // of cards that will be of this type.
  //
  // it also takes in the "optional" cards - this is used in the calculation where
  // optional cards replace this one.

  // Count optional cards
  let optionalCardsCount = 0
  for (var i = optionalCards.length - 1; i >= 0; i--) {
    optionalCardsCount += optionalCards[i].calculate_cards(players, optionalCards)
  }

  // Number of innocents = players - mafioso - optionalCardsCount - Merlin
  return players - evilcalc(players, optionalCards) - optionalCardsCount - 1
}

exports.cardInfo = [
  {
    name: 'Minion of Mordred',
    help_text: 'Vote for quests to succeed or fail.',
    win_condition: 'You win when three quests fail.',
    symbol: 'M',
    calculate_cards: evilcalc,
    optional: false,
    enabled: true,
    useIndefinite: true,
    team: 'M' // Denotes which "team" they are on for calculations. Can be any string
  },
  {
    name: 'Loyal Servent of Arthur',
    help_text: 'Vote for quests to succeed.',
    win_condition: 'You win when three quests succeed.',
    symbol: 'A',
    calculate_cards: goodcalc,
    optional: false,
    enabled: true,
    useIndefinite: true,
    team: 'A' // Denotes which "team" they are on for calculations. Can be any string
  },
  {
    name: 'Merlin',
    help_text: 'Sees the agents of Evil.',
    win_condition: 'You win when three quests succeed.',
    symbol: '🔮',
    calculate_cards: (players, optionalCards = []) => { return 1 },
    optional: false,
    enabled: true,
    useIndefinite: false,
    team: 'A' // Denotes which "team" they are on for calculations. Can be any string
  },
  {
    name: 'Percival',
    help_text: 'Know the identity of Merlin.',
    win_condition: 'You win when three quests succeed.',
    symbol: 'P',
    calculate_cards: (players, optionalCards = []) => { return 1 },
    optional: true,
    enabled: false,
    useIndefinite: false,
    team: 'A' // Denotes which "team" they are on for calculations. Can be any string
  },
  {
    name: 'Mordred',
    help_text: 'Identity not revealed to Merlin.',
    win_condition: 'You win when three quests fail.',
    symbol: '💀',
    calculate_cards: (players, optionalCards = []) => { return 1 },
    optional: true,
    enabled: false,
    useIndefinite: false,
    team: 'M' // Denotes which "team" they are on for calculations. Can be any string
  },
  {
    name: 'Oberon',
    help_text: 'You are not revealed to be evil nor will you know who is.',
    win_condition: 'You win when three quests fail.',
    symbol: 'O',
    calculate_cards: (players, optionalCards = []) => { return 1 },
    optional: true,
    enabled: false,
    useIndefinite: false,
    team: 'M' // Denotes which "team" they are on for calculations. Can be any string
  },
  {
    name: 'Morgana',
    help_text: 'Appears to be Merlin.',
    win_condition: 'You win when three quests fail.',
    symbol: '🌓',
    calculate_cards: (players, optionalCards = []) => { return 1 },
    optional: true,
    enabled: false,
    useIndefinite: false,
    team: 'M' // Denotes which "team" they are on for calculations. Can be any string
  }
]

// Game Information
// Important information about the game itself is stored here.
// This initialises the settings database from which the app will look at from now on.

exports.gameInfo = {
  name: 'Avalon',
  minPlayers: 5,
  maxPlayers: 10,
  optionalTraits: [ // Adapted from Inhuman Conditions
    'Neutral: You may not express opinions, only observable facts',
    'Royal: You may only speak about youself in the third person',
    'Superior: You see yourself as superior to all others.',
    'Pessimist: You may not describe anything getting better than it is at this moment',
    'Optimist: You may not describe anything getting worse than it is at this moment',
    'Recluse: You must refuse to describe what you did in the past',
    'Extrovert: Treat all votes as a popularity competition',
    'Maternal: Mother everybody. Even the Minions of Mordred.',
    'Maternal: Defend anyone younger than you.'
  ]
}
