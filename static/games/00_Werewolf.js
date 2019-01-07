// Card Information
// Important information about the cards specific to this game is stored here.
// This initialises the settings database from which the app will look at from now on.

function werewolfcalc(players,optional_cards=[]) {
  // This function manages how many of this type of card is in the game at a time.
  // It accepts the number of players (total) as an integer, and outputs the number
  // of cards that will be of this type.
  // 
  // it also takes in the "optional" cards - this is used in the calculation where
  // optional cards replace this one.
  
  // While there is some debate on the best way to insert werewolves, the logic here
  // is based loosely on a poll from BoardGameGeek.
  // 
  // https://boardgamegeek.com/thread/538785/poll-how-many-wolves-basic-game
    
  // Count optional cards on our team
  let optional_cards_onteam = 0
  for (var i = optional_cards.length - 1; i >= 0; i--) {
    if (optional_cards[i].team == "W") { // Only consider cards on our team
      console.log("Using optional card:")
      optional_cards_onteam += optional_cards[i].calculate_cards(players,optional_cards)
    }
  }

  if (players < 13) {
    return 2 - optional_cards_onteam
  }
  if (players < 18) {
    return 3 - optional_cards_onteam
  }
  if (players < 22) {
    return 4 - optional_cards_onteam
  }

  // Beyond here is not indicated by the poll, and so we will make 1/6th of players
  // (rounded up) wolves which roughly follows the trend.
  // 
  // Realistically, at this point you might typically consider breaking the game off
  // into villages.
  
  return Math.ceil(players/6) - optional_cards_onteam
  
}

function villagercalc(players,optional_cards=[]) {
  // This function manages how many of this type of card is in the game at a time.
  // It accepts the number of players (total) as an integer, and outputs the number
  // of cards that will be of this type.
  // 
  // it also takes in the "optional" cards - this is used in the calculation where
  // optional cards replace this one.
  
  // Count optional cards
  let optional_cards_count = 0
  for (var i = optional_cards.length - 1; i >= 0; i--) {
    optional_cards_count += optional_cards[i].calculate_cards(players,optional_cards)
  }
  
  // Number of villagers = players - werewolves - optional_cards_count
  return players - werewolfcalc(players,optional_cards) - optional_cards_count
}

