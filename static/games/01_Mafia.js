// Card Information
// Important information about the cards specific to this game is stored here.
// This initialises the settings database from which the app will look at from now on.

function mafiacalc (players, optionalCards = []) {
  // This function manages how many of this type of card is in the game at a time.
  // It accepts the number of players (total) as an integer, and outputs the number
  // of cards that will be of this type.
  //
  // it also takes in the "optional" cards - this is used in the calculation where
  // optional cards replace this one.

  // While there is some debate on the best way to insert mafioso, the logic here
  // is based loosely on a poll from BoardGameGeek.
  //
  // https://boardgamegeek.com/thread/538785/poll-how-many-wolves-basic-game

  // Count optional cards on our team
  let optionalCardsOnTeam = 0
  for (var i = optionalCards.length - 1; i >= 0; i--) {
    if (optionalCards[i].team === 'W') { // Only consider cards on our team
      console.log('Using optional card:')
      optionalCardsOnTeam += optionalCards[i].calculate_cards(players, optionalCards)
    }
  }

  if (players < 13) {
    return 2 - optionalCardsOnTeam
  }
  if (players < 18) {
    return 3 - optionalCardsOnTeam
  }
  if (players < 22) {
    return 4 - optionalCardsOnTeam
  }

  // Beyond here is not indicated by the poll, and so we will make 1/6th of players
  // (rounded up) wolves which roughly follows the trend.
  //
  // Realistically, at this point you might typically consider breaking the game off
  // into villages.

  return Math.ceil(players / 6) - optionalCardsOnTeam
}

function innocentcalc (players, optionalCards = []) {
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

  // Number of innocents = players - mafioso - optionalCardsCount
  return players - mafiacalc(players, optionalCards) - optionalCardsCount
}

