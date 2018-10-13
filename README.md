<img src=https://raw.githubusercontent.com/andrwmillr/hanabi/master/public/hanabi-logo.jpg width="45%" height="auto"/>

### Play Hanabi in your browser. 
Hanabi is an [award-winning](https://en.wikipedia.org/wiki/Hanabi_(card_game)#Awards) cooperative card game designed by Antoine Bauza. Play at [playhanabi.online](https://www.playhanabi.online).

## Rules
The game's objective is to stack cards of matching color in numerical order, similar to solitaire. Players cannot see their own hands, but they can see the hands of all other players. Players learn about the cards in their hand through hints given by other players.

During their turn, players may play a card, discard a card, or give a hint to another player. To give a hint, a player chooses a color or value and identifies all cards of that color or value in another player's hand.

Players are limited in the number of hints they may give. The game begins with eight "information tokens" - each time a hint is given, a token is used. Players may recover a token by discarding a card.

Cards must be played in consecutive order. If a card is played illegally - for instance, if a player tries to play a three on top of a one - that card is discarded, and the game's fuse counter decreases by one. 

The game's fuse begins at three, and the game ends when it reaches zero.

At the end of the game, the players' score is the number of cards they successfully played.

## Technology
Hanabi's front-end is written in React, its socket layer is written with Socket.IO, and it has a light backend written in Express. Some code (e.g. the app's Webpack and Babel configs) was borrowed from Fullstack Academy's boilerplate repository.

Hanabi's display and game logic were originally coded using [boardgame.io](boardgame.io). Boardgame.io is a functionally-oriented library, and in general my code uses pure functions and immutable game state.
