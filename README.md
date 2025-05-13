# Capture Node SDK

Node Library for [capture.page](https://capture.page)

Get your API Key and Secret from https://capture.page/console

## Installation

```
npm install capture-node
```

## Usage

List of all capture options: https://docs.capture.page

### Image

```javascript
import { Capture } from 'capture-node';
const capture = new Capture(YOUR_API_KEY, YOUR_API_SECRET);

// var url = capture.buildImageUrl(URL_TO_CAPTURE, CAPTURE_OPTIONS);

const url = capture.buildImageUrl('https://capture.page/', {
    full: true,
    delay: 3,
    t: Date.now()
});

// or

const image = await capture.fetchImage('https://capture.page/', {
    full: true,
    delay: 3,
    t: Date.now()
});
```
Now stick that url in an img tag to render the screenshot!

### PDF

```javascript
import { Capture } from 'capture-node';
const capture = new Capture(YOUR_API_KEY, YOUR_API_SECRET);

// var url = capture.buildPdfUrl(URL_TO_CAPTURE, CAPTURE_OPTIONS);

const url = capture.buildPdfUrl('https://capture.page/', {
    full: true,
    delay: 3,
    t: Date.now()
});

// or

const pdf = capture.fetchPdf('https://capture.page/', {
    full: true,
    delay: 3,
    t: Date.now()
});
```

### Content

```javascript
import { Capture } from 'capture-node';
const capture = new Capture(YOUR_API_KEY, YOUR_API_SECRET);

// var url = capture.buildContentUrl(URL_TO_CAPTURE, CAPTURE_OPTIONS);

const url = capture.buildContentUrl('https://capture.page/');
 
// or

const content = await capture.fetchContent('https://capture.page/');
```

### Metadata

```javascript
import { Capture } from 'capture-node';
const capture = new Capture(YOUR_API_KEY, YOUR_API_SECRET);

// var url = capture.buildMetadataUrl(URL_TO_CAPTURE, CAPTURE_OPTIONS);

const url = capture.buildMetadataUrl('https://capture.page/');
 
// or

const content = await capture.fetchMetadata('https://capture.page/');
```