# werewolf-receipt

Werewolf Receipt is a tool for Windows (more platforms coming soon) which allows anyone with a receipt printer to automatically randomly generate, assign, and print the cards to the popular party game Werewolf. A number of optional cards and rules are included.


[![Demo of Werewolf Receipt](docs/demo.gif)](https://streamable.com/wmi8c)

## Setup

If you use Windows, head over to the [Releases Page](https://github.com/HexaCubist/werewolf-receipt/releases) and grab the latest installer or zip file.

If you use another platform, feel free to contribute whatever is needed to get it running on that. Most of the time, following the build steps below is a good place to start.

## Why?

The initial reason this tool was created is that it helped me justify owning a reciept printer.

Beyond that, I wanted an easy way to generate the cards for Werewolf in situations where I don't trust people to give back cards or where I can't borrow a copy of the game.

As well as this, the fact that the cards are printed on the spot means that we can add things to the game that otherwise wouldn't be possible. Right now that includes a list of traits that may appear on your card, which helps spice up the game. Any trait can go with any card, and the chance of one appearing can be configured.

All up, a _cheap_ reciept printer from your friendly local international internet shopping website costs around $15-20 NZD including shipping (or $10-15 USD). A decent roll of thermal paper costs a dollar or two. A standard copy of Werewolf costs around $30 imported in NZ ($40 locally) or $12USD in the USA. Thus, on price alone it is usually cheaper to buy a reciept printer and download this app than buy a traditional copy of Werewolf.

Finally, having the app (and therefore game) open sourced means anyone can come in and tweak card ratios, traits, and add & edit cards. These tweaks can then be sent out to anyone using the app and in doing so allow for an "over the air" update of a physical card game without the need to actually buy anything.

### But you could just use a pack of cards...

Sure, but you could also use rocks if you were really determined. Having a nice card with your draw on it as well as a quick rundown of what you can do is a big help for new players and is still just cool looking for veterans. There's also something inherently neat and satisfying about pulling your card out of a reciept printer.

## Features

 - A collection of the most common Werewolf cards
 - Multiple game support (only one included right now! Consider adding more in [/static/games](https://github.com/HexaCubist/werewolf-receipt/tree/master/static/games))
 - Works with any receipt printer that has a standard print function
 - Technically works with other printers too! Right now it will print one card to a page.
 - Instant preview and customisation of any card
 - Automatically generates a reasonable distribution of cards (see [00_Werewolf.js](https://github.com/HexaCubist/werewolf-receipt/blob/master/static/games/00_Werewolf.js) for info on how this is done)


#### Build Setup

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
