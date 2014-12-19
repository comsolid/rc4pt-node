rc4pt-node
==========

Node middleware that reads the serial port and parse the commands sended by the IR remote controller.

Work together with [rc4pt-node](https://github.com/comsolid/rc4pt-node).

## Installation

Make sure your user is in these groups:

* dialout
* tty

To add your user to these groups just do as `root`:

~~~
$ sudo su
# adduser username dialout
# adduser username tty
~~~

Change `username` with your actual username.

**Hint**: if you install the Arduino IDE using `apt-get` your user will already be added to the groups above.

`$ sudo apt-get install arduino`

Clone or download this project.

Extract the project on your directory of node projects, say it's `~/NodeProjects` then,

~~~
$ cd ~/NodeProjects/rc4pt-node
$ npm install
$ node index.js
~~~

## Configuration

Before you start using you need to check the configuration file, located at `popcorn/config.js`. It comes with the default values that comes with PopcornTime.

Another option to check is the path to the usb port. This configuration is in the `index.js` file. You can check the page [Arduino Development Environment](http://www.arduino.cc/en/Guide/Environment) on the **Upload** section.

## PopcornTime

You can download Popcorntime at the [Official Page](https://popcorntime.io/).

## Dependencies

This project uses the following libraries:

* [btoa](https://www.npmjs.com/package/btoa)
* [request](https://www.npmjs.com/package/request)
* [serialport](https://www.npmjs.com/package/serialport)

All dependencies will be installed with the `npm install` command, don't worry.

## Demo

Check the demo in this [Video](https://www.youtube.com/watch?v=XdGIXM8NkCI).
