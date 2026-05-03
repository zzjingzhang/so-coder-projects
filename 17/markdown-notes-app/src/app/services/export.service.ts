import { Injectable } from '@angular/core';
import { Note } from '../models/note.model';

@Injectable({
  providedIn: 'root'
})
export class ExportService {
  exportAsMarkdown(note: Note): void {
    const content = this.generateMarkdownContent(note);
    this.downloadFile(content, `${note.title}.md`, 'text/markdown');
  }

  exportAsHTML(note: Note): void {
    const htmlContent = this.generateHTMLContent(note);
    this.downloadFile(htmlContent, `${note.title}.html`, 'text/html');
  }

  exportMultipleAsMarkdown(notes: Note[]): void {
    const content = notes.map(note => 
      `# ${note.title}\n\n${note.content}\n\n---\n\n`
    ).join('');
    this.downloadFile(content, 'notes.md', 'text/markdown');
  }

  private generateMarkdownContent(note: Note): string {
    let content = `# ${note.title}\n\n`;
    
    if (note.tags.length > 0) {
      content += `**标签**: ${note.tags.map(t => t.name).join(', ')}\n\n`;
    }
    
    content += `**创建时间**: ${this.formatDate(note.createdAt)}\n\n`;
    content += `**更新时间**: ${this.formatDate(note.updatedAt)}\n\n`;
    content += `---\n\n`;
    content += note.content;
    
    return content;
  }

  private generateHTMLContent(note: Note): string {
    return `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${note.title}</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      line-height: 1.6;
      max-width: 800px;
      margin: 0 auto;
      padding: 20px;
      color: #262626;
    }
    h1, h2, h3 {
      border-bottom: 1px solid #e8e8e8;
      padding-bottom: 0.3em;
    }
    code {
      background-color: #f5f5f5;
      padding: 0.2em 0.4em;
      border-radius: 3px;
      font-family: monospace;
    }
    pre {
      background-color: #f5f5f5;
      padding: 1em;
      border-radius: 4px;
      overflow-x: auto;
    }
    pre code {
      background-color: transparent;
      padding: 0;
    }
    blockquote {
      border-left: 4px solid #1890ff;
      padding-left: 1em;
      margin: 1em 0;
      color: #595959;
    }
    table {
      border-collapse: collapse;
      width: 100%;
    }
    th, td {
      border: 1px solid #d9d9d9;
      padding: 8px 12px;
      text-align: left;
    }
    th {
      background-color: #f5f5f5;
    }
    .meta {
      color: #8c8c8c;
      font-size: 0.9em;
      margin-bottom: 20px;
    }
  </style>
</head>
<body>
  <h1>${note.title}</h1>
  <div class="meta">
    ${note.tags.length > 0 ? `<p><strong>标签:</strong> ${note.tags.map(t => t.name).join(', ')}</p>` : ''}
    <p><strong>创建时间:</strong> ${this.formatDate(note.createdAt)}</p>
    <p><strong>更新时间:</strong> ${this.formatDate(note.updatedAt)}</p>
  </div>
  <hr>
  <div class="content">
    ${this.simpleMarkdownToHTML(note.content)}
  </div>
</body>
</html>`;
  }

  private simpleMarkdownToHTML(content: string): string {
    let html = content
      .replace(/^### (.*$)/gim, '<h3>$1</h3>')
      .replace(/^## (.*$)/gim, '<h2>$1</h2>')
      .replace(/^# (.*$)/gim, '<h1>$1</h1>')
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/^> (.*$)/gim, '<blockquote>$1</blockquote>')
      .replace(/\n/g, '<br>');
    
    return html;
  }

  private formatDate(date: Date): string {
    const d = new Date(date);
    return d.toLocaleString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  private downloadFile(content: string, filename: string, mimeType: string): void {
    const blob = new Blob([content], { type: mimeType });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  }
}