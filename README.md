# LVM LAS ROCA

Run with:

```
vagrant up
vagrant ssh
cd /vagrant
bundle exec unicorn
```

Now you can visit http://lvm-las-roca.vagrant.dev:8080 to see the application.

## JavaScript

You need to have Node.js (5.X.X) installed. Run `npm install` to install all dependencies.
Then you have the following tasks available:

* `npm run test`: Lint the JavaScript files
* `npm run compile`: Compile the JavaScript and CSS files
* `npm run assets`: Copy the assets (images and fonts) to this project
* `npm run webpack`: Compile the JavaScript files
* `npm run webpack-watch`: Watch the JavaScript files and compile on every change
* `npm run less`: Compile the CSS files
