# Codeground.js

A customizable HTML, CSS, and JS playground that can easily be added to any project.

## Features

* Preset values
* Tabs or Columns
* Hide/disable any language
* Customizalbe
* Pure js, no jquery or CSS
* No dependencies

## Development

Simply download and include the script tag in your project

```
git clone https://github.com/codypearce/codegroundjs.git

```

```
<script src="codegroundjs/script.js"></script>
```
To create a new playground you need to define an element with the id you want to target, then just pass in that id when you create a new codeground

```
var codeground = new Codeground('myid');
```
This will create a new codeground in that div.

### Options
You can customize each instance by passing in an object with options

```
var opts = {
  style: 'tabs',
  topbar: true,
  title: 'codeground1'
}

var codeground = new Codeground('codeground', opts);
```

### Todo

* Distribution files
* Minify
* ES6
* Tests
