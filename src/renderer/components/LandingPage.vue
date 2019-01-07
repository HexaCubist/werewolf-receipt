<template>
  <div id="wrapper">
    <div class="intro">
      <h1 class="page-title is-size-1 has-text-weight-bold">
        <popover name="example">
          <div slot="face" class="edit" title="Click to switch games...">{{game_info.name}}</div>
            <div slot="content">
                <ul>
                    <li v-for="(game, index) in games"><a @click="set_game_ind(index)">
                      {{game.game_info.name}}
                    </a></li>
                </ul>
            </div>
        </popover>
      Receipt Printer</h1>
      <p>Welcome to the {{game_info.name}} receipt printer! Choose how many people you have playing then customize to your liking. Additional player types sourced from <a target="_blank" href="https://en.wikipedia.org/wiki/Mafia_(party_game)" class="ext">Wikipedia</a> and random traits sourced from the print &amp; play version of <a target="_blank" href="https://robots.management/" class="ext">Inhuman Conditions</a></p>
      <br/>
      You can read the rules for one variation of Werewolf at <a target="_blank" href="https://www.playwerewolf.co/rules/" class="ext">playwerewolf.co</a>. If you have ideas on how to improve this tool then visit the <a target="_blank" href="http://github.com/hexacubist/werewolf-receipt" class="ext">Github page</a> and get in touch! In the future this app may support more games as well as printing on traditional printers.
      <br/>
      <div class="columns">
        <div class="step column">
          <h1 class="is-size-2 has-text-weight-bold" >Step 01</h1>
          <p>
            Choose your receipt printer:
            <div class="select">
              <select v-model="printer">
                <option disabled value="0">Please select one</option>
                <option v-for="(printer,index) in printers" :value="index">{{printer.name}}</option>
              </select>
            </div>
          </p>
        </div>
        <div class="step column">
          <h1 class="is-size-2 has-text-weight-bold">Step 02</h1>
          <p>
            Select how many players to prepare for:
            <div class="field player-select">
              <div class="control is-clearfix">
                <input class="slider is-fullwidth" step="1" :min="game_info.min_players" :max="game_info.max_players" type="range" v-model="game_settings.players">
                <input type="number" :min="game_info.min_players" :max="game_info.max_players" class="input" v-model="game_settings.players">
              </div>
            </div>
          </p>
        </div>
      </div>
      <div class="columns">
        <div class="step column">
          <h1 class="is-size-1 has-text-weight-bold">Step 03</h1>
          <p>
            <span @click="customizeToggle()">Customize the cards</span> or Start Printing! Click the button below to print the <span v-if="card_current == 0">first</span><span v-else>next</span> card.
            <br/>
            So far, you have printed <strong>{{card_current}}</strong> out of <strong>{{game_settings.players}}</strong> cards.
          </p>
          <p id="cardnav">
            <a @click="cardadd(-1)">Previous Card</a> |
            <a @click="cardadd(1)">Next Card</a>
          </p>
          <br/>
          <div class="button-group">
            <button
              id="print-button"
              class="button is-primary is-medium is-rounded"
              @click="printcard( card_current,game_settings.players,from_selections=true,print_real=!print.print_test)"
            >Print a card!</button>
            <button class="button customize-button is-medium is-rounded" @click="customizeToggle()">Customize</button>
          </div>
          <div id="all-cards-printed" class="is-invisible">
            <br/>
            <p>
              You have printed all of the cards! <a href="/">Click Here</a> to reload and start again.
            </p>
            <br/>
          </div>
        </div>
      </div>
    </div>
    <main class="hidden" id="customize">
        <div class="options container">
          <div class="columns">
            <div class="column border-right" id="optionals">
              <h3 class="is-size-3">Enabled Cards</h3>
              <p>Note: Be careful not to select more cards than people!</p>
              <label class="checkbox"
              v-for="(item,index) in card_info"
              >
                <input type="checkbox"
                :disabled="!item.optional"
                v-model="item.enabled">
                {{item.name}} ({{cards_in_play(index)}})
              </label>
              <h3 class="is-size-3">Print Settings</h3>
              <label class="checkbox">
                <input type="checkbox" v-model="print.print_all">
                Print all at once (prints on default paper)
              </label>
              <label class="checkbox">
                <input type="checkbox" v-model="print.fold">
                Create foldable cards
              </label>
              <label class="checkbox">
                <input type="checkbox" v-model="print.print_test">
                Test Mode (don't actually print!)
              </label>
              <label class="checkbox">
                <input type="checkbox" v-model="print.dialog">
                Show Print Dialog
              </label>
              <br/>
              <div class="field">
                <label class="label">Card reverse image (<a target="_blank" href="https://www.google.co.nz/search?q=base64+image+encode" class="ext">Base64</a>)</label>
                <div class="control">
                  <input class="input" v-model="print.reverse_image">
                </div>
              </div>
              <div class="field player-select">
                <label class="label">Chance for random "trait"</label>
                <div class="control is-clearfix">
                  <input class="slider is-fullwidth" step="1" min="0" max="100" type="range" v-model="game_settings.chance_trait">
                  <input type="number" min="0" max="100" class="input" v-model="game_settings.chance_trait">
                </div>
              </div>
            </div>
            <div class="column">
              <h3 class="is-size-3">Edit Cards</h3>
              <div class="card-select">
                <div v-for="(item,index) in card_info">
                  <input type="radio" :value="index" :id="'card-select-' + index" v-model="card_select_edit">
                  <label :for="'card-select-' + index" class="card-item">
                    <span>{{item.symbol}}</span>
                    {{item.name}}
                  </label>
                </div>
              </div>
              
            </div>
            <div class="column">
              <div class="field">
                <label class="label">Card Name</label>
                <div class="control">
                  <input class="input" v-model="card_info[card_select_edit].name">
                </div>
              </div>
              <div class="field">
                <label class="label">Help Text</label>
                <div class="control">
                  <input class="input" v-model="card_info[card_select_edit].help_text">
                </div>
              </div>
              <div class="field">
                <label class="label">Win Condition</label>
                <div class="control">
                  <input class="input" v-model="card_info[card_select_edit].win_condition">
                </div>
              </div>
              <div class="columns">
                <div class="field column">
                  <label class="label">Symbol</label>
                  <div class="control">
                    <input class="input" pattern="\w" v-model="card_info[card_select_edit].symbol">
                  </div>
                </div>
                <div class="field column">
                  <label class="label">Team</label>
                  <div class="control">
                    <input class="input" pattern="\w" v-model="card_info[card_select_edit].team">
                  </div>
                </div>
              </div>
              <div class="field">
                <label class="enabled">Optional</label>
                <input type="checkbox" pattern="\w" v-model="card_info[card_select_edit].optional">
              </div>
            </div>
          </div>
        </div>
        <div class="receiptlist">
          <receipt
          v-for="(item,index) in card_info"
          :key="`receipt-card-${index}`"
          v-if="item.enabled==true"
          v-bind:prop_game_settings="game_settings"
          v-bind:prop_card="getcard(card_info,index)"
          v-bind:prop_print="print"
          v-bind:prop_game_info="game_info"
          @click.native="printcard(index,game_settings.players,print_real=false)"
          title="Click to print.."
          ></receipt>
        </div>
    </main>
  </div>
</template>

<script>
  import popover from 'vue-popover'
  import { remote } from 'electron'
  const settings = require('electron-settings');
  const modalPath = process.env.NODE_ENV === 'development'
    ? 'http://localhost:9080/#/'
    : `file://${__dirname}/index.html#`
  var contents = remote.getCurrentWindow().webContents

  function getDefaultPrinter() {
    var printers = contents.getPrinters()
    console.log(printers)
    for (var i = printers.length - 1; i >= 0; i--) {
      if (printers[i].isDefault) {
        return i; // Return index of default printer
      }
    }
    return 0; // Return first printer on list otherwise
  }

  // JS ES6 Implementation of Durstenfeld shuffle
  // https://stackoverflow.com/a/12646864
  function shuffleArray(array) {
      for (let i = array.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [array[i], array[j]] = [array[j], array[i]];
      }
      return array
  }

  // Print status monitoring
  // 0 = ready
  // 1 = printing
  var print_status = 0

  // Toast
  function printError(data, toasted) {
    toasted.show('Print Seems to have failed', {
      theme: 'outline',
      position: 'bottom-right',
      action: [
      {
        text: 'Next Card',
        onClick: (e, toastObject) => {
          toastObject.goAway(0)
          data.card_current ++;
        }
      },
      {
        text: 'Retry',
        onClick: (e, toastObject) => {
          toastObject.goAway(0)
        }
      }
      ]
    })
  }


  export default {
    name: 'landing-page',
    // components: { Receipt },
    data () {
      console.log(this.$root)
      return {
        card_current: 0,
        games: this.$root.games,
        print: {
          print_all: false,
          fold: true,
          print_test: false,
          dialog: false,
          reverse_image: "data:image/png;base64,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"
        },
        game_settings: {
          game_ind: settings.get('game_ind'),
          players: 7,
          chance_trait: 10
        },
        printers: contents.getPrinters(),
        printer: getDefaultPrinter(),
        card_select_edit: 0,
      }
    },
    methods: {
      cards_in_play(ind) {
        let count = 0
        for (var i = this.card_selections.length - 1; i >= 0; i--) {
          if (this.card_selections[i] == ind) count++
        }
        return count
      },
      set_game_ind(ind) {
        console.log(ind)
        this.game_settings.game_ind = parseInt(ind)
        settings.set('game_ind', parseInt(ind))
        console.log(settings.get('game_ind'))
      },
      cardadd (add) {
        let current = this.card_current
        let players = this.game_settings.players
        if (current + add == players) return
        if (current + add == -1) return
        this.card_current += add
        return
      },
      open (link) {
        this.$electron.shell.openExternal(link)
      },
      getcard: function(card_info, card, card_selections=null){
        if (!card_selections) {
          return card_info[ card ]
        }
        return card_info[ card_selections[card] ]
      },
      getcardind: function(card_ind,card_selections) {
        return card_selections[card_ind]
      },
      printcard: function(card_ind,players,from_selections=null,print_real=true) {
        var data = this
        var printer = data.printer
        var card_ind_calc = card_ind
        var card_selections = this.card_selections
        var print_all = this.print.print_all
        console.log("SPOILERS! These are the current card selections:")
        console.log(card_selections)
        if (from_selections) {
          card_ind_calc = card_selections[card_ind]
        }

        console.log("Printing card...")
        // console.log('url: ' + modalPath + `receipt/${card_ind_calc}/${players}`)
        // console.log(card_ind)
        // console.log(players)
        // console.log(from_selections)
        // console.log(print_real)
        document.querySelector("#print-button").classList.add("is-loading","printing")
        let win = new remote.BrowserWindow({
          width: 800,
          height: 800,
          webPreferences: {webSecurity: false},
          frame: false,
          show: !print_real
        })
        let printurl = modalPath + `receipt/`
        win.loadURL(printurl)
        win.on('closed', (e) => {
            console.log(e)
            let button = document.querySelector("#print-button")
            button.classList.remove("is-loading","printing")
        })
        win.webContents.on('did-finish-load', ((data, win) => {
          console.log(card_ind_calc)
          win.webContents.send('receipt-data', {
            card: this.getcard(this.card_info,card_ind_calc),
            game_settings: this.game_settings,
            print: this.print,
            game_info: this.game_info
          });
        }).bind(this, data, win))
        if (print_real) {
          print_status = 1
          win.webContents.on('did-finish-load', ((data, win) => {
            win.webContents.print({
              silent: !data.print.dialog,
              deviceName: data.printers[data.printer].name,
              printBackground: !data.print.dialog
            }, ((data, win, printed) => {
              console.log(printed)
              if (printed) {
                data.card_current += 1
                if (data.card_current >= data.game_settings.players) {
                  // We have printed all cards!
                  let button = document.querySelector("#print-button")
                  button.setAttribute("disabled", "1")
                  button.innerHTML = "All Cards Printed!"
                  document.querySelector("#all-cards-printed").classList.remove("is-invisible")
                }
              } else {
                if(print_status == 1) printError(data, this.$toasted)
              }
              print_status = 0
              win.close()
            }).bind(this, data, win));
          }).bind(this, data, win));
          // close window after print order (or 2 seconds).
          setTimeout(
            ((win) => {
              if(print_status == 1){
                if (!data.print.dialog) {
                  // Only fail if we're not giving the user a dialog
                  printError(data, this.$toasted)
                  console.log(win)
                  win.destroy()
                }
                print_status = 0
              }
            }).bind(this,win,data),
            5000)
        } else {
          data.card_current += 1
          if (data.card_current >= data.game_settings.players) {
            // We have printed all cards!
            let button = document.querySelector("#print-button")
            button.setAttribute("disabled", "1")
            button.innerHTML = "All Cards Printed!"
            document.querySelector("#all-cards-printed").classList.remove("is-invisible")
          }
        }
      },
      customizeToggle: function() {
        console.log("Showing customizer")

        var customize = document.querySelector("#customize")

        customize.classList.toggle("hidden")
      },
      addCard: function(card_ind) {
        this.card_list.push({
          name: "",
          help_text: "",
          win_condition: "",
          symbol: "",
          calculate_cards: () => 0,
          optional: true,
          enabled: true,
          team: "" // Denotes which "team" they are on for calculations. Can be any string
        })
      }
    },
    components: {
      popover
    },
    computed: {
      card_info: function() {
        return this.games[this.game_settings.game_ind].card_info
      },
      game_info: function() {
        return this.games[this.game_settings.game_ind].game_info
      },
      card_selections: function() {
        // How the number of cards is decided (and why):
        // The overall goal of this project is to make an app that can easily be ported for different games of the same variety (in which people are assigned roles randomly). To make this as adaptable as possible, the logic for the number of cards of each type is stored in the card_info array at /src/cards/CardInfo.js
        // Ultimately the goal is for this to be hot-swappable for different editions (such as Mafia or Avalon) of the game style.
        
        this.card_current = 0
        let num_cards = this.card_info.length
        let num_players = this.game_settings.players
        let selections_unshuffled = []
        let optional_cards = []

        // Loop over each card and check if it is an optional card and enabled
        for (var i = this.card_info.length - 1; i >= 0; i--) {
          let card = this.card_info[i]
          if(card.optional && card.enabled) optional_cards.push(card)
        }

        // Loop over each card and find the number of that type
        for (var i = this.card_info.length - 1; i >= 0; i--) {
          let num_of_type = this.card_info[i].calculate_cards(num_players, optional_cards)
          if (num_of_type < 1) {continue}
          selections_unshuffled = selections_unshuffled.concat(Array(num_of_type).fill(i))
        }
        
        // Virtual shuffle and hand out to players
        shuffleArray(selections_unshuffled)
        console.log(selections_unshuffled)
        return selections_unshuffled;
      }
    }
  }

</script>

<style>
  body {
    width: 100vw;
    height: 100vh;
    background: #05060c;
    overflow: auto;
    background-image: url('../assets/dayne-topkin-309496-unsplash.jpg');
    box-shadow: inset 0 0 500px 10px black;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
  }

  body, p, strong {
    color: white;
  }

  .intro {
      text-align: center;
  }

  .intro, .receipt {
      z-index: 1;
      position: relative;
  }

  #wrapper {
      padding: 1em 2em;
  }

  .receiptlist {
    display: flex;
    flex-wrap: wrap;
    max-width: 900px;
    margin: auto;
  }

  .hidden {
    display: none;
  }

  .intro {
    max-width: 700px;
    margin: auto;
  }

  .player-select input[type=range].slider.is-fullwidth {
      width: calc(100% - 60px - 1em);
      display: inline-block;
  }

  .player-select .control {
      width: 100%;
  }

  .player-select input.input {
      width: 60px;
  }


  .button-group {
    font-size: 0;
  }

  .button-group button {
    margin: 0
  }

  .button-group button:first-of-type {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }

  .button-group button:last-of-type {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }
  
  button.customize-button {
    background: rgba(255, 255, 255, 0.5);
    color: white;
    border: 0;
  }

  button.customize-button:hover {
    color: white;
    background: rgba(255, 255, 255, 0.4);
  }

  .options {
    background: white;
    color: black;
    padding: 2em;
    border-radius: 2px;
  }

  .options p {
    color: black
  }

  .options .column.border-right {
    border-right: 1px solid grey;
  }

  #optionals .checkbox {
    display: block;
  }

  .card-select .card-item {
    display: block;
    color: black;
    /* background: rgba(0, 0, 0, 0.05); */
    padding: .5em .75em;
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-top: 0;
    cursor: pointer;
  }

  .card-select {
    border-top: 1px solid rgba(0, 0, 0, 0.1);
  }

  .card-item span {
    font-family: monospace;
    font-weight: bold;
    border-right: 1px solid;
    padding-right: 6px;
    border-color: rgba(0, 0, 0, 0.1);
  }

  .card-select input {
    display: none;
  }

  input:checked ~ label {
    font-weight: bold;
    background: rgba(0, 0, 0, 0.04);
  }

  #cardnav {
    user-select: none
  }

  .intro .edit {
    text-decoration: underline;
    cursor: pointer;
    user-select: none;
  }

  .intro .popover {
    position: relative;
    display: inline-table;
  }

  .intro #popover-example {
    position: absolute;
    background: white;
    font-size: 25px;
    width: 100%;
    padding: 15px 5px;
    border-radius: 3px;
  }
</style>
