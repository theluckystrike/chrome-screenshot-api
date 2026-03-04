# chrome-screenshot-api

[![npm version](https://img.shields.io/npm/v/chrome-screenshot-api)](https://npmjs.com/package/chrome-screenshot-api)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue.svg)](https://www.typescriptlang.org/)
[![Chrome Web Extension](https://img.shields.io/badge/Chrome-Web%20Extension-orange.svg)](https://developer.chrome.com/docs/extensions/)
[![CI Status](https://github.com/theluckystrike/chrome-screenshot-api/actions/workflows/ci.yml/badge.svg)](https://github.com/theluckystrike/chrome-screenshot-api/actions)
[![Discord](https://img.shields.io/badge/Discord-Zovo-blueviolet.svg?logo=discord)](https://discord.gg/zovo)
[![Website](https://img.shields.io/badge/Website-zovo.one-blue)](https://zovo.one)
[![GitHub Stars](https://img.shields.io/github/stars/theluckystrike/chrome-screenshot-api?style=social)](https://github.com/theluckystrike/chrome-screenshot-api)

> Capture screenshots in Chrome extensions with advanced options.

**chrome-screenshot-api** provides utilities to capture visible area, full page, or selected regions as PNG/JPEG images — perfect for building screenshot tools, page capture extensions, and visual testing utilities.

Part of the [Zovo](https://zovo.one) developer tools family.

## Features

- ✅ **Visible Area Capture** - Capture current viewport
- ✅ **Full Page Capture** - Capture entire scrollable page
- ✅ **Region Selection** - Capture specific page regions
- ✅ **Multiple Formats** - PNG and JPEG output
- ✅ **Quality Control** - Adjust image quality
- ✅ **TypeScript Support** - Full type definitions included

## Installation

```bash
npm install chrome-screenshot-api
```

## Quick Start

```typescript
import { screenshot } from 'chrome-screenshot-api';

const image = await screenshot.capture(tabId);
```

## Usage Examples

### Capture Visible Area

```typescript
import { screenshot } from 'chrome-screenshot-api';

const image = await screenshot.capture(tabId);
```

### Full Page Screenshot

```typescript
const fullPage = await screenshot.captureFull(tabId);
```

### Capture Region

```typescript
const region = await screenshot.captureRegion(tabId, {
  x: 100,
  y: 100,
  width: 800,
  height: 600
});
```

### Custom Format and Quality

```typescript
const jpeg = await screenshot.capture(tabId, {
  format: 'jpeg',
  quality: 90
});
```

## API

### Methods

| Method | Description |
|--------|-------------|
| `capture(tabId, options?)` | Capture visible area |
| `captureFull(tabId, options?)` | Capture full page |
| `captureRegion(tabId, rect, options?)` | Capture region |

### Options

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| format | 'png' \| 'jpeg' | 'png' | Image format |
| quality | number | 90 | JPEG quality (0-100) |

## Manifest

```json
{
  "permissions": ["tabCapture", "tabs"]
}
```

## Browser Support

- Chrome 90+
- Manifest V3

## Contributing

Contributions are welcome! Please follow these steps:

1. **Fork** the repository
2. **Create** a feature branch: `git checkout -b feature/screenshot-feature`
3. **Make** your changes
4. **Test** your changes: `npm test`
5. **Commit** your changes: `git commit -m 'Add new feature'`
6. **Push** to the branch: `git push origin feature/screenshot-feature`
7. **Submit** a Pull Request

### Development Setup

```bash
# Clone the repository
git clone https://github.com/theluckystrike/chrome-screenshot-api.git
cd chrome-screenshot-api

# Install dependencies
npm install

# Build
npm run build
```

## Built by Zovo

Part of the [Zovo](https://zovo.one) developer tools family — privacy-first Chrome extensions built by developers, for developers.

## See Also

### Related Zovo Repositories

- [chrome-page-snapshot](https://github.com/theluckystrike/chrome-page-snapshot) - Page state snapshots
- [chrome-storage-plus](https://github.com/theluckystrike/chrome-storage-plus) - Type-safe storage
- [chrome-extension-starter-mv3](https://github.com/theluckystrike/chrome-extension-starter-mv3) - Extension template

### Zovo Chrome Extensions

- [Zovo Tab Manager](https://chrome.google.com/webstore/detail/zovo-tab-manager) - Manage tabs efficiently
- [Zovo Focus](https://chrome.google.com/webstore/detail/zovo-focus) - Block distractions
- [Zovo Permissions Scanner](https://chrome.google.com/webstore/detail/zovo-permissions-scanner) - Check extension privacy grades

Visit [zovo.one](https://zovo.one) for more information.

## License

MIT — [Zovo](https://zovo.one)

---

*Built by developers, for developers. No compromises on privacy.*
