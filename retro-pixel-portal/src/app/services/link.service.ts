import { Injectable } from '@angular/core';
import { RetroLink, LinkCategory } from '../types';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LinkService {
  private links: RetroLink[] = [
    {
      id: 1,
      title: 'GeoCities Archive',
      url: 'https://www.geocities.org',
      description: 'Relive the glory days of personal web hosting!',
      category: 'personal',
      visits: 9999,
      createdYear: 1995
    },
    {
      id: 2,
      title: 'Neopets',
      url: 'https://www.neopets.com',
      description: 'Adopt a virtual pet and explore Neopia!',
      category: 'games',
      visits: 8888,
      createdYear: 1999
    },
    {
      id: 3,
      title: 'The O.G. Runescape',
      url: 'https://oldschool.runescape.com',
      description: 'Click your way to max stats!',
      category: 'games',
      visits: 7777,
      createdYear: 2001
    },
    {
      id: 4,
      title: 'eBaums World',
      url: 'https://www.ebaumsworld.com',
      description: 'Funny videos and flash games galore!',
      category: 'humor',
      visits: 6666,
      createdYear: 2001
    },
    {
      id: 5,
      title: 'Homestar Runner',
      url: 'https://www.homestarrunner.com',
      description: 'Strong Bad emails and more!',
      category: 'humor',
      visits: 5555,
      createdYear: 2000
    },
    {
      id: 6,
      title: 'Newgrounds',
      url: 'https://www.newgrounds.com',
      description: 'Flash animations and games portal!',
      category: 'games',
      visits: 4444,
      createdYear: 1999
    },
    {
      id: 7,
      title: 'DeviantArt',
      url: 'https://www.deviantart.com',
      description: 'Share your digital artwork!',
      category: 'art',
      visits: 3333,
      createdYear: 2000
    },
    {
      id: 8,
      title: 'MySpace',
      url: 'https://www.myspace.com',
      description: 'Tom is your first friend!',
      category: 'social',
      visits: 2222,
      createdYear: 2003
    },
    {
      id: 9,
      title: 'The Sims',
      url: 'https://www.ea.com/games/the-sims',
      description: 'Control virtual lives!',
      category: 'games',
      visits: 1111,
      createdYear: 2000
    },
    {
      id: 10,
      title: 'MSN Messenger',
      url: 'https://en.wikipedia.org/wiki/MSN_Messenger',
      description: 'Remember the nudge button?',
      category: 'social',
      visits: 999,
      createdYear: 1999
    },
    {
      id: 11,
      title: 'AOL Instant Messenger',
      url: 'https://en.wikipedia.org/wiki/AOL_Instant_Messenger',
      description: 'Away messages and buddy lists!',
      category: 'social',
      visits: 888,
      createdYear: 1997
    },
    {
      id: 12,
      title: 'ICQ',
      url: 'https://www.icq.com',
      description: 'UIN numbers and "uh-oh!" sounds!',
      category: 'social',
      visits: 777,
      createdYear: 1996
    },
    {
      id: 13,
      title: 'Napster',
      url: 'https://www.napster.com',
      description: 'Share all the MP3s!',
      category: 'music',
      visits: 666,
      createdYear: 1999
    },
    {
      id: 14,
      title: 'Kazaa',
      url: 'https://en.wikipedia.org/wiki/Kazaa',
      description: 'P2P file sharing at its finest!',
      category: 'music',
      visits: 555,
      createdYear: 2001
    },
    {
      id: 15,
      title: 'LimeWire',
      url: 'https://en.wikipedia.org/wiki/LimeWire',
      description: 'Download "free" music legally?',
      category: 'music',
      visits: 444,
      createdYear: 2000
    },
    {
      id: 16,
      title: 'Slashdot',
      url: 'https://slashdot.org',
      description: 'News for nerds, stuff that matters!',
      category: 'tech',
      visits: 333,
      createdYear: 1997
    },
    {
      id: 17,
      title: 'Digg',
      url: 'https://digg.com',
      description: 'Dig it! Social news aggregation!',
      category: 'tech',
      visits: 222,
      createdYear: 2004
    },
    {
      id: 18,
      title: 'Reddit',
      url: 'https://www.reddit.com',
      description: 'The front page of the internet!',
      category: 'forum',
      visits: 111,
      createdYear: 2005
    },
    {
      id: 19,
      title: 'Fark',
      url: 'https://www.fark.com',
      description: 'Funny news links and comments!',
      category: 'humor',
      visits: 99,
      createdYear: 1999
    },
    {
      id: 20,
      title: 'Something Awful',
      url: 'https://www.somethingawful.com',
      description: 'The internet makes you stupid!',
      category: 'humor',
      visits: 88,
      createdYear: 1999
    }
  ];

  constructor() { }

  getAllLinks(): Observable<RetroLink[]> {
    return of(this.links);
  }

  getLinksByCategory(category: LinkCategory): Observable<RetroLink[]> {
    return of(this.links.filter(link => link.category === category));
  }

  getFeaturedLinks(): Observable<RetroLink[]> {
    return of(this.links.slice(0, 8));
  }

  getPopularLinks(limit: number = 5): Observable<RetroLink[]> {
    const sorted = [...this.links].sort((a, b) => b.visits - a.visits);
    return of(sorted.slice(0, limit));
  }

  getCategories(): Observable<{ category: LinkCategory; label: string; count: number }[]> {
    const categoryLabels: Record<LinkCategory, string> = {
      games: '🎮 Games',
      music: '🎵 Music',
      art: '🎨 Art',
      tech: '💻 Tech',
      social: '👥 Social',
      humor: '😂 Humor',
      personal: '🏠 Personal',
      forum: '💬 Forum'
    };

    const categories: { category: LinkCategory; label: string; count: number }[] = [];
    const categoryMap = new Map<LinkCategory, number>();

    this.links.forEach(link => {
      categoryMap.set(link.category, (categoryMap.get(link.category) || 0) + 1);
    });

    categoryMap.forEach((count, category) => {
      categories.push({
        category,
        label: categoryLabels[category],
        count
      });
    });

    return of(categories.sort((a, b) => b.count - a.count));
  }

  searchLinks(query: string): Observable<RetroLink[]> {
    const lowerQuery = query.toLowerCase();
    return of(
      this.links.filter(link => 
        link.title.toLowerCase().includes(lowerQuery) ||
        link.description.toLowerCase().includes(lowerQuery)
      )
    );
  }
}
