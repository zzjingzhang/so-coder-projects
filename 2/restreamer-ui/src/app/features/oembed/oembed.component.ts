import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

interface OEmbedResponse {
  version: string;
  type: string;
  title: string;
  author_name: string;
  author_url: string;
  provider_name: string;
  provider_url: string;
  thumbnail_url: string;
  thumbnail_width: number;
  thumbnail_height: number;
  width: number;
  height: number;
  html: string;
}

@Component({
  selector: 'app-oembed',
  templateUrl: './oembed.component.html',
  styleUrls: ['./oembed.component.css'],
  standalone: false
})
export class OEmbedComponent implements OnInit {
  format: string = 'json';
  url: string = '';
  response: OEmbedResponse | null = null;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.format = params['format'] || 'json';
      this.url = params['url'] || '';
      this.generateResponse();
    });
  }

  private generateResponse(): void {
    const channelId = this.extractChannelId(this.url);
    
    this.response = {
      version: '1.0',
      type: 'video',
      title: `Restreamer Channel ${channelId}`,
      author_name: 'Restreamer',
      author_url: window.location.origin,
      provider_name: 'Restreamer',
      provider_url: window.location.origin,
      thumbnail_url: `${window.location.origin}/assets/thumbnail.jpg`,
      thumbnail_width: 480,
      thumbnail_height: 270,
      width: 800,
      height: 450,
      html: `<iframe src="${window.location.origin}/embed/${channelId}" width="800" height="450" frameborder="0" allow="autoplay; fullscreen" allowfullscreen></iframe>`
    };
  }

  private extractChannelId(url: string): string {
    const match = url.match(/embed\/(\d+)/);
    return match ? match[1] : '1';
  }

  getJsonResponse(): string {
    return JSON.stringify(this.response, null, 2);
  }

  getXmlResponse(): string {
    if (!this.response) {
      return '';
    }
    return `<?xml version="1.0" encoding="UTF-8"?>
<oembed>
  <version>${this.response.version}</version>
  <type>${this.response.type}</type>
  <title>${this.response.title}</title>
  <author_name>${this.response.author_name}</author_name>
  <author_url>${this.response.author_url}</author_url>
  <provider_name>${this.response.provider_name}</provider_name>
  <provider_url>${this.response.provider_url}</provider_url>
  <thumbnail_url>${this.response.thumbnail_url}</thumbnail_url>
  <thumbnail_width>${this.response.thumbnail_width}</thumbnail_width>
  <thumbnail_height>${this.response.thumbnail_height}</thumbnail_height>
  <width>${this.response.width}</width>
  <height>${this.response.height}</height>
  <html>${this.escapeXml(this.response.html)}</html>
</oembed>`;
  }

  private escapeXml(text: string): string {
    return text
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&apos;');
  }
}
