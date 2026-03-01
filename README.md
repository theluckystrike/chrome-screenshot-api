# chrome-screenshot-api — Screenshots for Chrome Extensions
> **Built by [Zovo](https://zovo.one)**

Capture visible tab, download, copy to clipboard, timestamped screenshots, multi-tab capture. `npm i chrome-screenshot-api`

```typescript
import { ScreenshotManager } from 'chrome-screenshot-api';
await ScreenshotManager.captureAndDownload('page.png');
await ScreenshotManager.captureToClipboard();
await ScreenshotManager.captureTimestamped();
```
MIT License
