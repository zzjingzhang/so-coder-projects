import type { ShortenUrlResponse } from '../types';

export async function shortenUrl(url: string): Promise<ShortenUrlResponse> {
  try {
    const response = await fetch(
      `https://api.shrtco.de/v2/shorten?url=${encodeURIComponent(url)}`
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error shortening URL:', error);
    return {
      ok: false,
      result: {
        code: '',
        short_link: '',
        full_short_link: '',
        short_link2: '',
        full_short_link2: '',
        short_link3: '',
        full_short_link3: '',
        share_link: '',
        full_share_link: '',
        original_link: url,
      },
      error: 'Failed to shorten URL. Please try again.',
    };
  }
}

export function isValidUrl(string: string): boolean {
  try {
    const url = new URL(string);
    return url.protocol === 'http:' || url.protocol === 'https:';
  } catch (_) {
    return false;
  }
}

export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (error) {
    console.error('Error copying to clipboard:', error);
    return false;
  }
}
