# chrome-screenshot-api

[![npm version](https://img.shields.io/npm/v/chrome-screenshot-api)](https://npmjs.com/package/chrome-screenshot-api)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue.svg)](https://www.typescriptlang.org/)
[![CI Status](https://github.com/theluckystrike/chrome-screenshot-api/actions/workflows/ci.yml/badge.svg)](https://github.com/theluckystrike/chrome-screenshot-api/actions)

A lightweight TypeScript library for capturing screenshots inside Chrome MV3 extensions. Wraps the chrome.tabs.captureVisibleTab API with useful helpers for downloading, clipboard copy, timestamped filenames, and multi-tab capture.

INSTALL

```bash
npm install chrome-screenshot-api
```

USAGE

Import the ScreenshotManager class and call its static methods from your extension code.

```typescript
import { ScreenshotManager } from 'chrome-screenshot-api';
```

CAPTURE VISIBLE TAB

Returns a data URL string of the current viewport. Accepts png or jpeg as the format, with an optional quality value for jpeg.

```typescript
const dataUrl = await ScreenshotManager.captureVisibleTab('jpeg', 85);
```

CAPTURE AND DOWNLOAD

Triggers a file download of the screenshot with the given filename.

```typescript
await ScreenshotManager.captureAndDownload('page.png', 'png');
```

CAPTURE TO BLOB

Returns the screenshot as a Blob, handy for uploading or further processing.

```typescript
const blob = await ScreenshotManager.captureToBlob('png');
```

COPY TO CLIPBOARD

Captures the visible tab as PNG and writes it to the system clipboard.

```typescript
await ScreenshotManager.captureToClipboard();
```

CAPTURE WITH TIMESTAMP

Downloads a screenshot with an ISO-style timestamped filename like screenshot-2026-03-06T12-30-00.png.

```typescript
await ScreenshotManager.captureTimestamped();
```

CAPTURE MULTIPLE TABS

Iterates over an array of tab IDs, activates each one, captures a screenshot, and returns a Map of tabId to data URL.

```typescript
const tabIds = [101, 102, 103];
const results = await ScreenshotManager.captureMultipleTabs(tabIds);
results.forEach((dataUrl, tabId) => {
  console.log(`Tab ${tabId} captured`);
});
```

API REFERENCE

ScreenshotManager.captureVisibleTab(format?, quality?)
  Returns Promise<string> with a data URL of the active tab viewport.
  format defaults to png. quality is optional, relevant for jpeg.

ScreenshotManager.captureAndDownload(filename?, format?)
  Captures and triggers a browser download. filename defaults to screenshot.png.

ScreenshotManager.captureToBlob(format?)
  Returns Promise<Blob> of the captured image.

ScreenshotManager.captureToClipboard()
  Captures as PNG and writes to the clipboard via the Clipboard API.

ScreenshotManager.captureTimestamped()
  Downloads with an auto-generated timestamped filename.

ScreenshotManager.captureMultipleTabs(tabIds)
  Accepts number[] of tab IDs. Returns Promise<Map<number, string>> mapping each tab to its data URL. Tabs that fail silently are skipped.

MANIFEST PERMISSIONS

Your extension manifest needs at least these entries.

```json
{
  "permissions": ["activeTab", "tabs"]
}
```

If you use captureToClipboard, also add the clipboardWrite permission.

DEVELOPMENT

```bash
git clone https://github.com/theluckystrike/chrome-screenshot-api.git
cd chrome-screenshot-api
npm install
npm run build
```

The project compiles with TypeScript 5.x targeting ES2020. CI runs on Node 18 and 20.

LICENSE

MIT. See LICENSE file for details.

---

Built at [zovo.one](https://zovo.one)
