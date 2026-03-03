/**
 * Screenshot Manager — Capture visible tab, areas, and save
 */

export class ScreenshotError extends Error {
    constructor(
        message: string,
        public code: string,
        public originalError?: Error
    ) {
        super(message);
        this.name = 'ScreenshotError';
        if (originalError?.stack) {
            this.stack = originalError.stack;
        }
    }
}

export const ScreenshotErrorCode = {
    CAPTURE_FAILED: 'CAPTURE_FAILED',
    DOWNLOAD_FAILED: 'DOWNLOAD_FAILED',
    CLIPBOARD_FAILED: 'CLIPBOARD_FAILED',
    INVALID_FORMAT: 'INVALID_FORMAT',
    FETCH_FAILED: 'FETCH_FAILED',
} as const;

const VALID_FORMATS = ['png', 'jpeg'] as const;
const MAX_TAB_COUNT = 50;

export class ScreenshotManager {
    /** Capture visible area of current tab */
    static async captureVisibleTab(format: 'png' | 'jpeg' = 'png', quality?: number): Promise<string> {
        if (!VALID_FORMATS.includes(format)) {
            throw new ScreenshotError(
                `Invalid format: "${format}". Must be one of: ${VALID_FORMATS.join(', ')}`,
                ScreenshotErrorCode.INVALID_FORMAT
            );
        }
        if (quality !== undefined && (quality < 0 || quality > 100)) {
            throw new ScreenshotError(
                `Invalid quality: ${quality}. Must be between 0 and 100.`,
                ScreenshotErrorCode.INVALID_FORMAT
            );
        }
        try {
            return await chrome.tabs.captureVisibleTab(chrome.windows.WINDOW_ID_CURRENT, { format, quality });
        } catch (error) {
            const err = error as Error;
            throw new ScreenshotError(
                `Failed to capture visible tab: ${err.message}. ` +
                `Make sure the extension has permission to capture visible tab and the current tab is accessible.`,
                ScreenshotErrorCode.CAPTURE_FAILED,
                err
            );
        }
    }

    /** Capture and download */
    static async captureAndDownload(filename: string = 'screenshot.png', format: 'png' | 'jpeg' = 'png'): Promise<void> {
        try {
            const dataUrl = await this.captureVisibleTab(format);
            const a = document.createElement('a');
            a.href = dataUrl; a.download = filename; a.click();
        } catch (error) {
            const err = error as Error;
            if (err instanceof ScreenshotError) throw err;
            throw new ScreenshotError(
                `Failed to capture and download: ${err.message}`,
                ScreenshotErrorCode.DOWNLOAD_FAILED,
                err
            );
        }
    }

    /** Capture to blob */
    static async captureToBlob(format: 'png' | 'jpeg' = 'png'): Promise<Blob> {
        try {
            const dataUrl = await this.captureVisibleTab(format);
            const resp = await fetch(dataUrl);
            if (!resp.ok) {
                throw new ScreenshotError(
                    `Failed to convert to blob: HTTP ${resp.status}`,
                    ScreenshotErrorCode.FETCH_FAILED
                );
            }
            return resp.blob();
        } catch (error) {
            const err = error as Error;
            if (err instanceof ScreenshotError) throw err;
            throw new ScreenshotError(
                `Failed to capture to blob: ${err.message}`,
                ScreenshotErrorCode.CAPTURE_FAILED,
                err
            );
        }
    }

    /** Copy screenshot to clipboard */
    static async captureToClipboard(): Promise<void> {
        try {
            const blob = await this.captureToBlob('png');
            try {
                await navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })]);
            } catch (clipError) {
                const err = clipError as Error;
                throw new ScreenshotError(
                    `Failed to write to clipboard: ${err.message}. ` +
                    `Make sure the page has clipboard write permission and is served over HTTPS (or localhost).`,
                    ScreenshotErrorCode.CLIPBOARD_FAILED,
                    err
                );
            }
        } catch (error) {
            const err = error as Error;
            if (err instanceof ScreenshotError) throw err;
            throw new ScreenshotError(
                `Failed to capture to clipboard: ${err.message}`,
                ScreenshotErrorCode.CAPTURE_FAILED,
                err
            );
        }
    }

    /** Capture with timestamp filename */
    static async captureTimestamped(): Promise<void> {
        const ts = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
        await this.captureAndDownload(`screenshot-${ts}.png`);
    }

    /** Capture multiple tabs */
    static async captureMultipleTabs(tabIds: number[]): Promise<{
        success: Map<number, string>;
        failed: Array<{ tabId: number; error: string }>;
    }> {
        if (tabIds.length > MAX_TAB_COUNT) {
            throw new ScreenshotError(
                `Too many tabs: ${tabIds.length}. Maximum is ${MAX_TAB_COUNT}.`,
                ScreenshotErrorCode.CAPTURE_FAILED
            );
        }
        
        const success = new Map<number, string>();
        const failed: Array<{ tabId: number; error: string }> = [];
        
        for (const tabId of tabIds) {
            try {
                await chrome.tabs.update(tabId, { active: true });
                await new Promise((r) => setTimeout(r, 500));
                const data = await this.captureVisibleTab();
                success.set(tabId, data);
            } catch (error) {
                const err = error as Error;
                failed.push({ 
                    tabId, 
                    error: err.message || 'Unknown error during capture' 
                });
                console.warn(`[ScreenshotManager] Failed to capture tab ${tabId}:`, error);
            }
        }
        return { success, failed };
    }
}
