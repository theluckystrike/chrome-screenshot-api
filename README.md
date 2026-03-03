# chrome-screenshot-api

Capture screenshots in Chrome extensions with advanced options.

## Overview

chrome-screenshot-api provides utilities to capture visible area, full page, or selected regions as PNG/JPEG images.

## Installation

```bash
npm install chrome-screenshot-api
```

## Usage

### Capture Visible Area

```javascript
import { screenshot } from 'chrome-screenshot-api';

const image = await screenshot.capture(tabId);
```

### Full Page Screenshot

```javascript
const fullPage = await screenshot.captureFull(tabId);
```

## API

### Methods

- `capture(tabId)` - Capture visible area
- `captureFull(tabId)` - Capture full page
- `captureRegion(tabId, rect)` - Capture region

## Browser Support

- Chrome 90+

## License

MIT
