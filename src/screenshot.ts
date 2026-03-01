/**
 * Screenshot Manager — Capture visible tab, areas, and save
 */
export class ScreenshotManager {
    /** Capture visible area of current tab */
    static async captureVisibleTab(format: 'png' | 'jpeg' = 'png', quality?: number): Promise<string> {
        return chrome.tabs.captureVisibleTab(undefined, { format, quality });
    }

    /** Capture and download */
    static async captureAndDownload(filename: string = 'screenshot.png', format: 'png' | 'jpeg' = 'png'): Promise<void> {
        const dataUrl = await this.captureVisibleTab(format);
        const a = document.createElement('a');
        a.href = dataUrl; a.download = filename; a.click();
    }

    /** Capture to blob */
    static async captureToBlob(format: 'png' | 'jpeg' = 'png'): Promise<Blob> {
        const dataUrl = await this.captureVisibleTab(format);
        const resp = await fetch(dataUrl);
        return resp.blob();
    }

    /** Copy screenshot to clipboard */
    static async captureToClipboard(): Promise<void> {
        const blob = await this.captureToBlob('png');
        await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })]);
    }

    /** Capture with timestamp filename */
    static async captureTimestamped(): Promise<void> {
        const ts = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
        await this.captureAndDownload(`screenshot-${ts}.png`);
    }

    /** Capture multiple tabs */
    static async captureMultipleTabs(tabIds: number[]): Promise<Map<number, string>> {
        const screenshots = new Map<number, string>();
        for (const tabId of tabIds) {
            try {
                await chrome.tabs.update(tabId, { active: true });
                await new Promise((r) => setTimeout(r, 500));
                const data = await this.captureVisibleTab();
                screenshots.set(tabId, data);
            } catch { }
        }
        return screenshots;
    }
}