exports.card_info = [
  {
    name: "Werewolf",
    help_text: "Wake up each night and choose a person to attack.",
    win_condition: "You win when werewolves outnumber villagers.",
    symbol: "W",
    calculate_cards: werewolfcalc,
    optional: false,
    enabled: true,
    team: "W" // Denotes which "team" they are on for calculations. Can be any string
  },
  {
    name: "Teenage Werewolf",
    help_text: "Act as a normal werewolf. You must say 'Werewolf' once per day.",
    win_condition: "You win when werewolves outnumber villagers.",
    symbol: "T W",
    calculate_cards: (players,optional_cards=[]) => {return 1},
    optional: false,
    enabled: true,
    team: "W" // Denotes which "team" they are on for calculations. Can be any string
  },
  {
    name: "Villager",
    help_text: "Find and vote out all werewolves.",
    win_condition: "You win when no werewolves remain.",
    symbol: "V",
    calculate_cards: villagercalc,
    optional: false,
    enabled: true,
    team: "V" // Denotes which "team" they are on for calculations. Can be any string
  },
  {
    name: "Doctor",
    help_text: "Protect one person from attack each night.",
    win_condition: "You win when no werewolves remain.",
    symbol: "D",
    calculate_cards: (players,optional_cards=[]) => {return 1},
    optional: true,
    enabled: true,
    team: "V" // Denotes which "team" they are on for calculations. Can be any string
  },
  {
    name: "Seer",
    help_text: "Attempt to detect a werewolf each night.",
    win_condition: "You win when no werewolves remain.",
    symbol: "S",
    calculate_cards: (players,optional_cards=[]) => {return 1},
    optional: true,
    enabled: true,
    team: "V" // Denotes which "team" they are on for calculations. Can be any string
  },
  {
    name: "Witness",
    help_text: "Learn who the mafia are during the first night.",
    win_condition: "You win when no werewolves remain.",
    symbol: "👁",
    calculate_cards: (players,optional_cards=[]) => {return 1},
    optional: true,
    enabled: false,
    team: "V" // Denotes which "team" they are on for calculations. Can be any string
  },
  {
    name: "Little Girl",
    help_text: "Secretly peek as werewolves pick.",
    win_condition: "You win when no werewolves remain.",
    symbol: "👧",
    calculate_cards: (players,optional_cards=[]) => {return 1},
    optional: true,
    enabled: false,
    team: "V" // Denotes which "team" they are on for calculations. Can be any string
  },
  {
    name: "Veteran",
    help_text: "Choose a person to die each night up to three times.",
    win_condition: "You win when no werewolves remain.",
    symbol: "🎖",
    calculate_cards: (players,optional_cards=[]) => {return 1},
    optional: true,
    enabled: false,
    team: "V" // Denotes which "team" they are on for calculations. Can be any string
  },
  {
    name: "Alpha Wolf",
    help_text: "You look innocent to seers.",
    win_condition: "You win when werewolves outnumber villagers.",
    symbol: "!",
    calculate_cards: (players,optional_cards=[]) => {return 1},
    optional: true,
    enabled: false,
    team: "W" // Denotes which "team" they are on for calculations. Can be any string
  },
  {
    name: "Miller",
    help_text: "You look guilty to seers.",
    win_condition: "You win when no werewolves remain.",
    symbol: "M",
    calculate_cards: (players,optional_cards=[]) => {return 1},
    optional: true,
    enabled: false,
    team: "V" // Denotes which "team" they are on for calculations. Can be any string
  },
  {
    name: "Traitor",
    help_text: "Act and take turns as a villager. Do not wake at night.",
    win_condition: "You win when werewolves outnumber villagers.",
    symbol: "T",
    calculate_cards: (players,optional_cards=[]) => {return 1},
    optional: true,
    enabled: false,
    team: "W" // Denotes which "team" they are on for calculations. Can be any string
  },
  {
    name: "Thief",
    help_text: "On the first night, swap cards.",
    win_condition: "You win when no werewolves remain.",
    symbol: "⇆",
    calculate_cards: (players,optional_cards=[]) => {return 1},
    optional: true,
    enabled: false,
    team: "V" // Denotes which "team" they are on for calculations. Can be any string
  },
  {
    name: "Mason",
    help_text: "Secretly know the identity of another Mason",
    win_condition: "You win when no werewolves remain.",
    symbol: "△",
    calculate_cards: (players,optional_cards=[]) => {return 2},
    optional: true,
    enabled: false,
    team: "V" // Denotes which "team" they are on for calculations. Can be any string
  },
]


// Game Information
// Important information about the game itself is stored here.
// This initialises the settings database from which the app will look at from now on.

exports.game_info = {
  name: "Werewolf",
  min_players: 5,
  max_players: 75,
  optional_traits: [  // Adapted from Inhuman Conditions
    "Trusting: You may not attack the person two to your left",
    "Trusting: You may not attack the person to your left",
    "Trusting: You may not attack the person to your right",
    "Instigator: You may not defend the person two to your left",
    "Instigator: You may not defend the person to your left",
    "Instigator: You may not defend the person to your right",
    "Restless: You must shift about uneasily as the werewolves come out at night",
    "Village Idiot: You must always vote to eliminate a nominated player",
    "Neutral: You may not express opinions, only observable facts",
    "Royal: You may only speak about youself in the third person",
    "Superior: You see yourself as superior to all others.",
    "Pessimist: You may not describe anything getting better than it is at this moment",
    "Optimist: You may not describe anything getting worse than it is at this moment",
    "Recluse: You must refuse to describe what you did in the past",
    "Extrovert: Treat all votes as a popularity competition",
    "Maternal: Mother everybody. Even the werewolves.",
    "Maternal: Defend anyone younger than you."
  ]
}