exports.cardInfo = [
  {
    name: 'Mafioso',
    help_text: 'Wake up each night and choose a person to attack.',
    win_condition: 'You win when The Mafia outnumber innocents.',
    symbol: 'M',
    calculate_cards: mafiacalc,
    optional: false,
    enabled: true,
    team: 'M' // Denotes which "team" they are on for calculations. Can be any string
  },
  {
    name: 'Innocent',
    help_text: 'Find and vote out all of The Mafia.',
    win_condition: 'You win when all of The Mafia is arrested.',
    symbol: 'I',
    calculate_cards: innocentcalc,
    optional: false,
    enabled: true,
    team: 'I' // Denotes which "team" they are on for calculations. Can be any string
  },
  {
    name: 'Doctor',
    help_text: 'Protect one person from attack each night.',
    win_condition: 'You win when all of The Mafia is arrested.',
    symbol: '+',
    calculate_cards: (players, optionalCards = []) => { return 1 },
    optional: true,
    enabled: true,
    team: 'I' // Denotes which "team" they are on for calculations. Can be any string
  },
  {
    name: 'Detective',
    help_text: 'Check if someone is in The Mafia each night.',
    win_condition: 'You win when all of The Mafia is arrested.',
    symbol: '?',
    calculate_cards: (players, optionalCards = []) => { return 1 },
    optional: true,
    enabled: true,
    team: 'I' // Denotes which "team" they are on for calculations. Can be any string
  },
  {
    name: 'Drunk Mafioso',
    help_text: "Act as a normal mafioso. You must say 'Mafia' once per day.",
    win_condition: 'You win when The Mafia outnumber innocents.',
    symbol: 'D M',
    calculate_cards: (players, optionalCards = []) => { return 1 },
    optional: true,
    enabled: false,
    team: 'M' // Denotes which "team" they are on for calculations. Can be any string
  },
  {
    name: 'Witness',
    help_text: 'Learn who the mafia are during the first night.',
    win_condition: 'You win when all of The Mafia is arrested.',
    symbol: '👁',
    calculate_cards: (players, optionalCards = []) => { return 1 },
    optional: true,
    enabled: false,
    team: 'I' // Denotes which "team" they are on for calculations. Can be any string
  },
  {
    name: 'Little Girl',
    help_text: 'Secretly peek as The Mafia pick.',
    win_condition: 'You win when all of The Mafia is arrested.',
    symbol: '👧',
    calculate_cards: (players, optionalCards = []) => { return 1 },
    optional: true,
    enabled: false,
    team: 'I' // Denotes which "team" they are on for calculations. Can be any string
  },
  {
    name: 'Veteran',
    help_text: 'Choose a person to die each night up to three times.',
    win_condition: 'You win when all of The Mafia is arrested.',
    symbol: '🎖',
    calculate_cards: (players, optionalCards = []) => { return 1 },
    optional: true,
    enabled: false,
    team: 'I' // Denotes which "team" they are on for calculations. Can be any string
  },
  {
    name: 'Godfather',
    help_text: 'You look innocent to detectives.',
    win_condition: 'You win when The Mafia outnumber innocents.',
    symbol: '!',
    calculate_cards: (players, optionalCards = []) => { return 1 },
    optional: true,
    enabled: false,
    team: 'M' // Denotes which "team" they are on for calculations. Can be any string
  },
  {
    name: 'Miller',
    help_text: 'You look guilty to detectives.',
    win_condition: 'You win when all of The Mafia is arrested.',
    symbol: 'M',
    calculate_cards: (players, optionalCards = []) => { return 1 },
    optional: true,
    enabled: false,
    team: 'I' // Denotes which "team" they are on for calculations. Can be any string
  },
  {
    name: 'Traitor',
    help_text: 'Act and take turns as an innocent. Do not wake at night.',
    win_condition: 'You win when The Mafia outnumber innocents.',
    symbol: 'T',
    calculate_cards: (players, optionalCards = []) => { return 1 },
    optional: true,
    enabled: false,
    team: 'M' // Denotes which "team" they are on for calculations. Can be any string
  },
  {
    name: 'Undercover Cop',
    help_text: 'Act and take turns as a Mafioso.',
    win_condition: 'You win when all of The Mafia is arrested.',
    symbol: 'C',
    calculate_cards: (players, optionalCards = []) => { return 1 },
    optional: true,
    enabled: false,
    team: 'I' // Denotes which "team" they are on for calculations. Can be any string
  },
  {
    name: 'Thief',
    help_text: 'On the first night, swap cards.',
    win_condition: 'You win when all of The Mafia is arrested.',
    symbol: '⇆',
    calculate_cards: (players, optionalCards = []) => { return 1 },
    optional: true,
    enabled: false,
    team: 'I' // Denotes which "team" they are on for calculations. Can be any string
  },
  {
    name: 'Mason',
    help_text: 'Secretly know the identity of another Mason',
    win_condition: 'You win when all of The Mafia is arrested.',
    symbol: '△',
    calculate_cards: (players, optionalCards = []) => { return 2 },
    optional: true,
    enabled: false,
    team: 'I' // Denotes which "team" they are on for calculations. Can be any string
  }
]

// Game Information
// Important information about the game itself is stored here.
// This initialises the settings database from which the app will look at from now on.

exports.gameInfo = {
  name: 'Mafia',
  minPlayers: 5,
  maxPlayers: 75,
  optionalTraits: [ // Adapted from Inhuman Conditions
    'Trusting: You may not attack the person two to your left',
    'Trusting: You may not attack the person to your left',
    'Trusting: You may not attack the person to your right',
    'Instigator: You may not defend the person two to your left',
    'Instigator: You may not defend the person to your left',
    'Instigator: You may not defend the person to your right',
    'Restless: You must shift about uneasily as the mafioso come out at night',
    'Village Idiot: You must always vote to eliminate a nominated player',
    'Neutral: You may not express opinions, only observable facts',
    'Royal: You may only speak about youself in the third person',
    'Superior: You see yourself as superior to all others.',
    'Pessimist: You may not describe anything getting better than it is at this moment',
    'Optimist: You may not describe anything getting worse than it is at this moment',
    'Recluse: You must refuse to describe what you did in the past',
    'Extrovert: Treat all votes as a popularity competition',
    'Maternal: Mother everybody. Even the mafioso.',
    'Maternal: Defend anyone younger than you.'
  ]
}
