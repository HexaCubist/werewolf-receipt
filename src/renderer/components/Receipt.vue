<template>
    <div class="receipt" style="width: 56mm;height:auto">
      <div v-if="print.fold">
      <div class="underside">
        <h2 class="is-size-2 has-text-weight-bold">{{game_info.name}}</h2>
        <p>A Game of social Deduction and subterfuge for {{game_settings.players}} players</p>
        <img :src="print.reverse_image" style="height: 2.5cm">
      </div>
      <div class="centerline">
        <hr><span class="hr-text">F O L D - H E R E</span>
      </div>
      </div>
      <div class="overside">
        <h3 class="has-text-weight-bold">You are {{card.name | indefinite}}</h3>
        <p class="symbol">{{card.symbol}}</p>
        <p>{{card.help_text}} {{card.win_condition}}</p>
        <div class="trait" v-if="trait">
          <br/>
          <p>{{trait}}</p>
        </div>
      </div>
    </div>
</template>

<style scoped>
	.receipt {
	    margin: auto;
	    margin-top: 2em;
	    background: white;
	    text-align: center;
	    font-size: 4mm;
	    border-radius: 2px;
      overflow: hidden;
      cursor: pointer;
	}

  .receipt, p, strong {
    color: black;
  }

	.receipt * {
	    font-family: consolas, monospace;
	}

  .symbol {
    font-family: 'Fredericka the Great';
    font-size: 2cm
  }

  .receipt hr {
      background: black;
      position: absolute;
      width: 100%;
  }

  .receipt .hr-text {
    position: relative;
    top: calc(1em - 2px);
    background-color: white;
    padding: 0 7px;
  }

  .underside, .overside {
    height: calc((18cm - 3rem + 2px) / 2);
  }

  .underside {
    transform: rotate(180deg);
  }

/*  .receipt:hover .underside {
    transform: rotate(0deg);
  }
*/
  .overside {
    margin-bottom: 1.1cm;
  }

  .centerline {
      height: calc(3rem + 2px);
      position: relative;
  }
</style>

<style>
  @media print {
    * {
      -webkit-transition: none !important;
      transition: none !important;
    }
    body {
        background: white !important;
        background-image: none !important;
        height: 100%;
        overflow: hidden;
        width: 58mm;
        box-shadow: none !important;
    }

    div#title-bar {
        display: none !important;
    }

    .receipt {
        width: 100% !important;
        margin: 0 !important;
        border-bottom: 1px black solid;
    }

    @page {
      margin-left: 5mm;
      margin-right: 5mm;
      margin-top: 5mm;
      margin-bottom: 5mm;
    }

    html, body, #app,.receipt {
      margin: 0;
      padding: 0;
    }
  }
</style>
<script>
  // var ipcRenderer = require('electron').ipcRenderer
  // ipcRenderer.on('receipt-data', function (event,data) {
  //     console.log(data)
  //     data_load = data
  // });

  var a = require('indefinite');

  export default {
    props: {
      'prop_game_settings': {
        type: Number,
        default: 0,
        required: false
      },
      'prop_card': {
        type: Object,
        default: function() {
          return {
            name: "Invalid Card",
            help_text: "There has been an error and the card was not sent correctly.",
            win_condition: "You cannot win.",
            symbol: "X",
            calculate_cards: () => 0,
            optional: true,
            enabled: true,
            team: "X" // Denotes which "team" they are on for calculations. Can be any string
          }
        },
        required: false
      },
      'prop_print': {
        type: Object,
        default: function() {
          return {
            print_all: false,
            fold: true,
            print_test: false,
            dialog: false,
            reverse_image: "",
          }
        },
        required: false
      },
      'prop_game_info': {
        type: Object,
        default: function() {
          return {
          }
        },
        required: false
      }
    },
    data () {
      return {
        data_game_settings: null,
        data_card: null,
        data_print: null,
        data_game_info: null
      }
    },
    computed: { // Default to properties but use data if given
      game_settings () {
        return this.data_game_settings ? this.data_game_settings : this.prop_game_settings
      },
      card () {
        return this.data_card ? this.data_card : this.prop_card
      },
      print () {
        return this.data_print ? this.data_print : this.prop_print
      },
      game_info () {
        return this.data_game_info ? this.data_game_info : this.prop_game_info
      },
      trait () {
        let traits = this.game_info.optional_traits
        if(Math.random() < this.game_settings.chance_trait/100) {
          return traits[Math.floor(Math.random()*traits.length)];
        } else {
          return ""
        }
      }
    },
    filters: {
      indefinite: function(value) {
        return a(value)
      }
    },
    mounted () {
      this.$electron.ipcRenderer.on('receipt-data', function (event,data) {
        console.log(data)
        console.log(this)
        this.data_game_settings = data.game_settings
        this.data_card = data.card
        this.data_print = data.print
        this.data_game_info = data.game_info
      }.bind(this));
    }
  }
</script>
