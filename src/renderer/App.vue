<template>
  <div id="app">
    <div id="title-bar">
      <div id="title-bar-btns">
  <!-- Alternate window buttons
        <button id="min-btn" class="fas fa-window-restore"></button>
        <button id="max-btn" class="fas fa-window-maximize"></button>
        <button id="close-btn" class="fas fa-window-close"></button>
   -->
        <button id="min-btn">
          <font-awesome-icon icon="minus"></font-awesome-icon>
        </button>
        <button id="max-btn">
          <font-awesome-icon icon="expand"></font-awesome-icon>
        </button>
        <button id="close-btn">
          <font-awesome-icon icon="times"></font-awesome-icon>
        </button>
      </div>
    </div>
    
    <router-view></router-view>
  </div>
</template>

<style>
  /* CSS */
  @import "~bulma/css/bulma.css";
  @import "~bulma-extensions/bulma-slider/dist/css/bulma-slider.min.css";

  html {
    overflow-y: auto;
  }
    #title-bar {
        -webkit-app-region: drag;
        height: 40px;
        text-align: center;
        line-height: 40px;
        vertical-align: middle;
        padding: 0;
        margin: 0px;
        position: static;
    }

    #title {
        position: fixed;
        top: 0px;
        left: 6px;
        color:white;

    }

    #title-bar-btns {
        -webkit-app-region: no-drag;
        position: fixed;
        top: 0px;
        right: 0;
        cursor: default;
    }

    #title-bar-btns button {
        -webkit-appearance: unset;
        border: 0;
        background: transparent !important;
        color: rgba(255, 255, 255, 0.75);
        width: 15px;
        height: 15px;
        line-height: 15px;
        border-radius: 50%;
        text-align: center;
        display: inline-block;
        cursor: pointer;
    }

    #title-bar-btns #min-btn {
        background-color: #FFC107;
    }

    #title-bar-btns #max-btn {
        background-color: #4CAF50;
    }

    #title-bar-btns #close-btn {
        background-color: #F44336;
        margin-right: 13px;
    }

    #title-bar-btns button:before {
        display: inline-block;
        position: relative;
        left: -3px;
        top: -3px;
        font-size: 10px;
    }

    #title-bar-btns button:focus {
        outline: 0;
    }

    #app #wrapper {
        height: calc(100vh - 40px);
        overflow: auto;
        position: relative;
    }

    /* fredericka-the-great-regular - latin */
    @font-face {
      font-family: 'Fredericka the Great';
      font-style: normal;
      font-weight: 400;
      src: local('Fredericka the Great'), local('FrederickatheGreat'),
           url('../../static/fonts/fredericka-the-great-v6-latin-regular.woff2') format('woff2'), /* Chrome 26+, Opera 23+, Firefox 39+ */
           url('../../static/fonts/fredericka-the-great-v6-latin-regular.woff') format('woff'); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
    }
</style>

<script>
  import { library } from '@fortawesome/fontawesome-svg-core'
  import { faMinus, faExpand, faTimes } from '@fortawesome/free-solid-svg-icons'
  import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

  library.add(faMinus, faExpand, faTimes)

  export default {
    name: 'werewolf-receipt',
    components: {
      FontAwesomeIcon
    }
  }

  function eventbinds () {
    // Retrieve remote BrowserWindow
    const {BrowserWindow} = require('electron').remote
    // Minimize task
    document.getElementById('min-btn').addEventListener('click', (e) => {
      var window = BrowserWindow.getFocusedWindow()
      window.minimize()
    })

    // Maximize window
    document.getElementById('max-btn').addEventListener('click', (e) => {
      var window = BrowserWindow.getFocusedWindow()
      if (window.isMaximized()) {
        window.unmaximize()
      } else {
        window.maximize()
      }
    })

    // Close app
    document.getElementById('close-btn').addEventListener('click', (e) => {
      var window = BrowserWindow.getFocusedWindow()
      window.close()
    })

    document.querySelectorAll('a.ext')
      .forEach(input => input.addEventListener('click', (event) => {
        event.preventDefault()
        let link = event.target.href
        require('electron').shell.openExternal(link)
      }))
  }
  
  window.setTimeout(eventbinds, 400)
</script>
