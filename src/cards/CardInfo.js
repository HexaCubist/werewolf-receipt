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
  
  // Number of villagers = players - werewolves
  return players - werewolfcalc(players,optional_cards)
}

exports.card_info = [
  {
    name: "Werewolf",
    help_text: "Wake up each night and choose a person to attack.",
    win_condition: "You win when werewolves outnumber villagers.",
    symbol: "W",
    calculate_cards: werewolfcalc,
    optional: false
  },
  {
    name: "Villager",
    help_text: "Find and vote out all werewolves.",
    win_condition: "You win when no werewolves remain.",
    symbol: "V",
    calculate_cards: villagercalc,
    optional: false
  }
]
