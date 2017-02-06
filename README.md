# Codeground.js

[![Build Status](https://travis-ci.org/codypearce/codegroundjs.svg?branch=master)](https://travis-ci.org/codypearce/codegroundjs) [![npm version](https://badge.fury.io/js/codegroundjs.svg)](https://badge.fury.io/js/codegroundjs) 

An HTML, CSS, and JS playground plugin for self-hosted demos or playgrounds. Similar to a self-hosted embedded Codepen or JSFiddle. Layout options for fullscreen mode, tabs, or rows. Toggle splitscreen view and full view to show off just results or a particular code snippet.

<img src="https://github.com/codypearce/codegroundjs/blob/master/assets/codeground.png" height="350">

## Install

#### [NPM](https://www.npmjs.com/package/codegroundjs)
```
npm install --save codegroundjs
```

Include the script on your page or include it in your build process
```
<script src="/node_modules/codegroundjs/dist/script.min.js"></script>
```

## Features

* Tabs view (show one language at a time) or Rows view (show all languages in rows ontop of each other)
* Fullscreen mode
* Preset values for demos
* Disable a language
* Pure js, no jquery or CSS
* No dependencies

## Use

To create a new playground you need to define an element with the id you want to target, then create a new codeground instance passing the options you want, then init a codeground at that div
```
var codeground = new Codeground(opts);
codeground.initCodeground('codeground');
```
This will create a new codeground in that div with your preset options.

## Options
You can customize each instance by passing in an object with options

```
var opts = {
    html: true, // setting these to false hides that languages editor
    css: true, // if set false on tabs it hides the button
    js: true,

    height: 500, // must be number
    width: 100%, // must be percent

    layout: 'half', // whether editor/output takes up full width or half
    initialFull: 'editors', // this sets the initial view if you choose layout full

    style: 'rows', // Toggle between rows and tabs view
    initialTab: 'html', // if tabs are selected this selects the initial shown tab
    
    fullscreen: false, // html, body, and container must be 100% also

    topbar: true, // this sets a top bar, required for the tabs view
    title: 'Codeground' // optional title for the tab
}

var codeground = new Codeground(opts);
codeground.initCodeground('codeground');
```
Tabs:

<img src="https://github.com/codypearce/codegroundjs/blob/master/assets/codeground.png" height="150">

Rows:

<img src="https://github.com/codypearce/codegroundjs/blob/master/assets/codeground-rows.png" height="150">

## Use Cases
Why not just use Codepen or JSFiddle? These are great services that are easy to use and offer many of useful features. However, there are a few advantages a hosted solution like this one has over a cloud solution:

* Reduce HTTP requests
* Track the playground in your codebase
* More customizable
* Don't have to clutter codepen account with simple demos
* Not dependent on external service's uptime
* Build on it to make something different

On the other hand, cloud solutions have a plethora of other advantages also, such as ease of use, options to fork, and many others. If you're in doubt then use Codepen/JSFiddle.

### Browser Support
Should work on all the latest browsers. Older versions will probably have issues.

### Todo

* ES6
* Tests
