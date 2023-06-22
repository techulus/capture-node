# Capture Node SDK
Node Library for Capture by Techulus

[![Build Status](https://travis-ci.org/techulus/capture-node.svg?branch=master)](https://travis-ci.org/techulus/capture-node)

Get your API Key and Secret from https://capture.techulus.in/console

## Installation

```
npm install capture-node
```

## Usage

List of all capture options: https://docs.capture.techulus.in

### Image

```javascript
var Capture = require('capture-node');
var capture = Capture(YOUR_API_KEY, YOUR_API_SECRET);

// var url = capture.buildImageUrl(URL_TO_CAPTURE, CAPTURE_OPTIONS);

var url = capture.buildImageUrl('https://capture.techulus.in/', {
    full: true,
    delay: 3,
    t: Date.now()
});
```
Now stick that url in an img tag to render the screenshot!

### PDF

```javascript
var Capture = require('capture-node');
var capture = Capture(YOUR_API_KEY, YOUR_API_SECRET);

// var url = capture.buildPdfUrl(URL_TO_CAPTURE, CAPTURE_OPTIONS);

var url = capture.buildPdfUrl('https://capture.techulus.in/', {
    full: true,
    delay: 3,
    t: Date.now()
});
```

### Content

```javascript
var Capture = require('capture-node');
var capture = Capture(YOUR_API_KEY, YOUR_API_SECRET);

// var url = capture.buildContentUrl(URL_TO_CAPTURE, CAPTURE_OPTIONS);

var url = capture.buildContentUrl('https://capture.techulus.in/', {
    full: true,
    delay: 3,
    t: Date.now()
});
```
