import { Component, Input, OnInit } from '@angular/core';
import { LinkService } from '../../services/link.service';
import { RetroLink } from '../../types';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-link-marquee',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './link-marquee.component.html',
  styleUrl: './link-marquee.component.css'
})
export class LinkMarqueeComponent implements OnInit {
  @Input() position: 'top' | 'bottom' = 'top';
  @Input() speed: 'slow' | 'medium' | 'fast' = 'medium';
  
  links: RetroLink[] = [];
  displayedLinks: RetroLink[] = [];

  constructor(private linkService: LinkService) {}

  ngOnInit(): void {
    this.linkService.getFeaturedLinks().subscribe(links => {
      this.links = links;
      // 复制链接以实现无缝环绕
      this.displayedLinks = [...links, ...links, ...links];
    });
  }

  getAnimationDuration(): string {
    switch (this.speed) {
      case 'slow':
        return '60s';
      case 'fast':
        return '15s';
      default:
        return '30s';
    }
  }

  getMarqueeLinks = [
    { text: '★ HOT LINKS ★', isLink: false },
    { text: 'GeoCities Archive', url: 'https://www.geocities.org', isLink: true, category: 'personal' },
    { text: '★', isLink: false },
    { text: 'Neopets', url: 'https://www.neopets.com', isLink: true, category: 'games' },
    { text: '★', isLink: false },
    { text: 'Newgrounds', url: 'https://www.newgrounds.com', isLink: true, category: 'games' },
    { text: '★', isLink: false },
    { text: 'MySpace', url: 'https://www.myspace.com', isLink: true, category: 'social' },
    { text: '★', isLink: false },
    { text: 'Homestar Runner', url: 'https://www.homestarrunner.com', isLink: true, category: 'humor' },
    { text: '★', isLink: false },
    { text: 'DeviantArt', url: 'https://www.deviantart.com', isLink: true, category: 'art' },
    { text: '★', isLink: false },
    { text: 'RuneScape', url: 'https://oldschool.runescape.com', isLink: true, category: 'games' },
    { text: '★', isLink: false },
    { text: 'Napster Memories', url: 'https://www.napster.com', isLink: true, category: 'music' },
    { text: '★', isLink: false },
    { text: 'AOL Instant Messenger', url: 'https://en.wikipedia.org/wiki/AOL_Instant_Messenger', isLink: true, category: 'social' },
    { text: '★', isLink: false },
    { text: 'MSN Messenger', url: 'https://en.wikipedia.org/wiki/MSN_Messenger', isLink: true, category: 'social' },
    { text: '★', isLink: false },
    { text: 'ICQ - UIN Me!', url: 'https://www.icq.com', isLink: true, category: 'social' },
    { text: '★', isLink: false },
    { text: 'Slashdot', url: 'https://slashdot.org', isLink: true, category: 'tech' },
    { text: '★', isLink: false },
    { text: 'Digg it!', url: 'https://digg.com', isLink: true, category: 'tech' },
    { text: '★', isLink: false },
    { text: 'Reddit', url: 'https://www.reddit.com', isLink: true, category: 'forum' },
    { text: '★ COOL SITES ★', isLink: false },
    { text: 'eBaums World', url: 'https://www.ebaumsworld.com', isLink: true, category: 'humor' },
    { text: '★', isLink: false },
    { text: 'Something Awful', url: 'https://www.somethingawful.com', isLink: true, category: 'humor' },
    { text: '★', isLink: false },
    { text: 'Fark', url: 'https://www.fark.com', isLink: true, category: 'humor' },
    { text: '★', isLink: false },
    { text: 'Kazaa', url: 'https://en.wikipedia.org/wiki/Kazaa', isLink: true, category: 'music' },
    { text: '★', isLink: false },
    { text: 'LimeWire', url: 'https://en.wikipedia.org/wiki/LimeWire', isLink: true, category: 'music' },
    { text: '★', isLink: false },
    { text: 'The Sims', url: 'https://www.ea.com/games/the-sims', isLink: true, category: 'games' },
    { text: '★ UPDATED DAILY ★', isLink: false },
  ];

  getCategoryColor(category: string): string {
    const colors: Record<string, string> = {
      games: 'text-retro-light-green',
      music: 'text-retro-light-magenta',
      art: 'text-retro-light-cyan',
      tech: 'text-retro-light-yellow',
      social: 'text-retro-light-blue',
      humor: 'text-retro-light-red',
      personal: 'text-retro-white',
      forum: 'text-retro-orange'
    };
    return colors[category] || 'text-retro-white';
  }
}
