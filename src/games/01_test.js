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
  
  if (players < 13) {
    return 2
  }
  if (players < 18) {
    return 3
  }
  if (players < 22) {
    return 4
  }

  // Beyond here is not indicated by the poll, and so we will make 1/6th of players
  // (rounded up) wolves which roughly follows the trend.
  // 
  // Realistically, at this point you might typically consider breaking the game off
  // into villages.
  
  return Math.ceil(players/6)
  
}

function villagercalc(players,optional_cards=[]) {
  // This function manages how many of this type of card is in the game at a time.
  // It accepts the number of players (total) as an integer, and outputs the number
  // of cards that will be of this type.
  // 
  // it also takes in the "optional" cards - this is used in the calculation where
  // optional cards replace this one.
  
  // Count optional cards on our team
  let optional_cards_onteam = 0
  for (var i = optional_cards.length - 1; i >= 0; i--) {
    if (optional_cards[i].team == "V") {
      console.log("Using optional card:")
      optional_cards[i]
      optional_cards_onteam++
    }
  }
  
  // Number of villagers = players - werewolves - optional_cards_onteam
  return players - werewolfcalc(players,optional_cards) - optional_cards_onteam
}

exports.card_info = [
  {
    name: "Mafioso",
    help_text: "Wake up each night and choose a person to attack.",
    win_condition: "You win when werewolves outnumber villagers.",
    symbol: "W",
    calculate_cards: werewolfcalc,
    optional: false,
    enabled: true,
    team: "W" // Denotes which "team" they are on for calculations. Can be any string
  },
  {
    name: "Innocent",
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
    symbol: "+",
    calculate_cards: (players,optional_cards=[]) => {return 1},
    optional: true,
    enabled: true,
    team: "V" // Denotes which "team" they are on for calculations. Can be any string
  },
  {
    name: "Detective",
    help_text: "Attempt to detect a werewolf each night.",
    win_condition: "You win when no werewolves remain.",
    symbol: "?",
    calculate_cards: (players,optional_cards=[]) => {return 1},
    optional: true,
    enabled: true,
    team: "V" // Denotes which "team" they are on for calculations. Can be any string
  }
]


// Game Information
// Important information about the game itself is stored here.
// This initialises the settings database from which the app will look at from now on.

exports.game_info = {
  name: "Test Game",
  min_players: 0,
  max_players: 100,
}