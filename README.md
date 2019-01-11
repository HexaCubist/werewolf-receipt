# werewolf-receipt
[![Build Status](https://travis-ci.com/HexaCubist/werewolf-receipt.svg?branch=master)](https://travis-ci.com/HexaCubist/werewolf-receipt)

This is a project I’ve been working on for the past week or so, and while I made it mostly for myself I’m excited to share it with you in case it helps someone else too.

I often end up helping out at or running a number of after school activities and events. One thing that’s always a winner is playing board and card games. The issue doing this is that it can be hard to keep track of the cards after a day, and kids often have trouble learning the rules. I made this tool to help with that.

The goal of werewolf receipt is to make it super quick and easy to print a card game on the spot – in a way which means that lost cards can be replaced, and worn cards can be reprinted. It also acts as a way for people to potentially try out new games before they buy them, and share variations or alterations on the original ruleset (such as new cards).

There are links to download below for Windows. Mac and Linux builds have also been made but not tested. If you’d like to try it for yourself but don’t have a receipt printer, consider picking one up as they are not expensive ($10-15) and use no ink. You could also probably use a traditional printer if you wished with a small paper size.

If you have ideas or issues with the project, feel free to get in touch. If you have any sort of technical background you can also contribute more games or features here. New games are automatically loaded from /static/games (the JS files within are numbered and documented).

[![Demo of Werewolf Receipt](docs/demo.gif)](https://streamable.com/wmi8c)

## Setup

If you use Windows, head over to the [Releases Page](https://github.com/HexaCubist/werewolf-receipt/releases) and grab the latest installer. If you use Mac or Linux, you can try the files there as well (although they will be unsigned and are untested). At this point, Mac and Linux support is in alpha and is largely untested. Please get in touch with your experiences or issues.

If you need a receipt printer, you can find cheap off-brand ones for _much_ less than most board games. Most ones available at the moment will use USB and once installed act as a standard printer.

## Why?

The initial reason this tool was created is that it helped me justify owning a receipt printer.

Beyond that, I wanted an easy way to generate the cards for Werewolf and other games in situations where I don't trust people to give back cards or where I can't borrow a copy of the game.

As well as this, the fact that the cards are printed on the spot means that we can add things to the game that otherwise wouldn't be possible. Right now that includes a list of traits that may appear on your card, which helps spice up the game. Any trait can go with any card, and the chance of one appearing can be configured.

All up, a _cheap_ receipt printer from your friendly local international internet shopping website costs around $15-20 NZD including shipping (or $10-15 USD). A decent roll of thermal paper costs a dollar or two. A standard copy of Werewolf costs around $30 imported in NZ ($40 locally) or $12USD in the USA. Thus, on price alone it is usually cheaper to buy a receipt printer and download this app than buy a traditional copy of Werewolf.

Finally, having the app (and therefore game) open sourced means anyone can come in and tweak card ratios, traits, and add & edit cards. These tweaks can then be sent out to anyone using the app and in doing so allow for an "over the air" update of a physical card game without the need to actually buy anything.

### But you could just use a pack of cards...

Sure, but you could also use rocks if you were really determined. Having a nice card with your draw on it as well as a quick rundown of what you can do is a big help for new players and is still just cool looking for veterans. There's also something inherently neat and satisfying about pulling your card out of a receipt printer.

## Features

 - A collection of the most common Werewolf cards
 - Multiple game support (only one included right now! Consider adding more in [/static/games](https://github.com/HexaCubist/werewolf-receipt/tree/master/static/games))
 - Works with any receipt printer that has a standard print function
 - Technically works with other printers too! Right now it will print one card to a page.
 - Instant preview and customisation of any card
 - Automatically generates a reasonable distribution of cards (see [00_Werewolf.js](https://github.com/HexaCubist/werewolf-receipt/blob/master/static/games/00_Werewolf.js) for info on how this is done)

## How to use

First, select the game you would like to create cards for by clicking the name in the title and choosing one from the dropdown.

Next, select your thermal/receipt printer from the printer dropdown in Step 02. It will default to your default printer in Windows.

Finally, choose how many players will be playing in this game. Feel free to choose a large number if you wish to keep the cards, however by default it will attempt to balance the game for that number.

### Advanced Settings

You can also configure some other things that you should check over before printing (but will default to a sensible game):

#### Enabled cards

While by default a limited number of cards are selected from, you can enable expanded rulesets and additional cards in this list. Make sure you know how each card works before using it.  You can see a preview of the enabled cards further down.

#### Print Settings

Here you can select some basic print settings. The most useful option is likely "Show Print Dialog". By default, the app will just go straight to printing. If you have a more advanced printer that needs configuring first, enable this to set those options.

"Create Foldable cards" (enabled by default) allows you to choose to create a version of the card that does not have a reverse. This has the advantage of using less paper, however means that players may see through the thin receipt paper.

You can also enable a test mode to preview what the card wil print as without actually sending it to the printer. This is most useful when developing for the app and is mostly a debugging feature.

"Card Reverse image" allows you to replace the qr code that links back to the source website with your own. The image must be encoded in Base64.

"Chance for random trait" configures how often a player will be given a random additional trait. Set this to zero to completely disable this feature. A low probability will likely keep these suprising and fresh for longer. Set lower for larger games.

#### Edit Cards

This side of the customisation screen allows you to edit the text on any of the cards. Use this if you like play with your own custom rules or if you don't like how the cards look by default.

## Troubleshooting

### Nothing happens when I print! (or it prints weird)

First, make sure your thermal printer is connected and plugged into the power. You should also download and install the correct drivers for it, as this varies by manufactuer. Make sure the printer is plugged into an old USB plug (1.0 or 2.0) as some printers will not work on newer plugs.

### The app just shows a picture!

If this happens to you, get in touch by creating an issue.

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:9080
npm run dev

# build electron application for production
npm run build


# lint all JS/Vue component files in `src/`
npm run lint

```

---

This project was generated with [electron-vue](https://github.com/SimulatedGREG/electron-vue) using [vue-cli](https://github.com/vuejs/vue-cli). Documentation about the original structure can be found [here](https://simulatedgreg.gitbooks.io/electron-vue/content/index.html).
