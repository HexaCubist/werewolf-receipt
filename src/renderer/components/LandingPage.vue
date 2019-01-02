<template>
  <div id="wrapper">
    <div class="intro">
      <h1 class="page-title is-size-1 has-text-weight-bold"><span class="edit" title="Click to edit...">{{game_info.name}}</span> Receipt Printer</h1>
      <p>Welcome to the {{game_info.name}} receipt printer! Choose how many people you have playing then customize to your liking. Additional player types sourced from <a target="_blank" href="https://en.wikipedia.org/wiki/Mafia_(party_game)" class="ext">Wikipedia</a> and random traits sourced from the print &amp; play version of <a target="_blank" href="https://robots.management/" class="ext">Inhuman Conditions</a></p>
      <br/>
      You can read the rules for one variation of Werewolf at <a target="_blank" href="https://www.playwerewolf.co/rules/" class="ext">playwerewolf.co</a>. If you have ideas on how to improve this tool then visit the <a target="_blank" href="http://github.com/hexacubist/werewolf-receipt" class="ext">Github page</a> and get in touch! In the future this app may support more games as well as printing on traditional printers.
      <br/>
      <div class="columns">
        <div class="step column">
          <h1 class="is-size-2 has-text-weight-bold">Step 01</h1>
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
                <input class="slider is-fullwidth" step="1" min="5" max="75" value="50" type="range" v-model="players">
                <input type="number" min="5" max="100" class="input" v-model="players">
              </div>
            </div>
          </p>
        </div>
      </div>
      <div class="columns">
        <div class="step column">
          <h1 class="is-size-1 has-text-weight-bold">Step 03</h1>
          <p>
            Start Printing! Click the button below to print the <span v-if="card_current == 0">first</span><span v-else>next</span> card.
            <br/>
            So far, you have printed <strong>{{card_current}}</strong> out of <strong>{{players}}</strong> cards.
          </p>
          <br/>
          <button
            id="print-button"
            class="button is-primary is-medium is-rounded"
            @click="printcard( card_current,players,from_selections=true,print_real=true)"
          >Print a card!</button>
          <div id="all-cards-printed" class="is-invisible">
            <br/>
            <p>
              You have printed all of the cards! <a href="/">Click Here</a> to reload and start again.
            </p>
          </div>
        </div>
      </div>
    </div>
    <main>
<!--         <div class="receiptlist">
          <receipt
          v-for="(item,index) in card_info"
          v-bind:player="index"
          v-bind:players="players"
          @click.native="printcard(index,players)"
          title="Click to print.."
          ></receipt>
        </div> -->
    </main>
  </div>
</template>

<script>
  import { remote } from 'electron'
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


  export default {
    name: 'landing-page',
    // components: { Receipt },
    data () {
      console.log(this.$root)
      return {
        players: 7,
        card_current: 0,
        card_info: this.$root.card_info,
        game_info: this.$root.game_info,
        printers: contents.getPrinters(),
        printer: getDefaultPrinter()
      }
    },
    computed: {
      card_selections: function() {
        // How the number of cards is decided (and why):
        // The overall goal of this project is to make an app that can easily be ported for different games of the same variety (in which people are assigned roles randomly). To make this as adaptable as possible, the logic for the number of cards of each type is stored in the card_info array at /src/cards/CardInfo.js
        // Ultimately the goal is for this to be hot-swappable for different editions (such as Mafia or Avalon) of the game style.
        
        this.$data.card_current = 0
        let num_cards = this.card_info.length
        let num_players = this.players
        let selections_unshuffled = []

        // Loop over each card and find the number of that type
        for (var i = this.card_info.length - 1; i >= 0; i--) {
          let num_of_type = this.card_info[i].calculate_cards(num_players)
          selections_unshuffled = selections_unshuffled.concat(Array(num_of_type).fill(i))
        }
        
        // Virtual shuffle and hand out to players
        return shuffleArray(selections_unshuffled);
      }
    },
    methods: {
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
        var data = this.$data
        var printer = data.printer
        var card_ind_calc = card_ind
        var card_selections = this.card_selections
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
        if (print_real) {
          // Print for real, animate button
          document.querySelector("#print-button").classList.add("is-loading","printing")
        }
        let win = new remote.BrowserWindow({
          width: 800,
          height: 600,
          webPreferences: {webSecurity: false},
          show: false
        })
        win.loadURL(modalPath + `receipt/${card_ind_calc}/${players}`)
        win.on('closed', (e) => {
            console.log(e)
            let button = document.querySelector("#print-button")
            button.classList.remove("is-loading","printing")
        })
        win.webContents.on('did-finish-load', ((data, win) => {
          win.webContents.print({
            silent: true,
            deviceName: printer,
            printBackground: true
          }, ((data, win, printed) => {
            console.log(printed)
            if (printed) {
              data.card_current += 1
              if (data.card_current >= data.players) {
                // We have printed all cards!
                let button = document.querySelector("#print-button")
                button.setAttribute("disabled", "1")
                button.innerHTML = "All Cards Printed!"
                document.querySelector("#all-cards-printed").classList.remove("is-invisible")

              }
            }
            win.close()
          }).bind(this, data, win));
          // close window after print order (or 2 seconds).
          setTimeout(
            ((win) => {
              if(!win.closed) win.destroy()
            }).bind(this,win),
            2000)
        }).bind(this, data, win));
      }
    },

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
    max-width: 900px;
    margin: auto;
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

  .intro .edit {
      transition: 0.3s ease all;
      text-decoration: underline;
      color: #FFEB3B;
      cursor: pointer;
  }

  a {
      color: #FFEB3B;
  }

  a:hover {
      color: #FFF9C4;
  }
</style>
