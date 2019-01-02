<template>
    <div class="receipt" style="width: 56mm;height:auto">
      <div class="underside">
        <h2 class="is-size-2 has-text-weight-bold">Werewolf</h2>
        <p>A Game of social Deduction and subterfuge for {{players}} players</p>
        <img src="../assets/qrl.png" style="height: 2.5cm">
      </div>
      <div class="centerline">
        <hr><span class="hr-text">F O L D - H E R E</span>
      </div>
      <div class="overside">
        <h3 class="has-text-weight-bold">You are a {{card.name}}</h3>
        <p class="symbol">{{card.symbol}}</p>
        <p>{{card.help_text}} {{card.win_condition}}</p>
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
    height: calc((13cm - 3rem + 2px) / 2);
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
  export default {
    props: ['player', 'players'],
    computed: {
      card: function(){
        return this.$root.card_info[ this.player ]
      }
    }
  }
</script>
