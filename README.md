rc4pt-node
==========

Node middleware that reads the serial port and parse the commands sended by the IR remote controller.

Work together with [rc4pt-arduino](https://github.com/comsolid/rc4pt-arduino).

## Installation

Make sure your user is in these groups:

* dialout
* tty

To add your user to these groups:

~~~
sudo adduser $(echo $USER) dialout
sudo adduser $(echo $USER) tty
~~~

**Hint**: if you install the Arduino IDE using `apt-get` your user will already be added to the groups above.

`sudo apt-get install arduino`

Clone or download this project.

Extract the project on your directory of node projects, say it's `~/NodeProjects` then,

~~~
cd ~/NodeProjects/rc4pt-node
npm i
npm run start
~~~

**Obs.:** If you want to edit the code and see a live reload use `npm run monitor`.

It uses `nodemon` to do this, so install `nodemon` globally: `npm i -g nodemon`.

## Configuration

Before you start using you need to check the configuration file, located at `popcorn/config.js`. It comes with the default values that comes with PopcornTime.

The `rc4pt-node` tries to guess the `port` automatically,

* if found just one, it just connect;
* if more than one is found, show a list for you to choose.

## PopcornTime

You can download Popcorntime at the [Official Page](https://popcorntime.io/).

## Demo

Check it out the demo in this [Video](https://www.youtube.com/watch?v=XdGIXM8NkCI).

## Presentation

Check it out this [presentation](http://comsolid.github.io/arduino-javascript-slides/) (in Brazilian Portuguese)
