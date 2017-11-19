# Capture Node SDK
Node Library for Capture by Techulus

[![Build Status](https://travis-ci.org/techulus/capture-node.svg?branch=master)](https://travis-ci.org/techulus/capture-node)

Get your API Key and Secret from https://capture.techulus.in/console

## Installation

```
npm install capture-node
```

## Usage

List of all capture options: https://capture.techulus.in/docs

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

<img src="https://cdn.capture.techulus.in/e1ab7054-dabc-48d6-a33f-c18038aac1c8/e0c64ecf2dcf45954792d3cb574fad41/image?url=https://capture.techulus.in/&delay=3"/>

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
Now open the url to see the PDF!
